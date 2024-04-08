# Use the official lightweight Node.js 18 image.
# Alpine is chosen for its small footprint compared to Debian/Ubuntu
FROM node:18-alpine

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install app dependencies including pm2 globally
RUN npm install && npm install pm2 -g

# Expose port 8000 to the outside once the container has launched
EXPOSE 8000

# Start the application using the start script defined in package.json
CMD ["npm", "start"]
