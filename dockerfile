
FROM node:18-alpine


WORKDIR /usr/src/app

COPY . .

RUN npm install && npm install pm2 -g

EXPOSE 8000

CMD ["npm", "start"]
