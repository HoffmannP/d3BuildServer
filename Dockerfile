FROM node:4
RUN npm install d3 jsdom fs xml-beautifier css
COPY "d3Builder.js" "/d3Builder.js"
COPY "cmd.js" "/cmd.js"
ENTRYPOINT ["node", "/cmd.js"]
CMD ["script.js", "style.css", "graph.svg"]
