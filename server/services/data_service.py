import pandas as pd
import yfinance as yf

def fetch_stock_data(ticker):
    df = yf.download(ticker, period="6mo")
    df.reset_index(inplace=True)
    df.columns = [col[0] for col in df.columns]

    df["EMA_9"] = df["Close"].ewm(span=9, adjust=False).mean()
    df["EMA_21"] = df["Close"].ewm(span=21, adjust=False).mean()
    df["EMA_50"] = df["Close"].ewm(span=50, adjust=False).mean()

    df.loc[:8, "EMA_9"] = None
    df.loc[:20, "EMA_21"] = None
    df.loc[:49, "EMA_50"] = None 

    df["Date"] = pd.to_datetime(df["Date"]).dt.strftime("%Y-%m-%d")

    return df.round(2).tail(50)
