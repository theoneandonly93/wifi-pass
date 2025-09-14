import React from 'react'

export default function ErrorTest() {
  if (typeof window !== 'undefined') {
    throw new Error('Intentional test error to verify error boundary and _error.tsx');
  }
  return <div>Server side placeholder</div>
}

