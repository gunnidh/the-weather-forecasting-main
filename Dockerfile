# Use an official Node runtime as the base image
FROM node:16-alpine


# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the react JS application code
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
