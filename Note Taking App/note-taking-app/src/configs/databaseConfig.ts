import { DB_PROVIDERS } from "./types";

export const getDatabaseConfig = () => {
    let dbURL = import.meta.env.DB_URL;
    const dbHost = import.meta.env.DB_HOST;
    const dbName = import.meta.env.DB_NAME;
    const dbPort = import.meta.env.DB_PORT;
    const dbUsername = import.meta.env.DB_USERNAME;
    const dbPassword = import.meta.env.DB_PASS;

    // supabase specific env variables
    const supabaseAnonPublicKey = import.meta.env.SUPABASE_ANON_KEY;

    // database provider
    const dbProvider = import.meta.env.DB_PROVIDER as DB_PROVIDERS;

    if (!Object.values(DB_PROVIDERS).includes(dbProvider))
        throw new Error(`Invalid DB_PROVIDER. Allowed values are ${Object.values(DB_PROVIDERS).join(', ')}`)

    if (dbProvider === DB_PROVIDERS.SUPABASE && !supabaseAnonPublicKey)
        throw new Error(`SUPABASE_ANON_KEY is missing. It is required for DB_PROVIDER: ${dbProvider}`)

    if (!dbURL) {
        if (!dbUsername || !dbHost || !dbName || !dbPassword || !dbPort)
            throw new Error(`DB_HOST, DB_NAME, DB_USERNAME, DB_PASS, DB_PORT these are mandatory. When DB_URL is missing`)

        // Constructing the PostgreSQL connection string
        // Format: postgresql://[user]:[password]@[host]:[port]/[dbname]
        dbURL = `postgresql://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`

    }
    return {
        DATABASE_URL: dbURL,
        DB_PROVIDER: dbProvider,
        ...(dbProvider === DB_PROVIDERS.SUPABASE ? { ANON_PUBLIC_KEY: supabaseAnonPublicKey } : {})
    }

} 