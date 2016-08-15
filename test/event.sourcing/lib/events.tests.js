import assert from "assert";
import R from "ramda";
import Validation from "data.validation"
import Events from "../../../event.sourcing/lib/events";

const Failure = Validation.Failure;

describe("Events", () => {

  describe("apply", () => {
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

    const state = {
      tasks: [
        { id: "1", description: "take trash out", completed: false }
      ]
    };

    it("applies the event when handler is found", () => {
      const event = {
        type: "taskAdded",
        timestamp: "20160815T080910.124",
        payload: { id: "2", description: "wash dishes" }
      };

      assert.deepEqual(
        Events.apply(handlers, state, event),
        {
          tasks: [
            { id: "1", description: "take trash out", completed: false },
            { id: "2", description: "wash dishes", completed: false }
          ]
        }
      );
    });

    it("fails when there is no handler for event", () => {
      const event = {
        type: "taskRemoved",
        timestamp: "20160815T080910.124",
        payload: { id: "2" }
      };

      assert.deepEqual(
        Events.apply(handlers, state, event),
        Failure(["Cannot handle event of type taskRemoved"])
      );
    });
  });
});
