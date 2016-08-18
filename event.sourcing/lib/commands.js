import R from "ramda";
import Maybe from "data.maybe"
import Validation from "data.validation"

const Commands = {};

const Success = Validation.Success;
const Failure = Validation.Failure;

const validate = (...validations) => (commands) =>
  R.reduce((result, validation) =>
    result.ap(validation(command)),
    Success(R.curry((...args) => command)),
    validations);

const hasProp = (prop) =>
  R.ifElse(R.has(prop),
    Success,
    R.always(Failure([`Missing ${prop} property`])));


// handle :: (state, command) -> [event]
Commands.handle = R.curry((handlers, state, command) =>
    Maybe
      .fromNullable(handlers[command.type])
      .map(R.flip(R.apply)(state, command))
      .getOrElse(Failure([`Cannot handle command of type ${command.type}`])));

export default Commands;


