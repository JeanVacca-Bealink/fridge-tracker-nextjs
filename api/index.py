from http.server import BaseHTTPRequestHandler
from agno.agent import Agent
from agno.models.groq import Groq
import json

class handler(BaseHTTPRequestHandler):
    web_agent = Agent(
        name="Web Agent",
        role="Find cooking recipes based on fridge content",
        model=Groq(id="llama-3.3-70b-versatile"),
        instructions=["Always use real meal recipes, never make them up.",
                      "Recipes must contains some vegetables, pastas, rice or patatoes.",
                      #"Recipes should contains ingredients, steps, and cooking time.",
                      "Use the fridge content and what i like to find recipes.",
                      "Use common ingredients if necessary.",
                      #"Give links to find the recipes.",
                      "If no recipe is found, suggest a simple dish with the ingredients available."],
    )

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type','text/plain')
        self.end_headers()
        self.wfile.write(f'Api endpoint! {self.i}'.encode('utf-8'))
        return
    
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()
        
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')
        print(f"Received POST data: {post_data}")
        try:
            parsed_data = json.loads(post_data)

            fridge_content = parsed_data["fridge_content"]
            fridge_content_str = ", ".join(fridge_content)
            print(fridge_content[0])  # Output: coucou

            likes =  parsed_data["likes"] if "likes" in parsed_data else None

            prompt = "FRIDGE CONTENT: " + fridge_content_str + "\r\n"
            prompt += "USER LIKES: " + ", ".join(likes) + ". " if likes else ""
            
            print(f"Prompt: {prompt}")
            response = self.web_agent.run(prompt)
            print(response)
            #json.dump(response, self.wfile, ensure_ascii=False)
            self.wfile.write(str(response.content).encode('utf-8'))
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")
            
        except KeyError as e:
            print(f"Missing key in JSON: {e}")

        
        self.wfile.write("{'error': 'bad request'}".encode('utf-8'))
        return
    