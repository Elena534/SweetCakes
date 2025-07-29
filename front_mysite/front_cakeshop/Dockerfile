# 1. Используем официальный Node.js образ
FROM node:20-alpine

# 2. Рабочая директория в контейнере
WORKDIR /app

# 3. Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# 4. Копируем остальной код
COPY .. .

# 5. Открываем порт
EXPOSE 3000

# 6. Запускаем dev-сервер
CMD ["npm", "start"]