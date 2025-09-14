import React from 'react'
import { NextPageContext } from 'next'

function ErrorPage({ statusCode, message }: { statusCode?: number; message?: string }) {
  return (
    <div style={{ minHeight: '60vh' }} className="flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
      {statusCode ? (
        <p className="text-gray-400 mb-4">An error {statusCode} occurred on server</p>
      ) : (
        <p className="text-gray-400 mb-4">An error occurred on client</p>
      )}
      {message && <pre className="text-sm text-red-400 whitespace-pre-wrap max-w-2xl">{message}</pre>}
      <a href="/" className="btn mt-6">Go Home</a>
    </div>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? (err as any).statusCode ?? 500 : 404
  const message = err ? (err.message || undefined) : undefined
  return { statusCode, message }
}

export default ErrorPage

