#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const AuthConfig = {
  clientId: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_DOMAIN,
  audience:  process.env.AUTH0_AUDIENCE,
  api: process.env.API
};

const AuthConfigServer = {
  clientId: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_DOMAIN,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbSsl: process.env.DB_SSL,
  dbPort: process.env.DB_PORT,
};

if (process.env.API && process.env.API !== '') {
// Generate output data
  const output = JSON.stringify(AuthConfig);
// Write auth file
  fs.writeFileSync('./auth_config.json', output);
}
if (process.env.AUTH0_CLIENT_SECRET && process.env.AUTH0_CLIENT_SECRET !== '') {
// Generate output data
  const outputServer = JSON.stringify(AuthConfigServer);
// Write auth file
  fs.writeFileSync('./auth_config_server.json', outputServer);
}

process.exit(0);
