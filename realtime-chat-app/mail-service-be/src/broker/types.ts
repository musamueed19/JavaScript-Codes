import { type MAIL_QUEUES_TYPE } from "../mail/types.js";
export type ConsumeFromQueue = {
  queueName: MAIL_QUEUES_TYPE[keyof MAIL_QUEUES_TYPE];
  message: unknown;
};
