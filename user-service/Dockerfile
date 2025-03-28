# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (for efficient caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Set the working directory to src (since index.js is inside src)
WORKDIR /app/src

# Expose the required port (modify per service)
EXPOSE 4000

# Start the service
CMD ["node", "index.js"]
