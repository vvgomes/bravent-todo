import express from "express";
import bodyParser from "body-parser";
import R from "ramda";
import * as todo from "./todo";

let events = [];

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send(todo.apply(events));
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/commands", (req, res) => {
  events = R.compose(
    R.concat(events),
    todo.handle(req.body),
    todo.apply
  )(events);
  res.sendStatus(202);
});

const server = app.listen(3000, () => {
  let port = server.address().port;
  console.log("server listening at http://localhost:%s", port);
});

