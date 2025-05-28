from flask import (Flask, redirect, render_template, request,
                   send_from_directory, url_for, Response, jsonify)


app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, Welcome to backend"

if __name__ == '__main__':
   app.run()
