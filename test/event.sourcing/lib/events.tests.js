import assert from "assert";
import R from "ramda";
import Events from "../../../event.sourcing/lib/events";

describe("Events", () => {

  describe("apply", () => {
    const handlers = {
      taskAdded: (state, event) => R.concat(state, event.payload)
    };

    const state = [ "wash dishes" ];

    it("applies the event when handler is found", () => {
      const event = {
        type: "taskAdded",
        timestamp: "20160815T080910.124",
        payload: "take trash out"
      };

      assert.deepEqual(
        Events.apply(handlers, state, event),
        [ "wash dishes", "take trash out" ]
      );
    });

    it("skips events when no handler is found", () => {
      const event = {
        type: "taskRemoved",
        timestamp: "20160815T080910.124",
        payload: "take trash out"
      };

      assert.deepEqual(
        Events.apply(handlers, state, event),
        [ "wash dishes" ]
      );
    });
  });
});

