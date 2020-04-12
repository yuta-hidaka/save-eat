FROM node:13.2.0-stretch
ARG APP_NAME
ARG APP_PORT
# FROM node:8.16.0-alpine  
RUN npm install --global yarn
RUN yarn global add create-react-app
WORKDIR /usr/src/app
RUN create-react-app $APP_NAME || echo "[warning] skip -> create-react-app $APP_NAME" 
WORKDIR /usr/src/app/$APP_NAME
RUN  yarn start
WORKDIR /usr/src/app