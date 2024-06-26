FROM node:20.14

WORKDIR /app
COPY package.json .

RUN npm install -g typescript
RUN npm install

COPY . ./

RUN yarn build
RUN rm .env.development
RUN rm .env.production

CMD [ "npm","start" ]