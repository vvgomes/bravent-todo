# Bravent Todo ✔

This is a Javascript todo app developed with [Bravent](https://github.com/vvgomes/bravent). The goal of this project is to demonstrate the usage of the library to build applications based on [Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html). 

## Running

1. Ensure [Node.js](https://nodejs.org) is installed (v6.0.0 should work);
2. `$ npm install`
3. `$ npm start`

## API

### Add a new task

Request:

```bash
$ curl localhost:3000/commands -X POST \
  --data '{"type": "addTask", "description": "wash dishes"}' \
  -H 'Content-Type:application/json'
```

Response:

```json
[{
  "type": "taskAdded",
  "id": "cf373798-efbc-4219-8fb3-e10d4c505a0b",
  "description": "wash dishes",
  "timestamp": "2016-09-08T01:47:00.490+0000"
}]
```

### Toggle a task

Request:

```bash
$ curl localhost:3000/commands -X POST \
  --data '{"type": "toggleTask", "id": "cf373798-efbc-4219-8fb3-e10d4c505a0b"}' \
  -H 'Content-Type:application/json'
```

Response:

```json
[{
  "type": "taskToggled",
  "id": "c5cdc877-19da-48eb-99f3-983cde01379f",
  "timestamp": "2016-09-08T01:48:00.490+0000"
}]
```

### See the task list

Request:

```bash
$ curl localhost:3000/state 
```

Response:

```json
{
  "tasks": [
    {
      "id": "c5cdc877-19da-48eb-99f3-983cde01379f",
      "description": "wash dishes",
      "completed": true,
      "timestamp": "2016-09-08T01:47:00.490+0000"
    }
  ]
}
```

### See the event history

Request:

```bash
$ curl localhost:3000/events 
```

Response:

```json
[
  {
    "type": "taskAdded",
    "id": "cf373798-efbc-4219-8fb3-e10d4c505a0b",
    "description": "wash dishes",
    "timestamp": "2016-09-08T01:47:00.490+0000"
  },
  {
    "type": "taskToggled",
    "id": "c5cdc877-19da-48eb-99f3-983cde01379f",
    "timestamp": "2016-09-08T01:48:00.490+0000"
  }
]
```

The `/command` end-point accepts **commands** identified by the `type` property. (This is a variation of the approach described in [this blog post](http://vvgomes.com/cqrs-and-rest/).) As a result of a successful command request, new events are responded to the client. As the samples above show, there are two types of **domain events** in the app: `taskAdded` and `taskToggled`. Those event are used to reconstruct the **current state** of the app (the task list).

## License

Feel free to use this code as you please.
