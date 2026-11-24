import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDb } from '@/lib/db';

// PUT: Update a maintenance log
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const sql = getDb();

  const rows = await sql`
    UPDATE maintenance_logs
    SET date = ${body.date},
        action = ${body.action},
        result = ${body.result},
        notes = ${body.notes || ''},
        updated_at = NOW(),
        updated_by = ${session.user.id},
        updated_by_name = ${session.user.name || ''}
    WHERE id = ${parseInt(id)}
    RETURNING *
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(rows[0]);
}

// DELETE: Delete a maintenance log
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const sql = getDb();

  const rows = await sql`
    DELETE FROM maintenance_logs WHERE id = ${parseInt(id)} RETURNING id
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ deleted: true });
}
