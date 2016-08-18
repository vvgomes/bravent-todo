import assert from "assert";
import R from "ramda";
import Aggregates from "../../../event.sourcing/lib/aggregates";

describe("Aggregates", () => {

  describe("build", () => {
    const handlers = {
      taskAdded: (state, event) => R.concat(state, event.payload)
    };

    const apply = R.curry((handlers, state, event) =>
      handlers[event.type](state, event));

    const events = [
      {
        type: "taskAdded",
        timestamp: "20160815T080910.124",
        payload: "take trash out"
      },
      {
        type: "taskAdded",
        timestamp: "20160815T080910.123",
        payload: "wash dishes"
      }
    ];

    it("builds the current state of the application based on past events", () => {
      assert.deepEqual(
        Aggregates.build(apply(handlers), [], events),
        [ "wash dishes", "take trash out" ]
      );
    });
  });
});

