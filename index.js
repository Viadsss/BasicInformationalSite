const http = require("http");
const url = require("url");
const fs = require("fs");

const PORT = 8080;

const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact-me": "contact-me.html",
};

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const fileName = "./" + routes[q.pathname];

  fs.readFile(fileName, (err, data) => {
    if (err) {
      fs.readFile("./404.html", (err, errorData) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(errorData);
        res.end();
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

server.on("error", (error) => {
  console.error("Server Error", error);
});

server.listen(PORT, () => {
  console.log("Server is listening to port", PORT);
});
