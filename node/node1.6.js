const http = require('http');
const fs = require('fs');
const { createLink } = require('./utils');
const path = require('path'); 

const dir = process.argv[2];

const server = http.createServer(function (req, res) {
    const urlPath = decodeURIComponent(req.url);

    if (req.url === '/') {
        fs.readdir(dir, { withFileTypes: true }, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Error: ${err.message}`);
                return;
            }

            let html = '';
            files.forEach(file => {
                html += createLink(file.name);
            });

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    } else {
        const fileName = urlPath.slice(1);
        const filePath = path.join(dir, fileName);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File error');
                return;
            }

            const html = `
                <a href="/">Voltar</a>
                <pre>${data}</pre>
            `;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
    }

});

server.listen(3000);