FROM node:10.15.3

WORKDIR /server

COPY package.json . 

RUN npm install

COPY . .

EXPOSE 8080

CMD node server.js