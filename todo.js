import R from "ramda";

const commandHandlers = {
  addTask: (data) =>
    R.ifElse(
      R.find(R.where({ id: R.equals(data.id) })),
      R.empty,
      R.always([{
        type: "taskAdded",
        data: data
      }])),

  completeTask: (data) => 
    R.ifElse(
      R.find(R.where({ id: R.equals(data.id) })),
      R.always([{
        type: "taskCompleted",
        data: data
      }]),
      R.empty)
};

const eventHandlers = {
  taskAdded: (data) =>
    R.append(R.assoc("completed", false, data)),

  taskCompleted: (data) =>
    R.map(R.ifElse(
      R.propEq("id", data.id),
      R.set(R.lensProp("completed"), true),
      R.identity))
};

export const handle = (command) =>
  commandHandlers[command.type](command.data);

export const apply = (event) =>
  eventHandlers[event.type](event.data);

export const currentState =
  R.reduce((state, event) => apply(event)(state), []);

