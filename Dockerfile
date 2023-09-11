# Use the official Node.js image as the base image
FROM node:16.14.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

RUN npm run migration:run

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3001

# Start the application
CMD [ "npm", "run", "start:dev" ]
