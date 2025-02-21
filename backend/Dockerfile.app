# Базовый образ
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Выполняем сборку приложения
RUN npm run build

# Команда запускает приложение в production режиме
CMD ["npm", "run", "start:prod"]
