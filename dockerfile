# Use an official Node.js 18 Alpine image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy all files from the current directory to the container
COPY . /app

# Install dependencies and PM2 globally
RUN npm install && npm install pm2 -g

# Expose port 8000 to be accessible from the host
EXPOSE 8000

# Command to run when starting the container using PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
