FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Make startup script executable
COPY scripts/startup.sh /usr/src/app/startup.sh
RUN chmod +x /usr/src/app/startup.sh

EXPOSE 3000

CMD ["/usr/src/app/startup.sh"]




