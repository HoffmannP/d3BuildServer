const d3Builder = require('./d3Builder.js');

d3Builder.build(
    "/tmp/" + process.argv[2],
    "/tmp/" + process.argv[3],
    "/tmp/" + process.argv[4]
);

