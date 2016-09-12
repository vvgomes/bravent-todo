import { evolve, map, when, propEq, not } from "ramda";

const todoToggled = (state, event) =>
  evolve({
    todos: map(when(
      propEq("id", event.id),
      evolve({ completed: not })
    ))
  }, state);
    
export default todoToggled;

