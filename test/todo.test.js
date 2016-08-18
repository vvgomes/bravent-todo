import assert from "assert";
import Validation from "data.validation";
import Todo from "../todo";

describe("Todo", () => {

  describe("command handlers", () => {

    describe("addTask", () => {
      xit("produces a taskAdded event", () => {
        const command = {
          type: "addTask",
          payload: "wash dishes" 
        };

        assert.deepEqual(
          Todo.app([]).handle(command),
          Validation.Success([
            {
              type: "taskAdded",
              timestamp: "20160815T080910.124",
              payload: "wash dishes"
            }
          ])
        );
      });

      xit("fails when task description is empty", () => {
        const command = {
          type: "addTask",
          payload: "" 
        };

        assert.deepEqual(
          Todo.app([]).handle(command),
          Validation.Failure(["Task description must be provided"])
        );
      });

      xit("fails when task description is duplicated", () => {
        const events = [
          {
            type: "taskAdded",
            timestamp: "20160815T080910.124",
            payload: "wash dishes"
          }
        ];

        const command = {
          type: "addTask",
          payload: "wash dishes" 
        };

        assert.deepEqual(
          Todo.app([]).handle(command),
          Validation.Failure(["Task description must be unique"])
        );
      });
    });
  });

  describe("event handlers", () => {
    describe("taskAdded", () => {
      xit("causes a new task to be added to the todo list", () => {
        const events = [
          {
            type: "taskAdded",
            timestamp: "20160815T080910.124",
            payload: "take trash out"
          }
        ];

        assert.deepEqual(
          Todo.app(events).state(),
          ["take trash out"]
        );
      });
    });
  });
});

