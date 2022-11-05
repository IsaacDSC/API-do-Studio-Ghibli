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