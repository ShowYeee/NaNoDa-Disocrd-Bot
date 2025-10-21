FROM node:20-bookworm-slim

RUN useradd -m app
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
USER app
ENV NODE_ENV=production
CMD ["node", "bot.js"]
