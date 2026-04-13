'use client';

import React from 'react';

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        maxWidth: '440px',
        width: '100%'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>
          Authentication Error
        </h2>
        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>
          We encountered an error while loading the secure login portal.
        </p>
        
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fee2e2',
          padding: '12px',
          borderRadius: '12px',
          marginBottom: '24px',
          fontSize: '12px',
          color: '#b91c1c',
          textAlign: 'left',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {error.message || "An unexpected error occurred."}
        </div>

        <button
          onClick={() => reset()}
          style={{
            width: '100%',
            backgroundColor: '#0f172a',
            color: 'white',
            padding: '12px',
            borderRadius: '12px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '12px'
          }}
        >
          Retry Login
        </button>
        
        <button
          onClick={() => window.location.href = '/'}
          style={{
            width: '100%',
            backgroundColor: 'white',
            color: '#64748b',
            padding: '12px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
