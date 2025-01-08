import pandas as pd
import yfinance as yf
import numpy as np

def fetch_stock_data(ticker, period=None):
    if period:
        df = yf.download(ticker, period=period)
    else:
        df = yf.download(ticker, period="3mo")

    df.reset_index(inplace=True)
    df.columns = [col[0] for col in df.columns]

    df["Date"] = pd.to_datetime(df["Date"]).dt.strftime("%Y-%m-%d")

    return df

def compute_emas(df):
    df["EMA_9"] = df["Close"].ewm(span=9, adjust=False).mean()
    df["EMA_21"] = df["Close"].ewm(span=21, adjust=False).mean()
    df["EMA_50"] = df["Close"].ewm(span=50, adjust=False).mean()

    df.loc[:8, "EMA_9"] = None
    df.loc[:20, "EMA_21"] = None
    df.loc[:49, "EMA_50"] = None 

    return df.round(2)

def compute_indicators(df):
    df["Price Change"] = df["Close"].diff()

    mask = df["Symbol"] != df["Symbol"].shift(1)
    df["Price Change"] = np.where(mask, np.nan, df["Price Change"])

    compute_rsi(df)
    compute_oscillator_and_williams(df)
    compute_macd(df)
    compute_proc(df)
    compute_obv(df)

def obv(df):
    volume = df["Volume"]
    change = df["Close"].diff()

    prev_obv = 0
    obv_values = []

    for c, v in zip(change, volume):
        if c > 0:
            current_obv = prev_obv + v
        elif c < 0:
            current_obv = prev_obv - v
        else:
            current_obv = prev_obv

        prev_obv = current_obv
        obv_values.append(current_obv)

    return pd.Series(obv_values, index=df.index)

def compute_obv(df):
    obv_groups = df.groupby("Symbol").apply(obv)
    df["OBV"] = obv_groups.reset_index(level=0, drop=True).squeeze()

def compute_proc(df, n=9):
    df["PROC"] = df.groupby("Symbol")["Close"].transform(lambda x: x.pct_change(periods=n))

def compute_macd(df, n_fast=12, n_slow=26):
    ema_fast = df.groupby("Symbol")["Close"].transform(lambda x: x.ewm(span=n_fast, adjust=False).mean())
    ema_slow = df.groupby("Symbol")["Close"].transform(lambda x: x.ewm(span=n_slow, adjust=False).mean())

    macd = ema_fast - ema_slow
    macd_ema_9 = macd.ewm(span=9).mean()

    df["MACD"] = macd

def compute_oscillator_and_williams(df, n=14):
    low_14, high_14 = df[["Symbol", "Low"]].copy(), df[["Symbol", "High"]].copy()

    low_14 = low_14.groupby("Symbol")["Low"].transform(lambda x: x.rolling(window=n).min())
    high_14 = high_14.groupby("Symbol")["High"].transform(lambda x: x.rolling(window=n).max())

    # Stochastic Oscillator
    k_percent = 100 * ((df["Close"] - low_14) / (high_14 - low_14))

    # Williams %R
    r_percent = -100 * ((high_14 - df["Close"]) / (high_14 - low_14))

    df["K Percent"] = k_percent
    df["R Percent"] = r_percent

def compute_rsi(df, n=14):
    up_df, down_df = df[["Symbol", "Price Change"]].copy(), df[["Symbol", "Price Change"]].copy()

    up_df.loc["Price Change"] = up_df.loc[(up_df["Price Change"] < 0), "Price Change"] = 0

    down_df.loc["Price Change"] = down_df.loc[(down_df["Price Change"] > 0), "Price Change"] = 0
    down_df["Price Change"] = down_df["Price Change"].abs()

    ewma_up = up_df.groupby("Symbol")["Price Change"].transform(lambda x: x.ewm(span=n).mean())
    ewma_down = down_df.groupby("Symbol")["Price Change"].transform(lambda x: x.ewm(span=n).mean())

    relative_strength = ewma_up / ewma_down
    relative_strength_index = 100.0 - (100.0 / (1.0 + relative_strength))

    df["RSI"] = relative_strength_index