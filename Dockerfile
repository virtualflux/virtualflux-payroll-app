FROM node:22

WORKDIR /app


COPY . .


RUN npm ci --legacy-peer-deps

RUN npm audit fix --force || true


RUN npm run build


EXPOSE 3000


CMD ["npm", "start"]
