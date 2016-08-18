import Events from "./lib/events";
import Commands from "./lib/commands";
import Aggregates from "./lib/aggregates";

const EventSourcing  = {};

EventSourcing.buildApp = (config) => {
  const apply = Events.apply(config.eventHandlers || {})
  const handle = Commands.handle(config.commandHandlers || {});
  const aggregate = Aggregates.build(apply, config.initialState || {});

  return (events) => {
    const app = {}; 

    app.state = () =>
      aggregate(events);

    app.handle = (command) =>
      handle(app.state(), command);

    return app;
  };
};

export default EventSourcing;


