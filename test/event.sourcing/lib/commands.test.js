import assert from "assert";
import Commands from "../../../event.sourcing/lib/commands";
import Validation from "data.validation"

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("Commands", () => {

  describe("handle", () => {
    const handlers = {
      addTask: (state, command) => Success({})
    };

    it("handles the command when handler is found", () => {
      const command = {
        type: "addTask",
        payload: {}
      };

      assert.deepEqual(
        Commands.handle(handlers, {}, command),
        Success({})
      );
    });

    it("fails when there is no handler for command", () => {
      const command = {
        type: "doFoo",
        payload: {}
      };

      assert.deepEqual(
        Commands.handle(handlers, {}, command),
        Failure(["Cannot handle command of type doFoo"])
      );
    });

    it("fails when command has no type", () => {
      const command = {
        payload: {}
      };

      assert.deepEqual(
        Commands.handle(handlers, {}, command),
        Failure(["Cannot handle command of type undefined"])
      );
    });
  });
});
