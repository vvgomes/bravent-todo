import taskAdded from "../../lib/event.handlers/task.added";
import assert from "assert";

describe("taskAdded()", () => {
  it("adds a new task to the task list", () => {
    const state = { tasks: [] };

    const event = {
      type: "taskAdded",
      id: "c5cdc877-19da-48eb-99f3-983cde01379f",
      description: "wash dishes",
      timestamp: "2016-09-08T01:47:00.490+0000"
    };

    assert.deepEqual(
      taskAdded(state, event),
      {
        tasks: [
          {
            id: "c5cdc877-19da-48eb-99f3-983cde01379f",
            description: "wash dishes",
            completed: false,
            timestamp: "2016-09-08T01:47:00.490+0000"
          }
        ]
      }
    );
  });
});

