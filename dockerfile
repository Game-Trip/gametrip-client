ARG IMAGE_TAG=latest
# Base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the builded app
COPY ./build/ /app/

ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
# Base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the builded app
COPY ./build/ /app/

ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD ["npx", "serve", "-s"]


