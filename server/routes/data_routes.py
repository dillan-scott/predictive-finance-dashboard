from flask import Blueprint, request, jsonify
from services.data_service import compute_emas, fetch_stock_data

data_bp = Blueprint("data", __name__)

@data_bp.route("/fetch", methods=["GET"])
def fetch():
    ticker = request.args.get("ticker")
    
    df = fetch_stock_data(ticker)
    df = compute_emas(df)
    df = df.fillna("null")
    
    return jsonify(df.to_dict(orient="records"))
