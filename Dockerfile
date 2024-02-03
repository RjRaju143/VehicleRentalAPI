FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run db
RUN npm run build
FROM node:18
WORKDIR /app
COPY --from=build /app/build /app/build
COPY --from=build /app/package*.json /app/
COPY --from=build /app/prisma /app/
RUN npm install --only=production
RUN npm run db
ENV NODE_ENV="production"
ENV JWT_SECRET="1234trewqwertytrdfghn"
ENV PORT=8000
EXPOSE 8000
CMD [ "node", "./build/index.js" ]
