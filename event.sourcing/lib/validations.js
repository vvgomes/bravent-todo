import R from "ramda";
import Validation from "data.validation"

const Success = Validation.Success;
const Failure = Validation.Failure;

const validate = (command, validations) =>
  R.reduce((result, validation) =>
    result.ap(validation(command)),
    Success(R.curry((...args) => command)),
    validations);

const hasProp = (prop) =>
  R.ifElse(R.has(prop),
    Success,
    R.always(Failure([`Must have ${prop}`])));



