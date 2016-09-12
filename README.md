# Bravent Todo ✔

This is a Javascript todo app developed with [Bravent](https://github.com/vvgomes/bravent). The goal of this project is to demonstrate the usage of the library to build applications based on [Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html). 

## Running

1. Ensure [Node.js](https://nodejs.org) is installed (v6.0.0 should work);
2. `$ npm install`
3. `$ npm start`

## API

### Add a new todo item

Request:

```bash
$ curl localhost:3000/commands -X POST \
  --data '{"type": "addTodo", "text": "wash dishes"}' \
  -H 'Content-Type:application/json'
```

Response:

```json
[{
  "type": "todoAdded",
  "id": "cf373798-efbc-4219-8fb3-e10d4c505a0b",
  "text": "wash dishes",
  "timestamp": "2016-09-08T01:47:00.490+0000"
}]
```

### Toggle a todo

Request:

```bash
$ curl localhost:3000/commands -X POST \
  --data '{"type": "toggleTodo", "id": "cf373798-efbc-4219-8fb3-e10d4c505a0b"}' \
  -H 'Content-Type:application/json'
```

Response:

```json
[{
  "type": "todoToggled",
  "id": "c5cdc877-19da-48eb-99f3-983cde01379f",
  "timestamp": "2016-09-08T01:48:00.490+0000"
}]
```

### See the todo list

Request:

```bash
$ curl localhost:3000/state 
```

Response:

```json
{
  "todos": [
    {
      "id": "c5cdc877-19da-48eb-99f3-983cde01379f",
      "text": "wash dishes",
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
    "type": "todoAdded",
    "id": "cf373798-efbc-4219-8fb3-e10d4c505a0b",
    "text": "wash dishes",
    "timestamp": "2016-09-08T01:47:00.490+0000"
  },
  {
    "type": "todoToggled",
    "id": "c5cdc877-19da-48eb-99f3-983cde01379f",
    "timestamp": "2016-09-08T01:48:00.490+0000"
  }
]
```

The `/command` end-point accepts **commands** identified by the `type` property. (This is a variation of the approach described in [this blog post](http://vvgomes.com/cqrs-and-rest/).) As a result of a successful command request, new events are responded to the client. As the samples above show, there are two types of **domain events** in the app: `todoAdded` and `todoToggled`. Those event are used to reconstruct the **current state** of the app (the todo list).

## License

Feel free to use this code as you please.
