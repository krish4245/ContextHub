FROM node:18-alpine
WORKDIR /app

# install dependencies (only backend)
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# copy project
COPY . .

WORKDIR /app/backend
EXPOSE 4000
CMD ["node", "server.js"]
