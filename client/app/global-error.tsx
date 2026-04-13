'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          fontFamily: 'sans-serif',
          backgroundColor: '#f8fafc',
          color: '#0f172a'
        }}>
          <h2 style={{ fontSize: '30px', fontWeight: '900', color: '#dc2626', marginBottom: '16px' }}>
            Critical System Failure
          </h2>
          <p style={{ color: '#64748b', marginBottom: '32px', maxWidth: '350px', fontWeight: '500' }}>
            The application experienced a core crash. 
            All subsystems have been paused for safety.
          </p>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: '#0f172a',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '12px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          >
            Recover Application
          </button>
        </div>
      </body>
    </html>
  );
}
