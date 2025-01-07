from flask import Blueprint, request, jsonify
from services.data_service import fetch_stock_data

data_bp = Blueprint("data", __name__)

@data_bp.route("/fetch", methods=["GET"])
def fetch():
    ticker = request.args.get("ticker", "AAPL")
    
    data = fetch_stock_data(ticker)
    return jsonify(data.to_dict(orient="records"))