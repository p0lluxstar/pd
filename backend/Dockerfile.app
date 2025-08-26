# Базовый образ с Node.js + Alpine
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости для Chrome
# RUN apk add --no-cache \
# chromium \
# nss \
# freetype \
# harfbuzz \
# ttf-freefont \
# ca-certificates \
# libx11 \
# libxcomposite \
# libxdamage \
# libxrandr

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости проекта
RUN npm install

# Копируем исходный код
COPY . .

# Выполняем сборку приложения
RUN npm run build

# Открываем порты (если нужно)
EXPOSE 4000 9222

# Команда запуска приложения
CMD ["npm", "run", "start:prod"]
