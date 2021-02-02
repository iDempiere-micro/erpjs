// inject the content of the .env file into 'process.env
// ONLY IF not defined as an environment variable
if (!process.env.API_BASE_URL) require('dotenv').config()
const autoPreprocess = require('svelte-preprocess');

console.log('*** process.env', process.env);

module.exports = {
  preprocess: autoPreprocess({
    defaults: {
      script: 'typescript',
    },
    replace: [
      ["process.env.API_BASE_URL", JSON.stringify(process.env.API_BASE_URL)],
      ["process.env.KEYCLOAK_BASE_URL", JSON.stringify(process.env.KEYCLOAK_BASE_URL)],
      ["process.env.KEYCLOAK_REALM", JSON.stringify(process.env.KEYCLOAK_REALM)],
      ["process.env.URL", JSON.stringify(process.env.URL)],
    ]
  }),
};
