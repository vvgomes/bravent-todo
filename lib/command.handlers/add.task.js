import { validate } from "bravent";
import { has, where, isEmpty, flip, complement, contains, pluck, map } from "ramda";
import uuid from "uuid";
import utcClock from "../util/utc.clock";

const addTask = (state, command, uuidGen = uuid.v4, clock = utcClock) =>
  validate(command, {
    "Task must have a text description.":
      has("text"),

    "Task text must not be empty.":
      where({ text: complement(isEmpty) }),

    "Task text must be unique.":
      where({ text: flip(complement(contains))(pluck("text", state.tasks)) })
  })
  .map(command => [{
    type: "taskAdded",
    id: uuidGen(),
    text: command.text,
    timestamp: clock()
  }]);

export default addTask;
