FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Копируем схему Prisma отдельно для лучшего кеширования
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]