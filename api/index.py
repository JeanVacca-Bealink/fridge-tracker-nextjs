from http.server import BaseHTTPRequestHandler
 
class handler(BaseHTTPRequestHandler):
    i = 0
 
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        self.wfile.write(f'Hello, world! {self.i}'.encode('utf-8'))
        self.i += 1
        return