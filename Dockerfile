FROM node:lts-alpine

WORKDIR /data

COPY ./package*.json ./

RUN npm install

COPY . ./

RUN npm run build

ENTRYPOINT [ "./docker-entrypoint.sh" ]

ENV NODE_ENV=production

CMD [ "npx", "ts-node", "server/server.ts" ]
