# client/Dockerfile
WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN . ~/.nvm/nvm.sh && \
    nvm install 18.16.0 && \
    nvm use 18.16.0 && \
    npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]