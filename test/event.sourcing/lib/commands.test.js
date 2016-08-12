import assert from "assert";
import Commands from "../../../event.sourcing/lib/commands";

import Validation from "data.validation"

const Success = Validation.Success;
const Failure = Validation.Failure;

describe("Commands", () => {
  describe("hasType", () => {
    it("succeeds when command has a type", () => {
      console.log("Commands:", Commands);
      const command = {type: "addTask"};
      assert.equal(Success(command), Commands.hasType(command));
    });

    it("fails when command doen't have a type", () => {
      assert.equal(Failure(["Command must have type."]), Commands.hasType({}));
    });
  });
});
