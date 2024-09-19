# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Set environment variables
# ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Copy the main package.json and package-lock.json (if available)
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
COPY package*.json ./

# Install dependencies for the main app
# RUN npm install --production --silent && mv node_modules ../
RUN npm install

# Copy the rest of the main app code
COPY . .

# Change to the subdirectory where the React app is located
WORKDIR /app/frontend

# Copy the subdirectory package.json (React app package.json)
COPY frontend/package*.json ./

# Install dependencies for the React app
RUN npm install

# Copy the rest of the React app's files
COPY frontend/ .

# Build the app in sub directory
RUN npm run build

# Expose the port the app will run on
EXPOSE 5000

# Change the directory ownership, the container will run as the non-root node user instead of root, improving security.
RUN chown -R node /app
USER node

# Move to the main working directory inside the container
WORKDIR /app

# Command to run the app
CMD ["npm", "start"]
