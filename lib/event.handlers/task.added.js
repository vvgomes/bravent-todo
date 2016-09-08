import { evolve, append } from "ramda";

const taskAdded = (state, event) =>
  evolve({
    tasks: append({
      id: event.id,
      description: event.description,
      completed: false,
      timestamp: event.timestamp
    })
  }, state);
    
export default taskAdded;

