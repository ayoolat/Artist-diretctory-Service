FROM node:14

WORKDIR /usr/src/app

COPY . .

EXPOSE 80
EXPOSE 4000
CMD [ "node", "dist/server.js" ]