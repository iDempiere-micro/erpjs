require('dotenv').config() // inject the content of the .env file into 'process.env
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