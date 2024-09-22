FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
COPY .env ./

RUN npm install --production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]