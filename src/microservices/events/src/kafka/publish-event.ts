import { producer } from "./client";


export const publishEvent = async (
  { topic, payload }: {
    topic: string;
    payload: Record<string, unknown>;
  }
) => {
  return producer.send({
    topic,
    messages: [{
        value: JSON.stringify(payload)
    }]
  });
};
