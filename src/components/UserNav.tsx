'use client';

import { useSession, signOut } from 'next-auth/react';

export default function UserNav() {
  const { data: session } = useSession();
  if (!session?.user) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 16px',
      background: '#fff',
      border: '3px solid #1a1a1a',
      borderRadius: '8px',
      boxShadow: '3px 3px 0 #1a1a1a',
      fontSize: '13px',
      fontWeight: 600,
    }}>
      {session.user.image && (
        <img
          src={session.user.image}
          alt=""
          width={28}
          height={28}
          style={{ borderRadius: '50%', border: '2px solid #1a1a1a' }}
        />
      )}
      <span>{session.user.name}</span>
      <button
        onClick={() => signOut()}
        style={{
          padding: '4px 12px',
          background: '#fee2e2',
          border: '2px solid #1a1a1a',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        ログアウト
      </button>
    </div>
  );
}
