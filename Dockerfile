# docker build -t eu.gcr.io/id-mask-409508/france-connect-test .
# docker run -p 8080:8080 eu.gcr.io/id-mask-409508/france-connect-test
# docker push eu.gcr.io/id-mask-409508/france-connect-test
# gcloud run deploy --image eu.gcr.io/id-mask-409508/france-connect-test


# Stage 1: Build dependencies
FROM node:18.12.1-alpine AS dependencies
WORKDIR /app
COPY package.json .
RUN npm install --production

# Stage 2: Build production image
FROM node:18.12.1-alpine
WORKDIR /app
COPY --from=dependencies /app .
COPY *.js .

EXPOSE 8080
CMD ["npm", "run", "start"]