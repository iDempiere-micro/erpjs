const express = require("express");
const app = express();

const Index = require("@podium/layout");

// registering the layout
const layout = new Index({
  name: "layout", // required
  pathname: "/", // required
});

for (let i = 1; i < +process.env.APPS; i++) {
  const app = {
    name : process.env[`APP_${i}_NAME`],
    uri: process.env[`APP_${i}_URI`]
  };
}

// registering the Svelte micro frontends (podlets)
const sveltemessagepod = layout.client.register({
  name: "svelteMessagePod", // required
  uri: "http://localhost:7100/manifest.json", // required
});
const sveltereceivepod = layout.client.register({
  name: "svelteReceivePod", // required
  uri: "http://localhost:7101/manifest.json", // required
});
const layoutpod = layout.client.register({
  name: "layoutPod", // required
  uri: "http://localhost:7102/manifest.json", // required
});

app.use(layout.middleware());

// what should be returned when someone goes to the root URL
app.get("/", async (req: any, res: any) => {
  const incoming = res.locals.podium;

  //fetching the podlet data
  const content = await Promise.all([
    sveltemessagepod.fetch(incoming),
    sveltereceivepod.fetch(incoming),
    layoutpod.fetch(incoming),
  ]);

  //binding the podlet data to the layout
  incoming.podlets = content;
  incoming.view.title = "Home Page";

  const result = `<div>
    ${content[2]}
    ${content[0]}
    ${content[1]}
  </div>
  <script>
    console.log('*** main app loaded');
    
    const moveApplications = () => { 
        const applications = [
          { oldId: 'svelte-message', newId: 'svelte-message2' }  ,
          { oldId: 'svelte-receive', newId: 'svelte-receive2' }
        ];
        for ( const {oldId, newId} of applications ) {
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


app.listen(7000);
