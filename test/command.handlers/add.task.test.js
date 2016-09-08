import assert from "assert";
import addTask from "../../lib/command.handlers/add.task";
import { Success, Failure } from "bravent";
import { always } from "ramda";

describe("addTask()", () => {

  it("produces a taskAdded event", () => {
    const uuidGen = always("c5cdc877-19da-48eb-99f3-983cde01379f");
    const clock = always("2016-09-08T01:47:00.490+0000");

    const state = { tasks: [] };

    const command = {
      type: "addTask",
      description: "wash dishes"
    };

    assert.deepEqual(
      addTask(state, command, uuidGen, clock),
      Success([{
        type: "taskAdded",
        description: "wash dishes",
        id: "c5cdc877-19da-48eb-99f3-983cde01379f",
        timestamp: "2016-09-08T01:47:00.490+0000"
      }])
    );
  });

  it("fails when the task does not have a description", () => {
    const state = { tasks: [] };

    const command = { type: "addTask" };

    assert.deepEqual(
      addTask(state, command),
      Failure(["Task must have a description."])
    );
  });

  it("fails when the task description is empty", () => {
    const state = { tasks: [] };

    const command = {
      type: "addTask",
      description: ""
    };

    assert.deepEqual(
      addTask(state, command),
      Failure(["Task description must not be empty."])
    );
  });

  it("fails when the task is duplicated", () => {
    const state = { tasks: [
      {
        type: "taskAdded",
        description: "wash dishes"
      }
    ]};

    const command = {
      type: "addTask",
      description: "wash dishes"
    };

    assert.deepEqual(
      addTask(state, command),
      Failure(["Task description must be unique."])
    );
  });
});

