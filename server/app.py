from flask import Flask, request, jsonify, Response, send_file, abort
from flask_cors import CORS
import os
import re
import mimetypes

app = Flask(__name__, static_folder="/static", static_url_path="/static")
CORS(app)

RANGE_RE = re.compile(r"bytes=(\d+)-(\d+)?")

def send_file_partial(path):
    if not os.path.isfile(path):
        return jsonify(error="Not found"), 404
    file_size = os.path.getsize(path)
    range_header = request.headers.get("Range", None)
    if not range_header:
        return send_file(path, conditional=True)

    m = RANGE_RE.match(range_header)
    if not m:
        return send_file(path, conditional=True)

    start = int(m.group(1))
    end = int(m.group(2)) if m.group(2) else file_size - 1
    end = min(end, file_size - 1)
    length = end - start + 1

    with open(path, "rb") as f:
        f.seek(start)
        data = f.read(length)

    rv = Response(data, 206, mimetype=mimetypes.guess_type(path)[0] or "application/octet-stream", direct_passthrough=True)
    rv.headers["Content-Range"] = f"bytes {start}-{end}/{file_size}"
    rv.headers["Accept-Ranges"] = "bytes"
    return rv

def verify_bvid(bvid):
    return re.match("^[a-zA-Z0-9]+$", bvid) is not None

@app.route("/api/v2/avatar", methods=["GET"])
def avatar():
    avatar_path = os.path.join(app.static_folder, "avatar.webp")
    print(f"Avatar path: {avatar_path}")
    if not os.path.isfile(avatar_path):
        return jsonify(error="Avatar not found"), 404
    return send_file(avatar_path, mimetype="image/webp", conditional=True)

@app.route("/api/v2/video/resource", methods=["GET"])
def video_resource():
    bvid = request.args.get("bvid", "")
    if not verify_bvid(bvid):
        return jsonify(error="Invalid bvid"), 400

    if request.args.get("pic") == "1":
        path = os.path.join(app.static_folder, bvid, f"artwork.webp")
        if not os.path.isfile(path):
            return jsonify(error="Not found"), 404
        return send_file(path, mimetype="image/webp", conditional=True)

    path = os.path.join(app.static_folder, bvid, f"audio.mp3")
    return send_file_partial(path)

@app.route("/api/v2/theme/dynamic", methods=["GET"])
def dynamic_theme():
    theme = request.args.get("theme", "")
    if not theme:
        return jsonify(error="Invalid theme name"), 400
    safe = os.path.basename(theme)
    path = os.path.join(app.static_folder, "dynamic_theme", safe)
    print(f"Dynamic theme path: {path}")
    return send_file_partial(path)

@app.errorhandler(404)
def handle_404(e):
    return jsonify(error=str(e)), 404

@app.errorhandler(500)
def handle_500(e):
    return jsonify(error="Internal Server Error"), 500

if __name__ == "__main__":
    print("Starting Flask server on http://0.0.0.0:3000")
    app.run(host="0.0.0.0", port=3000)
