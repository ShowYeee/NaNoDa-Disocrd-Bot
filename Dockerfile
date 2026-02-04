FROM node:20-bookworm-slim

# 安裝建置工具（用於編譯 @discordjs/opus 等原生模組）
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m app
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN chmod +x scripts/start.sh
USER app
ENV NODE_ENV=production
CMD ["./scripts/start.sh"]
