from flask import Flask
from flask_cors import CORS
from routes.data_routes import data_bp
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

app.register_blueprint(data_bp, url_prefix="/data")

if __name__ == "__main__":
    load_dotenv()
    app.run(debug=True, port=int(os.getenv("PORT")))