from flask import Flask
from flask_cors import CORS
from routes.data_routes import data_bp
from routes.ml_routes import ml_bp
import os
from dotenv import load_dotenv
from services.ml_service import train_model

app = Flask(__name__)
CORS(app)

app.register_blueprint(ml_bp, url_prefix='/ml')
app.register_blueprint(data_bp, url_prefix="/data")

train_model()

if __name__ == "__main__":
    load_dotenv()
    app.run(debug=False, port=int(os.getenv("PORT")))