
FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV MONGO_URI="mongodb://host.docker.internal:27017/ssh_app"
ENV SESSION_SECRET="5555"

CMD ["npm", "start"]

