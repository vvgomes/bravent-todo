import createApp from "./lib/app";

const app = createApp();

const server = app.listen(3000, () => {
  const port = server.address().port;
  console.log("Server listening at http://localhost:%s", port);
});

