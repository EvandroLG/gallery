# build client
FROM node:10

RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client

COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# build server
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server

COPY server/package*.json ./
RUN npm install
COPY server/ ./
EXPOSE 3000

CMD ["npm", "start"]
