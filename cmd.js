const d3Builder = require('./d3Builder.js');

d3Builder.build(
    process.argv[2] || "/tmp/script.js",
    process.argv[3] || "/tmp/style.css",
    process.argv[4] || "/tmp/graph.svg",
    false
);

