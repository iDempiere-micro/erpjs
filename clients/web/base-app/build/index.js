import express from "express";
import Layout from "@podium/layout";
import {config} from "dotenv";
config();
const app = express();
const layout = new Layout({
  name: "layout",
  pathname: "/"
});
const features = [
  {name: "home", uriSegment: "/"},
  {name: "invoicing", uriSegment: "/invoicing"}
];
const appRegistrations = [
  {
    name: process.env[`LAYOUT_APP_NAME`] || "generalLayout",
    uri: process.env[`LAYOUT_APP_URI`] || "http://localhost:7102/manifest.json",
    featureName: "*"
  },
  {
    name: process.env[`HOMEPAGE_APP_NAME`] || "homepage",
    uri: process.env[`HOMEPAGE_APP_URI`] || "http://localhost:7103/manifest.json",
    featureName: "home",
    oldId: "homepage",
    newId: "content"
  }
];
for (let i = 1; i < +(process.env.APPS || "0") + 1; i++) {
  const app2 = {
    name: process.env[`APP_${i}_NAME`],
    uri: process.env[`APP_${i}_URI`],
    oldId: process.env[`APP_${i}_FROM_ID`],
    newId: process.env[`APP_${i}_TO_ID`],
    featureName: process.env[`APP_${i}_FEATURE`]
  };
  if (app2.name && app2.uri && app2.oldId && app2.newId && app2.featureName)
    appRegistrations.push({oldId: app2.oldId, newId: app2.newId, name: app2.name, uri: app2.uri, featureName: app2.featureName});
}
const allApps = [];
for (const registration of appRegistrations) {
  const {name, uri} = registration;
  allApps.push({
    registration,
    podiumRegisteredClient: layout.client.register({
      name,
      uri
    })
  });
}
for (const feature of features) {
  feature.apps = allApps.filter(({registration}) => registration.featureName === "*" || registration.featureName === feature.name);
}
app.use(layout.middleware());
const pageContent = (feature) => async (req, res) => {
  const incoming = res.locals.podium;
  const content = await Promise.all((feature.apps || []).map(({podiumRegisteredClient}) => podiumRegisteredClient.fetch(incoming)));
  incoming.podlets = content;
  incoming.view.title = "Home Page";
  const result = `<div>
    ${content.join("")}
  </div>
  <script src="https://cdn.jsdelivr.net/npm/keycloak-js@13.0.1/dist/keycloak.min.js"></script>
  <script>
    console.log('*** main app loaded');

    const features = [
        ${features.map(({name, uriSegment}) => `{ name: '${name}', uriSegment: '${uriSegment}' }`)}
    ];
    window.features = features;
    
    const moveApplications = () => { 
        const applications = [
          ${appRegistrations.filter(({oldId, newId}) => oldId && newId).map(({oldId, newId}) => `{ oldId: '${oldId}', newId: '${newId}' },`)}  
        ].filter(Boolean);
        for ( let {oldId, newId} of applications ) {
          const newParent = document.getElementById(newId);
          const oldParent = document.getElementById(oldId);
      
          if (oldParent && newParent) {
              while (oldParent.childNodes.length > 0) {
                  newParent.appendChild(oldParent.childNodes[0]);
              }                          
          }
        }
    };
    
    const authenticate = (callback) => {
    if (!${process.env.MOCK} && !${process.env.FAKE_TOKEN} && !window.token) {
        const keycloak = Keycloak({
            url: ${process.env.KEYCLOAK_BASE_URL} || 'http://localhost:8080/auth',
            realm: ${process.env.KEYCLOAK_REALM} || 'erpjs',
            clientId: 'erpjs',
            flow: 'implicit',
        });
        keycloak
            .init({})
            .then(function (authenticated) {
                if (!authenticated) {
                    keycloak.login({
                        redirectUri: ${process.env.URL} || 'http://localhost:5000',
                    });
                } else {
                    const { token } = keycloak;
                    if (token) {
                        // save the token
                        window.token = token;
                        callback();
                    }
                }
            })
            .catch(function (f) {
                console.error('Keycloak login failed', f);
            });
        }
    };
    
    document.addEventListener("DOMContentLoaded", ()=>authenticate(moveApplications));
  </script>
  `;
  res.podiumSend(result);
};
for (const feature of features) {
  app.get(feature.uriSegment, pageContent(feature));
}
app.listen(process.env.PORT || 5e3);
