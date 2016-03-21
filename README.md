# Event Sourced Todo

This is a proof of concept inspired by the [Functional Data](https://vimeo.com/131636650) idea by @gregoryyoung and the [POC](https://github.com/akonwi/ganglion) already proposed by @akonwi. The goal is to illustrate how much more [simple](http://www.infoq.com/presentations/Simple-Made-Easy) an [Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html) implementation is when using **Functional Programming** as oposed to Object Oriented Programming. 

## Concepts

There are three categories of data in Functional Event Sourcing:

- **Events** => data structures which represent what have already happened;
- **State** => the current state of the application given the events;
- **Commands** => data structures which represent state transitions.
 
These represents the three categories of data we manipulate in the application. As far as the essential operations (functions) we perform on this data, they can be described as [Type Expressions](https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch7.md) like this:

- `handle :: (command, state) -> [event]` => handles a command and produces events based on current state;
- `apply :: (event, state) -> state` => applies events to (re)build the current state.

## Implementation

I chose to develop the app in Javascript [ES6](https://babeljs.io/docs/learn-es2015/) and [Ramda](http://ramdajs.com/0.19.1/index.html). Javascript is probably the most popular FP language today, so it's easy to most people to get the concepts.

There is no user interface, but the app exposes a JSON over HTTP API that looks like this:

- `GET /` => gives you the current **state** of the application;
- `GET /events` => gives you the list of **events** which have already happened;
- `POST /commands` => sends a new **command** to the application.

The supported commands are:
- **Add task** => `{ "type": "addTask", "data": { "id": "666", "description": "homework" } }`
- **Complete task** => `{ "type": "completeTask", "data": { "id": "666" } }`

## Running

Assuming you have a recent version of [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed, run this:

`npm install && npm start`

To run the tests:

`npm test`

Thanks for taking your time to read this. Feel free to [send me a message](mailto:me@vvgomes.com) in case of feedback or comments.
