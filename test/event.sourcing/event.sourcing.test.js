import R from "ramda";
import assert from "assert";
import moment from "moment";
import Validation from "data.validation"
import EventSourcing from "../../event.sourcing/event.sourcing";

describe("an event sourcing app", () => {

  const app = EventSourcing.buildApp({
    eventHandlers: {
      taskAdded: (state, event) =>
        R.concat(state, event.payload)
    },

    commandHandlers: {
      addTask: (state, command) =>
        Validation.Success([
          {
            type: "taskAdded",
            timestamp: "20160815T080910.123",
            payload: command.payload
          }
        ])
    },

    initialState: []
  });

  const events = [
    {
      type: "taskAdded",
      timestamp: "20160815T080910.121",
      payload: "wash dishes"
    },
    {
      type: "taskAdded",
      timestamp: "20160815T080910.122",
      payload: "take trash out"
    }
  ];

  describe("state", () => {
    it("constructs the state of the application based on existing events", () => {
      assert.deepEqual(
        app(events).state(),
        ["wash dishes", "take trash out"]
      );
    });
  });

  describe("handle", () => {
    it("produces events when command is handled successfully", () => {
      const command = {
        type: "addTask",
        payload: "walk the dog"
      };

      assert.deepEqual(
        app(events).handle(command),
        Validation.Success([
          {
            type: "taskAdded",
            timestamp: "20160815T080910.123",
            payload: "walk the dog"
          }
        ])
      );
    });
  });
});

