FROM node:12.9.1-slim
COPY package.json /
COPY server.js /
RUN npm install
CMD node /server.js
EXPOSE 8000