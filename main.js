import createServer from "./lib/server";

const port = 3000;

createServer().listen(port, () =>
  console.log("Server listening at http://localhost:%s", port));

