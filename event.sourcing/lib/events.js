import R from "ramda";
import Maybe from "data.maybe"
import Validation from "data.validation"

const Events = {};
const Failure = Validation.Failure;

// apply :: (state, event) -> state
Events.apply = R.curry((handlers, state, event) =>
  Maybe
    .fromNullable(handlers[event.type])
    .map((handler) => handler(state, event))
    .getOrElse(Failure([`Cannot handle event of type ${event.type}`])));

export default Events;

