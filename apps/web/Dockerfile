FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm or use npm ci for dependencies
COPY package*.json ./
COPY .npmrc ./
RUN npm ci

# Build stage
FROM base AS builder
WORKDIR /app
COPY . .
RUN npm run build --filter=@study/web

# Production image
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json

WORKDIR /app/apps/web

EXPOSE 3001

CMD ["npm", "run", "start"]