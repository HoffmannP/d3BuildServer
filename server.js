const http = require('http'),
    fs = require("fs"),
    syncRequest = require('sync-request'),
    querystring = require('querystring'),
    mktemp = require('mktemp');
    d3Builder = require('./d3Builder.js');

main();

function main() {
    const port = process.env.app_port || 8080;

    var server = http.createServer(handleRequest);

    server.listen(port, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("Server listening on: http://localhost:%s", port);
    });
}

function handleRequest(request, response) {
    var tmpDir = fs.mkdtempSync('/tmp/d3Builder-') + '/',
        script = tmpDir + "script.js",
        style = tmpDir + "style.css",
        graph = tmpDir + "graph.svg";

    var path = request.url;
    var parameter = querystring.parse(path.substr(path.indexOf('?') + 1));

    if (('script' in parameter) && ('style' in parameter)) {
        download(script, parameter['script']);
        download(style, parameter['style']);
        d3Builder.build(script, style, graph, giveResponse.bind(response));
    } else {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write("use 'script' and 'style' as get parameter");
        response.end();
    }
}

function download(fileName, url) {
    fs.writeFileSync(
        fileName,
        syncRequest(
            'GET',
            url
        ).body
    );
}

function giveResponse(image) {
    this.writeHead(200, {'Content-Type': 'image/svg+xml'});
    this.write(fs.readFileSync(image));
    this.end();
}
