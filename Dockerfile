FROM node:20-alpine

WORKDIR /hieu/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8085

CMD [ "npm", "run", "start:dev" ]