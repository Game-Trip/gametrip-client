# Base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY ./package.json ./yarn.lock /app/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the project files
COPY ./ /app/

# Build the project
RUN yarn build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
