'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Invalid email address or password');
    } else {
      router.push('/');
    }
  };

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
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>
          🕷️ Crawler Health Check
        </h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px', textAlign: 'center' }}>
          RuleWatcher Crawler Management Dashboard
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '3px solid #1a1a1a',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              placeholder="you@example.com"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '3px solid #1a1a1a',
                borderRadius: '8px',
                fontSize: '15px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                outline: 'none',
              }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div style={{
              background: '#FEE2E2',
              border: '2px solid #EF4444',
              borderRadius: '8px',
              padding: '10px 14px',
              marginBottom: '16px',
              fontSize: '13px',
              color: '#DC2626',
              fontWeight: 600,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 24px',
              background: loading ? '#ccc' : '#1a1a1a',
              color: '#fff',
              border: '3px solid #1a1a1a',
              borderRadius: '8px',
              boxShadow: loading ? 'none' : '4px 4px 0 #888',
              fontSize: '15px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.1s',
              fontFamily: 'inherit',
            }}
            onMouseDown={(e) => {
              if (loading) return;
              const t = e.currentTarget;
              t.style.transform = 'translate(2px, 2px)';
              t.style.boxShadow = '2px 2px 0 #888';
            }}
            onMouseUp={(e) => {
              if (loading) return;
              const t = e.currentTarget;
              t.style.transform = '';
              t.style.boxShadow = '4px 4px 0 #888';
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
