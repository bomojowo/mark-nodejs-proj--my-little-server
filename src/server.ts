import express from "express";
import ponyData from "../data/ponies.json";
import { seasonOneEpisodes } from "./episodes";
import { pickRandom } from "./random";
import helloWorldData from "../data/helloWolrd.json"

const app = express();
const serverStartDate = new Date();
let serverHitCount = 0;
let activeRoute:string[] = []

app.get("/", (req, res) => {
  activeRoute.push(req.url)
  res.send(
    "This is the default path - and it isn't very interesting, sorry. \nTry visiting localhost:4000/creation-time, localhost:4000/current-time"
  );
});

app.get("/creation-time", (req, res) => {
  activeRoute.push(req.url)
  res.json({
    message: `The server was started at ${serverStartDate.toTimeString()}`,
    utc: serverStartDate.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/current-time", (req, res) => {
  const dateOfRequestHandling = new Date();
  activeRoute.push(req.url)
  res.json({
    message: `The current date is ${dateOfRequestHandling.toTimeString()}`,
    utc: dateOfRequestHandling.toUTCString(),
    countedAsHit: false,
  });
});

app.get("/hits", (req, res) => {
  serverHitCount += 1;
  res.json({
    note: "We've registered your hit!",
    currentTotal: serverHitCount,
    countedAsHit: true,
  });
});

app.get("/hits-stealth", (req, res) => {
  activeRoute.push(req.url)
  res.json({
    note: "Oooh, you ninja. We didn't count that hit.",
    currentTotal: serverHitCount,
    countedAsHit: false,
  });
});

app.get("/ponies", (req, res) => {
  activeRoute.push(req.url)
  res.json({
    message: "Loaded dummy JSON data:",
    data: ponyData,
    countedAsHit: false,
  });
});

app.get("/history", (req, res) => {
  activeRoute.push(req.url)
  res.json({
    message: 'Sites you have vistied',
    routes: activeRoute
  })
})

app.get("/ponies/random", (req, res) => {
  const randomPonies = pickRandom(ponyData.members);
  activeRoute.push(req.url)
  res.json({
    message: "random ponies",
    data: randomPonies
  })
})

app.get("/season-one", (req, res) => {
  res.json({
    countedAsHit: false,
    data: seasonOneEpisodes,
  });
});

app.get("/season-one/random", (req, res) => {
  const randomEpisode = pickRandom(seasonOneEpisodes);
  res.json({
    countedAsHit: false,
    data: randomEpisode,
  });
});

app.get("/hello-world", (req, res) => {
  res.json({
    message: "this is the data",
    data: helloWorldData
  })
})

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(
    `If you can see this message in the console, this means that you successfully started the server! \n\nYou can see what comes back by visiting localhost:${PORT_NUMBER} in your browser. \n\nChanges will not be processed unless you restart your server (close and restart). \n\nThe server is currently listening for requests - press Ctrl + C to quit.`
  );
});
