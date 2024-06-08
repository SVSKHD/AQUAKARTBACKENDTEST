FROM node:18-alpine

WORKDIR /

COPY . .

RUN npm install && npm install pm2 -g

EXPOSE 8000

CMD ["pm2", "start"]
