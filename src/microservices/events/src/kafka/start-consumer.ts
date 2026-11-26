import { consumer } from './client';

export const startConsumer = async (topics: string[]) => {
    await consumer.connect();
    await consumer.subscribe({ topics, fromBeginning: true });
    consumer.on(consumer.events.CRASH, ({ payload: { error, restart } }) => {
        console.error(error);
        if (restart !== true) {
              process.exit(1);
        }
    })
    let unsubscribe: (() => void) | undefined;
    let timeoutId: NodeJS.Timeout | undefined;
    const joined = new Promise<void>((resolve, reject) => {
        unsubscribe = consumer.on(consumer.events.GROUP_JOIN, () => {
            resolve();
        })
        timeoutId = setTimeout(() => {
            reject(new Error("Kafka Consumer GROUP_JOIN timeout"));
        }, 15000);
    });
    try {
        await Promise.all([
            consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    console.log(topic, partition, message.offset, message.value?.toString())
                }
            }),
            joined,
        ]);
    } finally {
        unsubscribe?.();
        clearTimeout(timeoutId);
    }
}
