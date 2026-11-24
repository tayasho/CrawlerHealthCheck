import { neon } from '@neondatabase/serverless';

export function getDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return sql;
}

export async function initDb() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS maintenance_logs (
      id SERIAL PRIMARY KEY,
      crawler_id TEXT NOT NULL DEFAULT '',
      crawler_name TEXT NOT NULL DEFAULT '',
      country TEXT NOT NULL DEFAULT '',
      date DATE NOT NULL DEFAULT CURRENT_DATE,
      action TEXT NOT NULL DEFAULT '',
      result TEXT NOT NULL DEFAULT '',
      notes TEXT DEFAULT '',
      auto_recovery BOOLEAN DEFAULT FALSE,
      original_log_id INTEGER,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      created_by TEXT NOT NULL DEFAULT '',
      created_by_name TEXT NOT NULL DEFAULT '',
      created_by_email TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ,
      updated_by TEXT DEFAULT '',
      updated_by_name TEXT DEFAULT ''
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_maint_country ON maintenance_logs(country)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_maint_result ON maintenance_logs(result)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_maint_crawler_id ON maintenance_logs(crawler_id)`;

  await sql`
    CREATE TABLE IF NOT EXISTS csv_uploads (
      id SERIAL PRIMARY KEY,
      file_name TEXT NOT NULL DEFAULT '',
      csv_content TEXT NOT NULL,
      col_map JSONB NOT NULL DEFAULT '{}',
      uploaded_at TIMESTAMPTZ DEFAULT NOW(),
      uploaded_by TEXT NOT NULL DEFAULT ''
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_csv_uploaded_at ON csv_uploads(uploaded_at DESC)`;
}
