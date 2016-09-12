import assert from "assert";
import addTodo from "../../lib/command.handlers/add.todo";
import { Success, Failure } from "bravent";
import { always } from "ramda";

describe("addTodo()", () => {

  it("produces a todoAdded event", () => {
    const uuidGen = always("c5cdc877-19da-48eb-99f3-983cde01379f");
    const clock = always("2016-09-08T01:47:00.490+0000");

    const state = { todos: [] };

    const command = {
      type: "addTodo",
      text: "wash dishes"
    };

    assert.deepEqual(
      addTodo(state, command, uuidGen, clock),
      Success([{
        type: "todoAdded",
        text: "wash dishes",
        id: "c5cdc877-19da-48eb-99f3-983cde01379f",
        timestamp: "2016-09-08T01:47:00.490+0000"
      }])
    );
  });

  it("fails when the todo does not have a text description", () => {
    const state = { todos: [] };

    const command = { type: "addTodo" };

    assert.deepEqual(
      addTodo(state, command),
      Failure(["Todo must have a text description."])
    );
  });

  it("fails when the todo text is empty", () => {
    const state = { todos: [] };

    const command = {
      type: "addTodo",
      text: ""
    };

    assert.deepEqual(
      addTodo(state, command),
      Failure(["Todo text must not be empty."])
    );
  });

  it("fails when the todo is duplicated", () => {
    const state = {
      todos: [
        {
          type: "todoAdded",
          text: "wash dishes"
        }
      ]
    };

    const command = {
      type: "addTodo",
      text: "wash dishes"
    };

    assert.deepEqual(
      addTodo(state, command),
      Failure(["Todo text must be unique."])
    );
  });
});

