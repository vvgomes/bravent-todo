var assert = require("assert");
var todo = require("../todo");

describe("todo", function() {
  describe("command handlers", function () {
    it("adds a new task", function () {
      var state = [];

      var command = {
        type: "addTask",
        data: {
          id: "666", 
          description: "homework"
        }
      };

      var expectedEvents = [{
        type: "taskAdded",
        data: {
          id: "666", 
          description: "homework"
        }
      }];

      assert.deepEqual(expectedEvents, todo.handle(command, state));
    });

    it("fails to add a new task when id is already in use", function () {
      var state = [{
        id: "666",
        description: "dishes",
        completed: false
      }];

      var command = {
        type: "addTask",
        data: {
          id: "666", 
          description: "homework"
        }
      };

      var expectedEvents = [];

      assert.deepEqual(expectedEvents, todo.handle(command, state));
    });

    it("completes an existing task", function () {
      var state = [{
        id: "666",
        description: "homework",
        completed: false
      }];

      var command = {
        type: "completeTask",
        data: { id: "666" }
      };

      var expectedEvents = [{
        type: "taskCompleted",
        data: { id: "666" }
      }];

      assert.deepEqual(expectedEvents, todo.handle(command, state));
    });

    it("fails to complete a task that does not exist", function () {
      var state = [];

      var command = {
        type: "completeTask",
        data: { id: "666" }
      };

      var expectedEvents = [];

      assert.deepEqual(expectedEvents, todo.handle(command, state));
    });
  });

  describe("event handlers", function () {
    it("applies task added", function () {
      var state = [];

      var event = {
        type: "taskAdded",
        data: {
          id: "666", 
          description: "homework"
        }
      };

      var resultingState = [{
        id: "666", 
        description: "homework",
        completed: false
      }];

      assert.deepEqual(resultingState, todo.apply(event, state));
    });

    it("applies task completed", function () {
      var state = [{
        id: "666",
        description: "homework",
        completed: false
      }];

      var event = {
        type: "taskCompleted",
        data: { id: "666" }
      };

      var resultingState = [{
        id: "666", 
        description: "homework",
        completed: true
      }];

      assert.deepEqual(resultingState, todo.apply(event, state));
    });

  });
});
