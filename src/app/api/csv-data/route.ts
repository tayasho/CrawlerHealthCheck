import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/db';

// GET: Retrieve the most recent CSV upload
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sql = getDb();
  const rows = await sql`
    SELECT id, file_name, csv_content, col_map, uploaded_at, uploaded_by
    FROM csv_uploads
    ORDER BY uploaded_at DESC
    LIMIT 1
  `;

  if (rows.length === 0) {
    return NextResponse.json({ data: null });
  }

  return NextResponse.json({ data: rows[0] });
}

// POST: Save a new CSV upload
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { fileName, csvContent, colMap } = body;

  if (!csvContent) {
    return NextResponse.json({ error: 'csvContent is required' }, { status: 400 });
  }

  const sql = getDb();
  const rows = await sql`
    INSERT INTO csv_uploads (file_name, csv_content, col_map, uploaded_by)
    VALUES (${fileName || ''}, ${csvContent}, ${JSON.stringify(colMap || {})}, ${session.user.email || session.user.id})
    RETURNING id, file_name, uploaded_at
  `;

  return NextResponse.json(rows[0], { status: 201 });
}
