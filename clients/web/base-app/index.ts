import express from 'express';
import Layout from '@podium/layout';
import {config} from 'dotenv';

config();
const app = express();

// registering the layout
const layout = new Layout({
    name: 'layout', // required
    pathname: '/', // required
});

interface AppRegistration {
    name: string;
    uri: string;
    oldId?: string;
    newId?: string;
}

const appRegistrations: AppRegistration[] = [
    {
        name: process.env[`LAYOUT_APP_NAME`] || 'generalLayout',
        uri: process.env[`LAYOUT_APP_URI`] || 'http://localhost:7102/manifest.json',
    },
];

for (let i = 1; i < +(process.env.APPS || '0') + 1; i++) {
    const app = {
        name: process.env[`APP_${i}_NAME`],
        uri: process.env[`APP_${i}_URI`],
        oldId: process.env[`APP_${i}_FROM_ID`],
        newId: process.env[`APP_${i}_TO_ID`],
    };
    if (app.name && app.uri && app.oldId && app.newId)
        appRegistrations.push({ oldId: app.oldId, newId: app.newId, name: app.name, uri: app.uri });
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const apps: any[] = [];

for (const { name, uri } of appRegistrations) {
    apps.push(
        layout.client.register({
            name,
            uri,
        }),
    );
}

app.use(layout.middleware());

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const pageContent = async (req: any, res: any) => {
    const incoming = res.locals.podium;

    //fetching the podlet data
    const content = await Promise.all(apps.map((app) => app.fetch(incoming)));

    //binding the podlet data to the layout
    incoming.podlets = content;
    incoming.view.title = 'Home Page';

    const result = `<div>
    ${content.join('')}
  </div>
  <script src="https://cdn.jsdelivr.net/npm/keycloak-js@13.0.1/dist/keycloak.min.js"></script>
  <script>
    console.log('*** main app loaded');
    
    const moveApplications = () => { 
        const applications = [
          ${appRegistrations
              .filter(({ oldId, newId }) => oldId && newId)
              .map(({ oldId, newId }) => `{ oldId: '${oldId}', newId: '${newId}' },`)}  
        ].filter(Boolean);
        for ( let {oldId, newId} of applications ) {
          const newParent = document.getElementById(newId);
          const oldParent = document.getElementById(oldId);
      
          while (oldParent.childNodes.length > 0) {
              newParent.appendChild(oldParent.childNodes[0]);
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

// what should be returned when someone goes to the root URL
app.get('/', pageContent);

app.listen(process.env.PORT || 5000);
