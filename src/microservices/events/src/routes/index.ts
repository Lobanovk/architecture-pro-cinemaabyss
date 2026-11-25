import { errors } from "celebrate";
import { Router, type RequestHandler } from "express";
import { publishEvent } from "../kafka/publish-event";
import { validateMovieBody, validatePaymentBody, validateUserBody } from "../schemas";

type EventType = "movie" | "user" | "payment";

const createEventHandler = (type: EventType): RequestHandler => (req, res) => {
  const topic = `${type}-events`;
  const payload = req.body;
  const timestamp = new Date().toISOString();

  publishEvent({ topic, payload })
    .then(([metadata]) => {
      const offset = Number(metadata?.baseOffset ?? metadata?.offset);
      if (!metadata || !Number.isSafeInteger(offset) || offset < 0) {
        throw new Error(`Kafka did not return a valid offset for ${topic}`);
      }

      const { partition } = metadata;
      res.status(201).json({
        status: "success",
        partition,
        offset,
        event: {
          id: `${topic}-${partition}-${offset}`,
          type,
          timestamp,
          payload,
        },
      });
    })
    .catch(() => res.status(500).json({
      error: "Internal Server Error"
    }));
};

export const router = Router();

router.get("/api/events/health", (_request, response) => {
  response.json({ status: true });
});

router.post("/api/events/movie", validateMovieBody, createEventHandler("movie"));
router.post("/api/events/user", validateUserBody, createEventHandler("user"));
router.post("/api/events/payment", validatePaymentBody, createEventHandler("payment"));

router.use(errors());
