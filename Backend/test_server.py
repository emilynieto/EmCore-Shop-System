from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/", methods=["POST", "OPTIONS"])
def login():
    if request.method == "OPTIONS":
        return '', 204

    data = request.get_json()
    print(data)
    return jsonify({"message": "Login successful"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5050)
