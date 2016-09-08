import { evolve, map, when, propEq, not } from "ramda";

const taskToggled = (state, event) =>
  evolve({
    tasks: map(when(
      propEq("id", event.id),
      evolve({ completed: not })
    ))
  }, state);
    
export default taskToggled;

