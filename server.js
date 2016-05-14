main();

function main() {
    const http = require('http');
    const port = process.env.app_port || 8080;

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

    response.writeHead(200, {'Content-Type': 'image/svg+xml'});
    response.write(fs.readFileSync("tmp/graph.svg"));
    response.end();
}

