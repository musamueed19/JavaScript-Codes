export const DB_PROVIDERS = {
    SUPABASE: 'supabase',
    LOCALHOST: 'localhost'
} as const;

export type DB_PROVIDERS = typeof DB_PROVIDERS[keyof typeof DB_PROVIDERS];