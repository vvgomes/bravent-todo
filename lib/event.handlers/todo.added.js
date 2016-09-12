import { evolve, append } from "ramda";

const todoAdded = (state, event) =>
  evolve({
    todos: append({
      id: event.id,
      text: event.text,
      completed: false,
      timestamp: event.timestamp
    })
  }, state);
    
export default todoAdded;

