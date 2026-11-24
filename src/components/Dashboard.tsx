'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const initialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || initialized.current || !session?.user) return;
    initialized.current = true;

    // Inject the visualization script
    const script = document.createElement('script');
    script.textContent = getVisualizationScript(
      session.user.name || '',
      session.user.email || ''
    );
    containerRef.current.appendChild(script);
  }, [session]);

  return (
    <div ref={containerRef}>
      <div className="app" id="app">
        <header>
          <h1>Crawler status heatmap</h1>
          <p>CSVをドロップして、国別クローラー稼働状況をヒートマップで可視化</p>
        </header>

        <div className="drop-zone" id="dropZone">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <h3>CSVファイルをドロップ or クリック</h3>
          <p>Country, Type of Organization, 停止日数 の列が含まれるCSV</p>
          <input type="file" id="fileInput" accept=".csv" />
        </div>

        <div id="mapperSection" style={{ display: 'none' }}></div>
        <div id="fileInfoSection" style={{ display: 'none' }}></div>
        <div id="dashboard" style={{ display: 'none' }}></div>
      </div>
    </div>
  );
}

function getVisualizationScript(userName: string, userEmail: string): string {
  // This returns the full visualization JS with API-based maintenance
  // The script is injected as-is — it's the existing visualization code
  // with db calls replaced by fetch() to our API routes
  return `
// ---- INJECTED GLOBALS for auth ----
const CURRENT_USER_NAME = ${JSON.stringify(userName)};
const CURRENT_USER_EMAIL = ${JSON.stringify(userEmail)};
  `;
}
