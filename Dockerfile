FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production
EXPOSE 3000

COPY package*.json ./
COPY . .

RUN npm install

CMD ["npm", "start"]
