import assert from "assert";
import Commands from "../../../event.sourcing/lib/commands";
import Validation from "data.validation"

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("Commands", () => {

  describe("hasType", () => {
    it("succeeds when command has a type", () => {
      assert.deepEqual(
        Commands.hasType({ type: "addTask" }),
        Success(command)
      );
    });

    it("fails when command doen't have a type", () => {
      assert.deepEqual(
        Commands.hasType({}),
        Failure(["Command must have type"])
      );
    });
  });

  describe("hasPayload", () => {
    it("succeeds when command has a payload", () => {
      assert.deepEqual(
        Commands.hasType({ payload: {} }),
        Success(command)
      );
    });

    it("fails when command doen't have a payload", () => {
      assert.deepEqual(
        Commands.hasType({}),
        Failure(["Command must have type"])
      );
    });
  });


});
