FROM node:22-bullseye-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and Prisma schema
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
