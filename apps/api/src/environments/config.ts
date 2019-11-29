import * as fs from 'fs';

const IBMCloudEnv = require('ibm-cloud-env');

// let's support src and prod configs
const possibleMappingFiles = [
  '/apps/api/src/assets/mappings.json',
  '/assets/mappings.json',
];

const localSecurityFile = './auth_config_server.json';
if (!fs.existsSync(localSecurityFile)) {
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
    anonym: process.env.ANONYM,
  };

  if (process.env.AUTH0_CLIENT_SECRET && process.env.AUTH0_CLIENT_SECRET !== '') {
// Generate output data
    const outputServer = JSON.stringify(AuthConfigServer);
// Write auth file
    fs.writeFileSync('./auth_config_server.json', outputServer);
  }
}

for (const possibleMappingFile of possibleMappingFiles) {
  if (fs.existsSync('.' + possibleMappingFile)) {
    IBMCloudEnv.init(possibleMappingFile);
    break;
  }
}

export const auth0Domain = IBMCloudEnv.getString('auth0-domain');
export const auth0ClientId = IBMCloudEnv.getString('auth0-clientId');
export const auth0ClientSecret = IBMCloudEnv.getString('auth0-clientSecret');
export const dbHost = IBMCloudEnv.getString('db-host');
export const dbName = IBMCloudEnv.getString('db-name');
export const dbUser = IBMCloudEnv.getString('db-user');
export const dbPassword = IBMCloudEnv.getString('db-password');
export const dbSsl = IBMCloudEnv.getString('db-ssl') === 'true';
export const dbPort = +IBMCloudEnv.getString('db-port');
export const appPort = +IBMCloudEnv.getString('port');
export const anonym = IBMCloudEnv.getString('anonym') === 'true';
