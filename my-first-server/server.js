const http = require('http');
const fs = require('fs');

const port = 9000;

const requestHandler = (req, res) => {

  let fileName = "";

  switch (req.url) {

    case '/':
      fileName = './index.html';
      break;

    case '/about':
      fileName = './about.html';
      break;

    case '/contact':
      fileName = './contact.html';
      break;


    default:
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Page Not Found</h1>');
      return;
  }

  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('<h1>500 - Server Error</h1>');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });

};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    console.log("Server Is Not Working!");
    return;
  }
  console.log("Server Is Stared:- " + port);
});