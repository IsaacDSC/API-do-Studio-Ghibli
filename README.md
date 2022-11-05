# API-do-Studio-Ghibli


## Steps
1. Case use docker-compose execute command
   1. docker-compose up

2. Case not use docker
   1. Requirements:
      1. Set environment database Url
   2. yarn
      1. yarn prisma db generate<
      2. yarn prisma db push
      3. yarn dev

3. Tests
   1. yarn test:movies:service
   2. yarn test:movies:resolver
   3. yarn test:movies:end2end


### FROM HELP TEST API


*Request from import movies API*
curl --request POST \
  --url http://localhost:3000/api/v1/auto/import/movies \
  --header 'Content-Type: application/json' \
  --data '{
  "quantityMovies":200
}'

*Request list movies Paginate*
curl --request GET \
  --url http://localhost:3000/api/v1/movies/3 \
  --header 'Content-Type: application/json'