import R from "ramda";

const Aggregates = {};

// state :: (state, event) -> state
Aggregates.build = (apply, initialState, events) =>
  R.compose(
    R.reduce(apply, initialState),
    R.sortBy(R.prop("timestamp"))
  )(events);

export default Aggregates;

