import express from "express";
import bodyParser from "body-parser";
import Todos from "./todos";
import InMemoryEventStore from "./event.store";

const createServer = (eventStore = InMemoryEventStore.create()) => {
  const app = express();
  app.use(bodyParser.json());

  app.get("/state", (req, res) => {
    const events = eventStore.fetch();
    const state = Todos.of(events).state()
    res.status(200).json(state);
  });

  app.post("/commands", (req, res) => {
    const command = req.body;
    const events = eventStore.fetch();

    const onSuccess = (newEvents) => {
      eventStore.add(newEvents);
      res.status(202).json(newEvents);
    };

    const onFailure = (errors) => {
      res.status(400).json(errors);
    };

    Todos.of(events).dispatch(command, onSuccess, onFailure);
  });

  app.get("/events", (req, res) => {
    res.status(200).json(eventStore.fetch());
  });

  return app;
};

export default createServer;

