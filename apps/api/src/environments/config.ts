import * as fs from 'fs';

const IBMCloudEnv = require('ibm-cloud-env');

// let's support src and prod configs
const possibleMappingFiles = [
  '/apps/api/src/assets/mappings.json',
  '/assets/mappings.json',
];

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
