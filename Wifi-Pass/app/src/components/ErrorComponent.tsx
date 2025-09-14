import React from "react";

export default function ErrorComponent({ error }: { error: Error }) {
  return (
    <div style={{ color: 'red', padding: 24, textAlign: 'center' }}>
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
    </div>
  );
}
