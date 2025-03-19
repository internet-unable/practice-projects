FROM node:20-alpine AS base

WORKDIR /app

COPY package.json ./

# RUN npm i;

# RUN npm run dev;
# OR
# RUN npm run build;
# RUN npm run prod;

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output

ENV HOSTNAME="0.0.0.0"

CMD ["tail", "-f", "/dev/null"]