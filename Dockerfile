FROM node:10.14.2-alpine

RUN mkdir -p /app
WORKDIR /app
COPY . .

ENV HOST 0.0.0.0
