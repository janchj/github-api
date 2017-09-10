FROM mhart/alpine-node:8

COPY package.json ./

COPY package-lock.json ./

COPY .env.production ./.env

COPY src ./

RUN npm install --silent --progress=false --production

EXPOSE 3001

CMD ["npm","start"]  