FROM node:20 AS base 
WORKDIR /usr/local/app
###### CLIENT STAGES ####
# stage: client-base
FROM base AS client-base 
COPY package*.json ./
RUN --mount=type=cache,id=npm,target=/user/local/share/.cache/npm \
npm install 
COPY src ./src 
COPY data ./data
COPY assets ./assets
COPY server.cjs main.js index.html styles.css ./
COPY .prettierignore .prettierrc.json babel.config.cjs eslint.config.cjs ./
COPY .env  ./
# stage: client-dev
FROM client-base AS client-dev
CMD [ "npm", "run", "dev" ]
# stage: client-test
FROM client-base AS client-test 
RUN npm run test