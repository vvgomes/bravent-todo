var assert = require("assert");
var commands = require("../../../event.sourcing/lib/commands");

describe("commands", () => {
  describe("hasType", () => {
    it("returns true when command has a type", () => {
      assert(commands.hasType({type: "addTask"}));
    });

    it("returns false when command doen't have a type", () => {
      assert(!commands.hasType({}));
    });
  });
});
