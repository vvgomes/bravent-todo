import request from "supertest";
import sinon from "sinon";
import createApp from "../lib/server";
import InMemoryEventStore from "../lib/event.store";

describe("Todo server", () => {
  let store;
  let app;

  beforeEach(() => {
    store = InMemoryEventStore.create();

    store.add([{ 
      type: "todoAdded",
      id: "c5cdc877-19da-48eb-99f3-983cde01379f",
      text: "wash dishes",
      timestamp: "2016-09-08T01:47:00.490+0000"
    }]);

    app = createApp(store);
  });

  describe("GET /events", () => {
    it("responds with the list of events", (done) => {
      request(app)
        .get("/events")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, [{
          type: "todoAdded",
          id: "c5cdc877-19da-48eb-99f3-983cde01379f",
          text: "wash dishes",
          timestamp: "2016-09-08T01:47:00.490+0000"
        }], done);
    });
  });

  describe("GET /state", () => {
    it("responds with the current state", (done) => {
      request(app)
        .get("/state")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, {
          todos: [{
            id: "c5cdc877-19da-48eb-99f3-983cde01379f",
            text: "wash dishes",
            completed: false,
            timestamp: "2016-09-08T01:47:00.490+0000"
          }]
        }, done);
    });
  });

  describe("POST /commands", () => {
    let clock;

    beforeEach(() => clock = sinon.useFakeTimers());
    afterEach(() => clock.restore());

    it("responds with the newly created events", (done) => {
      request(app)
        .post("/commands")
        .send({ type: "toggleTodo", id: "c5cdc877-19da-48eb-99f3-983cde01379f" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(202, [{
          type: "todoToggled",
          id: "c5cdc877-19da-48eb-99f3-983cde01379f",
          timestamp: "1970-01-01T00:00:00.000+0000"
        }], done);
    });

    it("responds with bad request when command is not accepted", (done) => {
      request(app)
        .post("/commands")
        .send({ type: "toggleTodo", id: "gibberish" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, [ "Todo not found." ], done);
    });
  });
});

