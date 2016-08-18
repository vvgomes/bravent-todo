import assert from "assert";
import Commands from "../../../event.sourcing/lib/commands";
import Validation from "data.validation"

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("Commands", () => {

  describe("handle", () => {
    const handlers = {
      addTask: (state, command) => Success([
        {
          type: "taskAdded",
          timestamp: "20160815T080910.124",
          payload: command.payload
        }
      ])
    };

    it("handles the command when handler is found", () => {
      const command = {
        type: "addTask",
        payload: "wash dishes" 
      };

      assert.deepEqual(
        Commands.handle(handlers, [], command),
        Success([
          {
            type: "taskAdded",
            timestamp: "20160815T080910.124",
            payload: "wash dishes"
          }
        ])
      );
    });

    it("fails when there is no handler for command", () => {
      const command = {
        type: "removeTask",
        payload: "wash dishes"
      };

      assert.deepEqual(
        Commands.handle(handlers, [], command),
        Failure(["Cannot handle command of type removeTask"])
      );
    });

    it("fails when command has no type", () => {
      const command = {
        payload: "wash dishes"
      };

      assert.deepEqual(
        Commands.handle(handlers, [], command),
        Failure(["Cannot handle command of type undefined"])
      );
    });
  });
});

