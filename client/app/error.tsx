'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Render failure:', error);
  }, [error]);

  return (
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
      <div style={{
        backgroundColor: '#fee2e2',
        padding: '16px',
        borderRadius: '50%',
        marginBottom: '24px',
        fontSize: '24px'
      }}>
        ⚠️
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
        Rendering Error
      </h2>
      <p style={{ color: '#64748b', marginBottom: '32px', maxWidth: '400px' }}>
        A critical error occurred while displaying this page. 
        Detailed technical information has been logged.
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: '#0f172a',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            backgroundColor: 'transparent',
            color: '#0f172a',
            padding: '12px 24px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Go Home
        </button>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <pre style={{
          marginTop: '48px',
          padding: '24px',
          backgroundColor: '#1e293b',
          color: '#f8fafc',
          borderRadius: '16px',
          fontSize: '12px',
          textAlign: 'left',
          maxWidth: '800px',
          overflow: 'auto',
          whiteSpace: 'pre-wrap'
        }}>
          {error.message}
        </pre>
      )}
    </div>
  );
}
