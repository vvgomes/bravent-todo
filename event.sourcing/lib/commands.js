import R from "ramda";
import Validation from "data.validation"

const Success = Validation.Success;
const Failure = Validation.Failure;

export const hasType = (command) => R.has(prop)

const hasProp = (prop) =>
  R.ifElse(R.has(prop),
    Success,
    R.always(Failure([`Missing command ${prop}`])));

export const canHandle = (handlers) => 
  R.ifElse(
    R.compose(
      R.flip(R.has)(handlers),
      R.prop("type")),
    Success,
    R.compose(
      Failure,
      R.concat([]),
      R.concat("No handler found for "),
      R.prop("type")));

export const validate = (command, validations) =>
  R.reduce((result, validation) =>
    result.ap(validation(command)),
    Success(R.curry((...args) => command)),
    validations);

// handle :: (state, command) -> [event]
export const handle = (handlers) => (state, command) => {
  const result = validate(command, [
    hasProp("type"),
    hasProp("payload"),
    canHandle(handlers)
  ]);

  return result.isSuccess ?
    handlers[command.type](state, command) : result;
}

