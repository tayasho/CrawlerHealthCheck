'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5F0E8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Space Grotesk', system-ui, sans-serif",
    }}>
      <div style={{
        background: '#fff',
        border: '3px solid #1a1a1a',
        borderRadius: '12px',
        boxShadow: '6px 6px 0 #1a1a1a',
        padding: '48px 40px',
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>
          🕷️ Crawler Health Check
        </h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>
          RuleWatcher クローラー管理ダッシュボード
        </p>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            padding: '14px 24px',
            background: '#fff',
            border: '3px solid #1a1a1a',
            borderRadius: '8px',
            boxShadow: '4px 4px 0 #1a1a1a',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.1s',
            fontFamily: 'inherit',
          }}
          onMouseDown={(e) => {
            const t = e.currentTarget;
            t.style.transform = 'translate(2px, 2px)';
            t.style.boxShadow = '2px 2px 0 #1a1a1a';
          }}
          onMouseUp={(e) => {
            const t = e.currentTarget;
            t.style.transform = '';
            t.style.boxShadow = '4px 4px 0 #1a1a1a';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Googleアカウントでログイン
        </button>
        <p style={{ color: '#999', fontSize: '11px', marginTop: '20px' }}>
          組織のGoogle Workspaceアカウントでログインしてください
        </p>
      </div>
    </div>
  );
}
