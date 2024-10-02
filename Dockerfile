FROM node:20.14-alpine3.19

WORKDIR /app
COPY package*.json .

RUN npm ci

COPY . ./

RUN npm run build && \
    rm .env.development .env.production

# Create a non-root user called 'appuser'
# Change ownership of the binary to the non-root user
RUN adduser -D -g '' appuser && \
    chown appuser:appuser /app

# Switch to the non-root user
USER appuser

CMD [ "npm","start" ]