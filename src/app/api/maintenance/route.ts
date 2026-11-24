import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/db';

// GET: List maintenance logs (optional ?country=XX filter)
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = getDb();
  const { searchParams } = new URL(req.url);
  const country = searchParams.get('country');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);

  if (country) {
    const rows = await sql`
      SELECT * FROM maintenance_logs
      WHERE country = ${country}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    return NextResponse.json(rows);
  }

  const rows = await sql`
    SELECT * FROM maintenance_logs
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return NextResponse.json(rows);
}

// POST: Create a new maintenance log
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const sql = getDb();

  const rows = await sql`
    INSERT INTO maintenance_logs
      (crawler_id, crawler_name, country, date, action, result, notes,
       auto_recovery, original_log_id, created_by, created_by_name, created_by_email)
    VALUES
      (${body.crawlerId || ''}, ${body.crawlerName || ''}, ${body.country || ''},
       ${body.date || new Date().toISOString().slice(0, 10)},
       ${body.action || ''}, ${body.result || ''}, ${body.notes || ''},
       ${body.autoRecovery || false}, ${body.originalLogId || null},
       ${session.user.id}, ${session.user.name || ''}, ${session.user.email || ''})
    RETURNING *
  `;
  return NextResponse.json(rows[0], { status: 201 });
}
