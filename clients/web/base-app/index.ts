import express from "express";
import Layout from "@podium/layout";

require('dotenv').config();
const app = express();

// registering the layout
const layout = new Layout({
  name: "layout", // required
  pathname: "/", // required
});

interface AppRegistration {
  name: string;
  uri: string;
  oldId?: string;
  newId?: string;
}

const appRegistrations : AppRegistration[] = [
  {
    name: process.env[`LAYOUT_APP_NAME`] || 'generalLayout',
    uri: process.env[`LAYOUT_APP_URI`] || 'http://localhost:7102/manifest.json',
  }
];

for (let i = 1; i < +(process.env.APPS || '0') + 1; i++) {
  const app = {
    name : process.env[`APP_${i}_NAME`],
    uri: process.env[`APP_${i}_URI`],
    oldId: process.env[`APP_${i}_FROM_ID`],
    newId: process.env[`APP_${i}_TO_ID`],
  };
  if (app.name && app.uri && app.oldId && app.newId) appRegistrations.push({oldId: app.oldId, newId: app.newId, name: app.name, uri: app.uri});
}

const apps : any[] = [];

for (let {name, uri} of appRegistrations) {
  apps.push(layout.client.register({
    name,
    uri
  }));
}

app.use(layout.middleware());

// what should be returned when someone goes to the root URL
app.get("/", async (req: any, res: any) => {
  const incoming = res.locals.podium;

  //fetching the podlet data
  const content = await Promise.all(
      apps.map((app)=>app.fetch(incoming))
  );

  //binding the podlet data to the layout
  incoming.podlets = content;
  incoming.view.title = "Home Page";

  const result = `<div>
    ${content.join()}
  </div>
  <script>
    console.log('*** main app loaded');
    
    const moveApplications = () => { 
        const applications = [
          ${appRegistrations.filter(({oldId, newId}) => oldId && newId).map(
      ({oldId, newId}) => `{ oldId: '${oldId}', newId: '${newId}' },`
  )}  
        ].filter(Boolean);
        for ( let {oldId, newId} of applications ) {
          const newParent = document.getElementById(newId);
          const oldParent = document.getElementById(oldId);
      
          while (oldParent.childNodes.length > 0) {
              newParent.appendChild(oldParent.childNodes[0]);
          }            
        }
    };
    
    document.addEventListener("DOMContentLoaded", moveApplications);
  </script>
  `;


  res.podiumSend(result);
});


app.listen(process.env.PORT || 5000);
