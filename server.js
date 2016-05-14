main(8080);

function main(port) {
    const http = require('http');

    var server = http.createServer(handleRequest);

    server.listen(port, function (err) {
        if (err) {
            return console.error(err);
        }
        //Callback triggered when server is successfully listening. Hurray!
        console.log("Server listening on: http://localhost:%s", port);
    });
}

function handleRequest(request, response) {
    const fs = require("fs"),
        d3Builder = require('./d3Builder.js')

    d3Builder.build(
        "histogramm/script.js",
        "histogramm/style.css",
        "tmp/graph.svg"
    );

    response.setHeader('Content-Type', 'image/svg+xml');
    response.end(fs.readFileSync("tmp/graph.svg"));
}

