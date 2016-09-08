import { sortBy, prop } from "ramda";

const InMemoryEventStore = {
  create() {
    const store = {};
    let events = [];

    store.fetch = () =>
      sortBy(prop("timestamp"), events);

    store.add = (newEvents) =>
      events = events.concat(newEvents);

    return store;
  }  
}; 

export default InMemoryEventStore;

