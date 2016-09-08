import taskToggled from "../../lib/event.handlers/task.toggled";
import assert from "assert";

describe("taskToggled()", () => {
  it("marks an uncompleted task as completed", () => {
    const state = {
      tasks: [
        {
          id: "666",
          description: "wash dishes",
          completed: false,
          timestamp: "2016-09-08T01:47:00.490+0000"
        },
        {
          id: "667",
          description: "walk the dog",
          completed: false,
          timestamp: "2016-09-08T01:48:00.490+0000"
        }
      ]
    };

    const event = {
      type: "taskToggled",
      id: "666",
      timestamp: "2016-09-08T01:48:00.490+0000"
    };

    assert.deepEqual(
      taskToggled(state, event),
      {
        tasks: [
          {
            id: "666",
            description: "wash dishes",
            completed: true,
            timestamp: "2016-09-08T01:47:00.490+0000"
          },
          {
            id: "667",
            description: "walk the dog",
            completed: false,
            timestamp: "2016-09-08T01:48:00.490+0000"
          }
        ]
      }
    );
  });

  it("marks a completed task back to uncompleted", () => {
    const state = {
      tasks: [
        {
          id: "666",
          description: "wash dishes",
          completed: true,
          timestamp: "2016-09-08T01:47:00.490+0000"
        },
        {
          id: "667",
          description: "walk the dog",
          completed: false,
          timestamp: "2016-09-08T01:48:00.490+0000"
        }
      ]
    };

    const event = {
      type: "taskToggled",
      id: "666",
      timestamp: "2016-09-08T01:48:00.490+0000"
    };

    assert.deepEqual(
      taskToggled(state, event),
      {
        tasks: [
          {
            id: "666",
            description: "wash dishes",
            completed: false,
            timestamp: "2016-09-08T01:47:00.490+0000"
          },
          {
            id: "667",
            description: "walk the dog",
            completed: false,
            timestamp: "2016-09-08T01:48:00.490+0000"
          }
        ]
      }
    );
  });

  it("does nothing when the task cannot be found", () => {
    const state = {
      tasks: [
        {
          id: "667",
          description: "walk the dog",
          completed: false,
          timestamp: "2016-09-08T01:48:00.490+0000"
        }
      ]
    };

    const event = {
      type: "taskToggled",
      id: "666",
      timestamp: "2016-09-08T01:48:00.490+0000"
    };

    assert.deepEqual(
      taskToggled(state, event),
      {
        tasks: [
          {
            id: "667",
            description: "walk the dog",
            completed: false,
            timestamp: "2016-09-08T01:48:00.490+0000"
          }
        ]
      }
    );
  });
});

