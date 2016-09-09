import { validate } from "bravent";
import { where, flip, contains, pluck, map } from "ramda";
import utcClock from "../util/utc.clock";

const toggleTask = (state, command, clock = utcClock) =>
  validate(command, {
    "Task not found.":
      where({ id: flip(contains)(pluck("id", state.tasks)) })
  })
  .map(command => [{
    type: "taskToggled",
    id: command.id,
    timestamp: clock()
  }]);

export default toggleTask;

