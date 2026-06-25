import amqp from "amqplib";
import { getBrokerConfig } from "../config/brokerConfig.js";
import { type ConsumeFromQueue } from "./types.js";
import {
  MAIL_QUEUES,
  type SEND_OTP_MAIL_QUEUE_MESSAGE,
} from "../mail/types.js";

export type BrokerClient = Awaited<ReturnType<typeof getBrokerClient>>;
export type BrokerChannel = Awaited<ReturnType<typeof getBrokerChannel>>;

let channel: amqp.Channel | null = null;
export const getBrokerClient = async () => {
  try {
    const { hostname, port, username, password } = getBrokerConfig();
    const connection = await amqp.connect({
      protocol: "amqp",
      hostname,
      port,
      username,
      password,
    });
    console.log(
      "✅ Connected to Broker Successfully"
      // connection
    );
    return connection;
  } catch (error) {
    console.log("Failed to connect to the RabbitMQ", error);
    throw error;
  }
};

export const getBrokerChannel = async () => {
  const client: BrokerClient = await getBrokerClient();
  channel = await client.createChannel();
  console.log(
    "✅ Created Broker Channel"
    // channel
  );
  return channel;
};

export const consume = async ({
  queueName,
}: ConsumeFromQueue): Promise<SEND_OTP_MAIL_QUEUE_MESSAGE | void> => {
  if (!channel) {
    console.error("Broker channel is not initialized");
    // throw new Error("Broker channel is not initialized");
  }

  // this below statement is doing:
  //

  await channel?.assertQueue(queueName, {
    durable: true,
  });

  console.log("✅ Mail Service Consumer Started Consuming");

  await channel?.consume(queueName, async (message) => {
    if (message) {
      try {
        const parsedMessage = JSON.parse(message.content.toString());
        return resolveAndParseQueueMessage(queueName, parsedMessage);
      } catch (err) {
        console.error("Error processing message:", err);
      }
    } else {
      console.error("Received null or undefined message from queue");
    }
  });
};

export const resolveAndParseQueueMessage = (
  queueName: ConsumeFromQueue["queueName"],
  message: amqp.ConsumeMessage
) => {
  console.log("✅ Received Message from Queue:", message);
  switch (queueName) {
    case MAIL_QUEUES.SEND_OTP_MAIL_QUEUE:
      return JSON.parse(message.content.toString());
    default:
      console.error("Unhandled queue name:", queueName);
  }
};
