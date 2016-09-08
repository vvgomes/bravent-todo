import assert from "assert";
import Todo from "../lib/todo";
import { append, last, head } from "ramda";

describe("Todo", () => {
  let events;
  let ids;
  let times;

  const collectIdAndTime = (events) => {
    ids = append(last(events).id, ids);
    times = append(last(events).timestamp, times);
  }

  beforeEach(() => {
    events = [];
    ids = [];
    times = [];
  });

  it("starts with an empty task list", () => {
    const state = Todo.of(events).state();
    assert.deepEqual(state, { tasks: [] });
  });

  it("adds new tasks", () => {
    const state =
      Todo
        .of(events)
        .dispatch({ type: "addTask", description: "wash dishes" }, collectIdAndTime)
        .dispatch({ type: "addTask", description: "walk the dog" }, collectIdAndTime)
        .state();

    assert.deepEqual(
      state,
      {
        tasks: [
          {
            id: ids[0],
            description: "wash dishes",
            completed: false,
            timestamp: times[0]
          },
          {
            id: ids[1],
            description: "walk the dog",
            completed: false,
            timestamp: times[1]
          }
        ]
      }
    );
  });

  it("toggles an existing task", () => {
    const state =
      Todo
        .of(events)
        .dispatch({ type: "addTask", description: "wash dishes" }, collectIdAndTime)
        .dispatch({ type: "addTask", description: "walk the dog" }, collectIdAndTime)
        .dispatch({ type: "toggleTask", id: head(ids) })
        .state();

    assert.deepEqual(
      state,
      {
        tasks: [
          {
            id: ids[0],
            description: "wash dishes",
            completed: true,
            timestamp: times[0]
          },
          {
            id: ids[1],
            description: "walk the dog",
            completed: false,
            timestamp: times[1]
          }
        ]
      }
    );
  });
});

