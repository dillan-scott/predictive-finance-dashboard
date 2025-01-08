import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

from services.data_service import fetch_stock_data, compute_indicators

tickers_list = ["AAPL", "JNJ", "XOM", "JPM", "PG", "TSLA", "BABA", "INFY", "RIO", "SPY"]
model = None

def train_model():
    global model

    full_price_history = []

    for ticker in tickers_list:
        price_history = fetch_stock_data(ticker, period="2y")

        price_history["Symbol"] = ticker
        full_price_history.append(price_history)

    price_data = pd.concat(full_price_history, ignore_index=True)
    
    compute_indicators(price_data)
    price_data = price_data.dropna()

    closed_groups = price_data.groupby("Symbol")["Close"]
    closed_groups = closed_groups.transform(lambda x: x < x.shift(-1))
    price_data["Prediction"] = closed_groups.astype(int)
    
    X = price_data[["RSI", "K Percent", "R Percent", "PROC", "MACD", "OBV"]]
    y = price_data["Prediction"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, shuffle=False)

    model = RandomForestClassifier(n_estimators=100, oob_score=True, criterion="gini", random_state=0)

    model.fit(X_train, y_train)

    joblib.dump(model, 'models/model.pkl')

    accuracy = accuracy_score(y_test, model.predict(X_test), normalize=True)

    return accuracy

def predict_tomorrow(ticker):
    global model

    if model is None:
        model = joblib.load('models/model.pkl')

    price_history = fetch_stock_data(ticker)
    price_history["Symbol"] = ticker

    compute_indicators(price_history)
    price_history = price_history.dropna()

    X = price_history[["RSI", "K Percent", "R Percent", "PROC", "MACD", "OBV"]]

    price_history["Prediction"] = model.predict(X)

    return bool(price_history.tail(1)["Prediction"].item())
