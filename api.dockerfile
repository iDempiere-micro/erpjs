# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Install BASH to make our lives easier for entrypoint.sh...
RUN apk add bash

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM node:16-alpine AS builder

# Install BASH to make our lives easier for entrypoint.sh...
RUN apk add bash

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build api

# Production image, copy all the files and run next
FROM node:16-alpine AS runner

# Install BASH to make our lives easier for entrypoint.sh...
RUN apk add bash

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

############
# Permissions to write files when executing entrypoint
RUN chown -R nextjs:nodejs /app

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/api ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "main"]