FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run db

RUN npm run build

ENV NODE_ENV=${NODE_ENV}
ENV JWT_SECRET=${JWT_SECRET}
ENV PORT=${PORT}

EXPOSE 8000

CMD [ "node", "./build/index.js" ]
