import { validate } from "bravent";
import { always, has, where, isEmpty, flip, complement, contains, pluck, map, pipe } from "ramda";
import uuid from "uuid";
import moment from "moment";
import utcClock from "../util/utc.clock";

const addTask = (state, command, uuidGen = uuid.v4, clock = utcClock) =>
  validate(command, {
    "Task must have a description.":
      has("description"),

    "Task description must not be empty.":
      where({ description: complement(isEmpty) }),

    "Task description must be unique.":
      where({ description: flip(complement(contains))(pluck("description", state.tasks)) })
  })
  .map(command => [{
    type: "taskAdded",
    id: uuidGen(),
    description: command.description,
    timestamp: clock()
  }]);

export default addTask;
