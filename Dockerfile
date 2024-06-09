# Use the latest stable version of Node.js
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Update npm to the latest version
RUN npm install -g npm@latest

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application using PM2
CMD ["pm2-runtime", "dev", "index.js"]
