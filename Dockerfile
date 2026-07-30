# ⭐ Base image
FROM node:18

# ⭐ Working directory
WORKDIR /app

# ⭐ Copy package files first (for caching)
COPY package*.json ./

# ⭐ Install dependencies
RUN npm install

# ⭐ Copy project files
COPY . .

# ⭐ App port
EXPOSE 3000

# ⭐ Start app
CMD ["node","index.js"]
