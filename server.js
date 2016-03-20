import * as todo from "./todo";
import R from "ramda";

let events = [
  {
    type: "taskAdded",
    data: {
      id: "665",
      description: "dishes"
    }
  },
  {
    type: "taskCompleted",
    data: {
      id: "665"
    }
  }
];

const command = {
  type: "addTask",
  data: {
    id: "666", 
    description: "homework"
  }
};

const state = R.reduce(R.flip(todo.apply), [], events);

events = R.append(todo.handle(command, state), events);

console.log("state:", state);
console.log("events:", events);

