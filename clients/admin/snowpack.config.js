/** @type {import("snowpack").SnowpackUserConfig } */
if (!process.env.API_BASE_URL) require('dotenv').config()
module.exports = {
  exclude: ['**/node_modules/**/*', '**/stories/**/*'],
  mount: {
    public: {url: '/', static: true},
    src: {url: '/dist'},
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    ["@snowpack/plugin-build-script", { cmd: "postcss", input: [".css"], output: [".css"] },],
    [
      'snowpack-plugin-replace',
      {
        list: [
          {
            from: 'process.env.FAKE_TOKEN',
            to: JSON.stringify(process.env.FAKE_TOKEN)
          },
          {
            from: 'process.env.API_BASE_URL',
            to: JSON.stringify(process.env.API_BASE_URL)
          },
          {
            from: 'process.env.URL',
            to: JSON.stringify(process.env.URL)
          },
          {
            from: 'process.env.KEYCLOAK_REALM',
            to: JSON.stringify(process.env.KEYCLOAK_REALM)
          },
          {
            from: 'process.env.KEYCLOAK_BASE_URL',
            to: JSON.stringify(process.env.KEYCLOAK_BASE_URL)
          },
          {
            from: 'process.env.MOCK',
            to: JSON.stringify(process.env.MOCK)
          }
        ],
      },
    ]
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 5000,
  },
  buildOptions: {
    /* ... */
  },
};
