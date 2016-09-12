import { validate } from "bravent";
import { where, flip, contains, pluck, map } from "ramda";
import utcClock from "../util/utc.clock";

const toggleTodo = (state, command, clock = utcClock) =>
  validate(command, {
    "Todo not found.":
      where({ id: flip(contains)(pluck("id", state.todos)) })
  })
  .map(command => [{
    type: "todoToggled",
    id: command.id,
    timestamp: clock()
  }]);

export default toggleTodo;

