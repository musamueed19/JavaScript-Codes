import { createClient } from "@supabase/supabase-js";
import { getDatabaseConfig } from "../configs/databaseConfig";

const dbConfig = getDatabaseConfig()
export const dbClient = createClient(dbConfig.DATABASE_URL, dbConfig.ANON_PUBLIC_KEY)