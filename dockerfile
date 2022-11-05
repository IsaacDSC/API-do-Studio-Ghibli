FROM --platform=linux/amd64 node:14-alpine as builder

WORKDIR /usr/app

COPY package*.json ./
RUN npm i

COPY . .

# RUN sh ./scripts/environment.sh

FROM --platform=linux/amd64 node:14-alpine

COPY --from=0 /usr/app /app

WORKDIR /app


EXPOSE 3000

CMD ["npm", "run", "build"]