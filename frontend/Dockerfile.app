# Используем официальный образ Node.js для сборки
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Выполняем сборку Next.js
RUN npm run build

# Используем минимальный образ для запуска собранного приложения
FROM node:20-alpine AS runner

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только собранные файлы
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/public public

# Запускаем Next.js в продакшен-режиме
CMD ["npm", "start"]
