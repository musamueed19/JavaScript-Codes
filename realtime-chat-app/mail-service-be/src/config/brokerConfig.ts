import {type BrokerConfig} from './types.js';

export const getBrokerConfig = (): BrokerConfig => {
    const hostname = process.env.BROKER_HOSTNAME as string | undefined;
    const port = process.env.BROKER_PORT as number | undefined;
    const username = process.env.BROKER_USERNAME as string | undefined;
    const password = process.env.BROKER_PASSWORD as string | undefined;

if (!hostname || !port || !username || !password) {
    switch (true) {
        case !hostname:
            throw new Error(
                "BROKER_HOSTNAME environment variable is missing. It is required for RabbitMQ connection."
            );
        case !port:
            throw new Error(
                "BROKER_PORT environment variable is missing. It is required for RabbitMQ connection."
            );
        case !username:
            throw new Error(
                "BROKER_USERNAME environment variable is missing. It is required for RabbitMQ connection."
            );
        case !password:
            throw new Error(
                "BROKER_PASSWORD environment variable is missing. It is required for RabbitMQ connection."
            );
        default:
            throw new Error(
                "One or more RabbitMQ configuration environment variables are missing."
            );
    }
}

return {hostname, port, username, password}

}