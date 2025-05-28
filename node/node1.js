const http = require('http');
const fs = require('fs');

const dir = process.argv[2];

const server = http.createServer(function (req, res) {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Error: ${err.message}`);
            return;
        }

        let html = '';
        files.forEach(file => {
            html += `${file.name}<br>`;
        });

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    });
});

server.listen(3333);