# BASE
FROM node:20 AS base 
WORKDIR /usr/local/app

# CLIENT STAGES
FROM base AS client-base
COPY package*.json ./
RUN --mount=type=cache,id=npm,target=/usr/local/share/.cache/npm \
npm install 
COPY main.js styles.css index.html server.cjs ./
COPY .prettierignore .prettierrc.json babel.config.cjs eslint.config.cjs ./
COPY .env ./
COPY src ./src
COPY data ./data
COPY assets ./assets

## CLIENT-DEV
FROM client-base AS client-dev
CMD [ "npm", "run", "dev" ]

## CLIENT-TEST
FROM client-base AS client-test
CMD [ "npm", "run", "test" ]
