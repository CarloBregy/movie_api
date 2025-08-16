const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);  // parse the request URL
  let filePath = '';

  // Determine which file to serve
  if (parsedUrl.pathname.includes('documentation')) {
    filePath = path.join(__dirname, 'documentation.html');
  } else {
    filePath = path.join(__dirname, 'index.html');
  }
    
const logEntry = `URL: ${request.url}\nTimestamp: ${new Date().toISOString()}\n\n`;
      fs.appendFile('log.txt', logEntry, (err) => {
        if (err) console.error(err);
        else console.log('Added to log.');
      });

  // Read the HTML file and return it
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end('500 - Internal Server Error');
      return;
    }

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
    response.end();
  });

}).listen(8080);

console.log('Server is running on Port 8080.');
