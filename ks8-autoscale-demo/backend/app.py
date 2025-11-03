from flask import Flask, jsonify
from flask_cors import CORS
import random
import psutil
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

@app.route('/')
def home():
    return jsonify({
        "message": "IoT Sensor API Running!",
        "status": "healthy",
        "timestamp": time.time()
    })

@app.route('/sensor')
def sensor_data():
    return jsonify({
        "temperature": round(random.uniform(20, 40), 2),
        "humidity": round(random.uniform(30, 80), 2),
        "timestamp": time.time()
    })

@app.route('/health')
def health():
    return jsonify({"status": "healthy"})

@app.route('/load')
def create_load():
    """Endpoint to generate CPU load for testing HPA"""
    result = 0
    for i in range(1000000):
        result += i ** 2
    
    cpu_percent = psutil.cpu_percent(interval=1)
    return jsonify({
        "message": "Load generated",
        "cpu_usage": cpu_percent
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)