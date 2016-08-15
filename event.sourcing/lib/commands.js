import R from "ramda";
import Maybe from "data.maybe"
import Validation from "data.validation"

const Commands = {};
const Failure = Validation.Failure;

// handle :: (state, command) -> [event]
Commands.handle = (handlers, state, command) =>
  Maybe
    .fromNullable(handlers[command.type])
    .map((handler) => handler(state, command))
    .getOrElse(Failure([`Cannot handle command of type ${command.type}`]));

export default Commands;

