from flask import Blueprint, request, jsonify

from services.ml_service import predict_tomorrow, train_model

ml_bp = Blueprint("ml", __name__)

@ml_bp.route('/train', methods=['GET'])
def train():
    accuracy = train_model()
    return str(accuracy)

@ml_bp.route('/predict', methods=['GET'])
def predict():
    ticker  = request.args.get("ticker")
    prediction = predict_tomorrow(ticker)
    return "UP" if prediction else "DOWN"