FROM node:20.10-alpine3.19 AS builder
RUN apk add git
WORKDIR /web
RUN git clone https://github.com/PdelBot/peliculillas.git .
WORKDIR /web/PeliculiYas
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --configuration production --aot


FROM nginx:alpine
WORKDIR /web
COPY --from=builder /web/dist/peliculillas/* .
RUN mv ./* /usr/share/nginx/html/