import assert from "assert";
import toggleTodo from "../../lib/command.handlers/toggle.todo";
import { Success, Failure } from "bravent";
import { always } from "ramda";

describe("toggleTodo()", () => {

  it("produces a todoToggled event", () => {
    const clock = always("2016-09-08T01:49:00.490+0000");

    const state = {
      todos: [
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
      type: "toggleTodo",
      id: "666"
    };

    assert.deepEqual(
      toggleTodo(state, command, clock),
      Success([{
        type: "todoToggled",
        id: "666",
        timestamp: "2016-09-08T01:49:00.490+0000"
      }])
    );
  });

  it("fails when todo is cannot be found", () => {
    const state = {
      todos: [
        {
          id: "667",
          text: "walk the dog",
          completed: false,
          timestamp: "2016-09-08T01:48:00.490+0000"
        }
      ]
    };

    const command = {
      type: "toggleTodo",
      id: "666"
    };

    assert.deepEqual(
      toggleTodo(state, command),
      Failure(["Todo not found."])
    );
  });
});

