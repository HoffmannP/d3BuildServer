FROM node:4
RUN npm install d3 jsdom fs xml-beautifier css
COPY "base.js" "/base.js"
ENTRYPOINT ["node", "/base.js"]
CMD ["script.js", "style.css", "image.svg"]
