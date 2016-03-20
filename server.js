import express from "express";
import bodyParser from "body-parser";
import R from "ramda";
import * as todo from "./todo";

let eventStore = [];

const app = express();
app.use(bodyParser.json());

app.get("/events", (req, res) => {
  res.send(eventStore);
});

app.get("/state", (req, res) => {
  res.send(R.reduce(R.flip(todo.apply), [], eventStore));
});

app.post("/commands", (req, res) => {
  const state = R.reduce(R.flip(todo.apply), [], eventStore);
  const events = todo.handle(req.body, state);
  eventStore = R.concat(events, eventStore);
  res.send(events);
});

const server = app.listen(3000, () => {
  let port = server.address().port;
  console.log("server listening at http://localhost:%s", port);
});

