from flask import Flask, jsonify, request, Response
app = Flask(__name__)
@app.route('/', methods=['get', 'post'])
def check():
    a=5
    return str(5)
if __name__ == '__main__':
    ip = '127.0.0.1'
    port = 19996
    app.run(ip, port, debug=True)