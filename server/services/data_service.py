import pandas as pd
import yfinance as yf

def fetch_stock_data(ticker):
    df = yf.download(ticker, period="3mo")
    df.reset_index(inplace=True)
    df.columns = [col[0] for col in df.columns]

    df["Date"] = pd.to_datetime(df["Date"]).dt.strftime("%Y-%m-%d")

    return df
