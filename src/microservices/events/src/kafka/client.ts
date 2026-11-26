import { Kafka } from 'kafkajs';

import { KAFKA_BROKERS } from "../config"

const kafka = new Kafka({
    clientId: "cinemaabyss-events-service",
    brokers: KAFKA_BROKERS
});

export const consumer = kafka.consumer({
    groupId: "cinemaabyss-events-group"
})

export const producer = kafka.producer();