export const MAIL_QUEUES = {
  SEND_OTP_MAIL_QUEUE: "send-otp-email",
  SEND_WELCOME_MAIL_QUEUE: "send-welcome-email",
  SEND_RESET_PASSWORD_MAIL_QUEUE: "send-reset-password-email",
} as const;

export type SEND_OTP_MAIL_QUEUE_MESSAGE = {
  sendTo: string[];
  mailSubject: string;
  mailBody: string;
};

// type representing the "MAIL_QUEUES" object structure:
export type MAIL_QUEUES_TYPE = typeof MAIL_QUEUES;
