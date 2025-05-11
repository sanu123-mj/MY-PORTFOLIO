// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

// Add this for WebSocket support
neonConfig.webSocketConstructor = ws;

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_E4li7IdnoUKy@ep-empty-firefly-a46n0dy2-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
});

export const db = drizzle(pool, { schema: schema_exports });
