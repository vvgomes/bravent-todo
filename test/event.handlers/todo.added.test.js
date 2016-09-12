import todoAdded from "../../lib/event.handlers/todo.added";
import assert from "assert";

describe("todoAdded()", () => {
  it("adds a new todo to the todo list", () => {
    const state = { todos: [] };

    const event = {
      type: "todoAdded",
      id: "c5cdc877-19da-48eb-99f3-983cde01379f",
      text: "wash dishes",
      timestamp: "2016-09-08T01:47:00.490+0000"
    };

    assert.deepEqual(
      todoAdded(state, event),
      {
        todos: [
          {
            id: "c5cdc877-19da-48eb-99f3-983cde01379f",
            text: "wash dishes",
            completed: false,
            timestamp: "2016-09-08T01:47:00.490+0000"
          }
        ]
      }
    );
  });
});

