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

# Открываем порт (укажи нужный)
EXPOSE 4000

# Команда запускает приложение в production режиме
CMD ["npm", "run", "start:prod"]
