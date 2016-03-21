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

export const apply = R.reduce((state, event) =>
  eventHandlers[event.type](event.data)(state), []);

