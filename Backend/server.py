from flask import Flask, request, Response
from os import getcwd, remove
from datetime import datetime
from getText import getText

app = Flask(__name__)

@app.route("/", methods=["POST"])
def index():
    f = request.files["image"]
    _dir = getcwd()
    _time = datetime.now()
    _ext = f.filename.split(".")[-1]
    _fileLocation  = f'{_dir}/image/{_time}.{_ext}'
    print(_fileLocation)
    f.save(_fileLocation)
    text = getText(_fileLocation)
    remove(_fileLocation)
    return Response(
        response=text,
        status=200
    )