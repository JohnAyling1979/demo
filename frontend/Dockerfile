FROM node:16.13.0

RUN npm install -g @angular/cli

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]