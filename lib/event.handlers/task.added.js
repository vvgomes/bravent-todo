import { evolve, append } from "ramda";

const taskAdded = (state, event) =>
  evolve({
    tasks: append({
      id: event.id,
      text: event.text,
      completed: false,
      timestamp: event.timestamp
    })
  }, state);
    
export default taskAdded;

