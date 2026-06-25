import ampq from "amqplib";
import { getBrokerConfig } from "../config/brokerConfig.js";
import {type PublishToQueue} from "./types.js"

export type BrokerClient = Awaited<ReturnType<typeof getBrokerClient>>;
export type BrokerChannel = Awaited<ReturnType<typeof getBrokerChannel>>;

let channel: ampq.Channel | null = null;
export const getBrokerClient = async () => {
    try {
        const { hostname, port, username, password } = getBrokerConfig();
        const connection = await ampq.connect({
            protocol: "amqp",
            hostname,
            port,
            username,
            password
        });
        console.log('✅ Connected to Broker Successfully', 
            // connection
        )
        return connection
    } catch (error) {
        console.log('Failed to connect to the RabbitMQ', error);
        throw error;
    }
}

export const getBrokerChannel = async () => {
    const client: BrokerClient = await getBrokerClient();
    channel = await client.createChannel();
    console.log('✅ Created Broker Channel', 
        // channel
    );
    return channel;
}

export const publish = async ({queueName, message}: PublishToQueue) => {
    if (!channel) {
        console.error("Broker channel is not initialized");
        // throw new Error("Broker channel is not initialized");
    }
    
    // this below statement is doing:
    // 

    await channel?.assertQueue(queueName, {
        durable: true
    })

    const isSent = channel?.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        persistent: true
    })
}