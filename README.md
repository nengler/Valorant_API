# Valorant_API

This is the backend of a Valorant API suited to get match statistics that better help understand popularity of agents per map and per rank

## Get Started

- pull down repository
- install dependencies (npm install)

## Create dev backend

- create a .env file for your prisma backend that will handle your database credentials
- run prisma migrations
  -  first make sure the prisma seed in yourpackage.json file is pointing to /seed/staticSeed.js, then run npx prisma db seed
  -  Next change the prisma seed to point to /seed/matches.js, then run npx prisma db seed


## How to run 
- after all dependencies and backend is setup, run npm run devStart

## Endpoints
- /map
  - returns all maps
- /map:id
  - returns statistics on agent usage in that map
