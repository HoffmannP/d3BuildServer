exports.build = function (script, style, image, callback) {
    const jsdom = require('jsdom');
    const emptyChart = '';
    jsdom.env(
        emptyChart,
        function (err, window) {
            if (err) {
                return console.log(
                    'error creating the document',
                    err
                );
            }
            if (script.substr(0, 1) != '/') {
                script = './' + script;
            }
            createChart(
                script,
                style,
                image,
                window
            )
            if (callback) {
                callback(image);
            }
        }
    );
}

function createChart(script, style, image, window) {
    const d3 = require('d3'),
        fs = require('fs'),
        chartScript = require(script);

    chartScript(d3, window);
    insertCSS(selector2class(
        d3.select(window.document.body),
        fs.readFileSync(style).toString()
    ), window);

    writeImage(image, window.document.body.innerHTML);
}

function insertCSS(css, window) {
    var svg = window.document.getElementsByTagName('svg')[0]
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('version', '1.1');

    var def = window.document.createElement('defs');
    def.innerHTML = '<style type="text/css"><![CDATA[' + "\n" +
        css + "\n" +
    ']]></style>';
    svg.insertBefore(def, svg.children[0]);
}

function selector2class(d3Body, cssFile) {
    const css = require('css');
    var cssTree = css.parse(cssFile);
    var rules = cssTree.stylesheet.rules;
    for (var i in rules) {
        var rule = rules[i];
        if ((rule.selectors.length == 1) && (rule.selectors[0].indexOf(' ') == -1)) {
            continue;
        }
        var className = rule.selectors
            .join('__')
            .replace(/\./g, '-')
            .replace(/ /g, '_', 'g');

        for (var j = 0; j < rule.selectors.length; j++) {
            d3Body.selectAll(rule.selectors[j])
                .classed(className, true);
        }
        rules[i].selectors = ['.' + className];
    }
    return css.stringify(cssTree);
}

function writeImage(fileName, image) {
    const fs = require('fs'),
        beautify = require('xml-beautifier');
    const doctype = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
    const xml = '<?xml version="1.0" standalone="no"?>';

    return fs.writeFileSync(
        fileName,
        xml + "\n" + beautify(doctype + image)
    );
}
