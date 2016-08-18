import R from "ramda";

const Aggregates = {};

// state :: (initial, events) -> current
Aggregates.build = R.curry((apply, initialState, events) =>
  R.compose(
    R.reduce(apply, initialState),
    R.sortBy(R.prop("timestamp"))
  )(events));

export default Aggregates;


