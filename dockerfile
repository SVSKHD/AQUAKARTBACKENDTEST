FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install && npm install pm2 -g

EXPOSE 8000

CMD ["pm2-runtime", "start", "index.js"]
