const express = require("express");
const Podlet = require("@podium/podlet");
const fs = require("fs");
var cors = require('cors')

const app = express();

app.use(cors());

// Basic definition of the podlet
const podlet = new Podlet({
  name: "layoutPod", // required
  version: "0.1.0", // required
  pathname: "/", // required
  manifest: "/manifest.json", // optional, defaults to '/manifest.json'
  development: true, // optional, defaults to false
});

//I will add the global css only once here, and not in the other svelte app
// podlet.css({ value: "http://localhost:7102/css/global.css" });
// app.use("/css", express.static("public/css/"));


// All css and js files in the build folder should be added to the podlet definition.
podlet.js({ value: "http://localhost:7102/build/dist/index.js", defer: true, type: "module" });
podlet.css({ value: "https://unpkg.com/carbon-components-svelte@0.14.0/css/all.css" });

// create a static link to the files for demo purposes.
// In production the localhost URL should be a URL going to a CDN or static file hosting.
app.use("/build", express.static("build/"));
app.use("/dist", express.static("build/dist"));
app.use("/_snowpack", express.static("build/_snowpack"));

// apply middleware
app.use(podlet.middleware());



// add HTML to send. This is the div ID in public/index.html
app.get(podlet.content(), (req, res) => {
  res.status(200).podiumSend('<div id="svelte-layout"></div>');
});

// generate the podlet manifest
app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

//start the app at port 7102
app.listen(7102);
