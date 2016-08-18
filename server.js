import express from "express";
import bodyParser from "body-parser";
import R from "ramda";
import Todo from "./todo"

let events = [];

const app = express();
app.use(bodyParser.json());

app.get("/events", (req, res) => {
  res.send(events);
});

app.get("/state", (req, res) => {
  res.send(Todo.app(events).state());
});

app.post("/commands", (req, res) => {
  const command = req.body;
  const result = Todo.app(events).handle(command);

  if (result.isSuccess) {
    const newEvents = result.get();
    events = R.concat(events, newEvents);
    res.status(202).send(newEvents);
  }
  else {
    res.status(400).send(result);
  }
});

const server = app.listen(3000, () => {
  let port = server.address().port;
  console.log("server listening at http://localhost:%s", port);
});


