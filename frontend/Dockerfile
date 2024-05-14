# Use the Alpine version of the Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app/frontend/

# First copy package.json and package-lock.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy all source code to the working directory
COPY . .

# Build the application
RUN npm run build

# Next.js listens on port 3000 by default
EXPOSE 3000

# Uncomment the line below to run in development mode with live reloading
CMD ["npm", "run", "dev"]

# Uncomment the line below to run in production mode
# CMD ["npm", "start"]