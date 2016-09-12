import assert from "assert";
import toggleTask from "../../lib/command.handlers/toggle.task";
import { Success, Failure } from "bravent";
import { always } from "ramda";

describe("toggleTask()", () => {

  it("produces a taskToggled event", () => {
    const clock = always("2016-09-08T01:49:00.490+0000");

    const state = {
      tasks: [
        {
          id: "666",
          text: "wash dishes",
          completed: false,
          timestamp: "2016-09-08T01:47:00.490+0000"
        },
        {
          id: "667",
          text: "walk the dog",
          completed: false,
          timestamp: "2016-09-08T01:48:00.490+0000"
        }
      ]
    };

    const command = {
      type: "toggleTask",
      id: "666"
    };

    assert.deepEqual(
      toggleTask(state, command, clock),
      Success([{
        type: "taskToggled",
        id: "666",
        timestamp: "2016-09-08T01:49:00.490+0000"
      }])
    );
  });

  it("fails when task is cannot be found", () => {
    const state = {
      tasks: [
        {
          id: "667",
          text: "walk the dog",
          completed: false,
          timestamp: "2016-09-08T01:48:00.490+0000"
        }
      ]
    };

    const command = {
      type: "toggleTask",
      id: "666"
    };

    assert.deepEqual(
      toggleTask(state, command),
      Failure(["Task not found."])
    );
  });
});

