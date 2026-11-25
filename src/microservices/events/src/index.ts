import express, { type ErrorRequestHandler } from "express";
import { port } from './config'
import { router } from './routes';
import { producer } from './kafka/client'
import { startConsumer } from './kafka/start-consumer';

const app = express();

const jsonParseError: ErrorRequestHandler = (error, _req, res, next) => {
  if (error.type === "entity.parse.failed") {
    res.status(400).json({ error: "Invalid JSON body" });
    return;
  }

  next(error);
};

app.use(express.json());
app.use(jsonParseError);
app.use(router);

const start = async (): Promise<void> => {

  await producer.connect();
  await startConsumer(['movie-events', 'user-events', 'payment-events'])

  app.listen(port).once("listening", () => {
    console.log(`Events service listening on port ${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start:', err);
  process.exit(1);
});
