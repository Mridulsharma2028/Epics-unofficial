FROM node:20-slim AS base
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

ENV NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
