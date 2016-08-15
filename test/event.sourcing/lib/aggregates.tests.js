import assert from "assert";
import R from "ramda";
import Aggregates from "../../../event.sourcing/lib/aggregates";

describe("Aggregates", () => {

  describe("build", () => {
    const handlers = {
      taskAdded: (state, event) =>
        R.evolve({
          tasks: R.append({
            id: event.payload.id,
            description: event.payload.description,
            completed: false
          }) 
        })(state)
    };

    const apply = R.curry((handlers, state, event) =>
      handlers[event.type](state, event));

    it("rebuilds the current state of the application", () => {
      const events = [
        {
          type: "taskAdded",
          timestamp: "20160815T080910.124",
          payload: { id: "1", description: "take trash out" }
        },
        {
          type: "taskAdded",
          timestamp: "20160815T080910.123",
          payload: { id: "2", description: "wash dishes" }
        }
      ];

      console.log("result is:", Aggregates.build(apply(handlers), {}, events));

      assert.deepEqual(
        Aggregates.build(apply(handlers), {}, events),
        {
          tasks: [
            { id: "2", description: "wash dishes", completed: false },
            { id: "1", description: "take trash out", completed: false }
          ]
        }
      );
    });
  });
});
