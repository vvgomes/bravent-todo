import { validate } from "bravent";
import { has, where, isEmpty, flip, complement, contains, pluck, map, pipe } from "ramda";
import uuid from "uuid";
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

