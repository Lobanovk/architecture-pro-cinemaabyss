import express from "express";

import { port } from "./config";
import { router } from "./routes";
import { monolithProxy, moviesProxy } from './middleware/proxy';

const app = express();

app.use("/api/users", monolithProxy);
app.use("/api/payments", monolithProxy);
app.use("/api/subscriptions", monolithProxy);
app.use("/api/movies", moviesProxy);

app.use(router);

app.listen(port).once("listening", () => {
  console.log(`Proxy service listening on port ${port}`);
});
