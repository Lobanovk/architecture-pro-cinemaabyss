export const port = Number(process.env.PORT ?? 8082);
export const KAFKA_BROKERS = (process.env.KAFKA_BROKERS ?? "").split(',');