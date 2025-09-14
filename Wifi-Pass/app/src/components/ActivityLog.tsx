import React from "react";

export interface ActivityLogEntry {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  details?: any;
}

interface ActivityLogProps {
  entries: ActivityLogEntry[];
  onPrint: (entry: ActivityLogEntry) => void;
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ entries, onPrint }) => {
  if (!entries.length) return null;
  return (
    <div style={{
      position: 'fixed',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: '80px', // 1 inch from bottom (96px = 1in, but footer is present)
      zIndex: 50,
      background: 'rgba(30,30,40,0.98)',
      borderRadius: 12,
      boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
      padding: 24,
      minWidth: 320,
      maxWidth: 600,
      textAlign: 'center',
    }}>
      <h3 style={{marginBottom: 12, color: '#fff', fontWeight: 600}}>Activity Log</h3>
      <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
        {entries.map(entry => (
          <li key={entry.id} style={{marginBottom: 16, color: '#eee', borderBottom: '1px solid #444', paddingBottom: 8}}>
            <div style={{fontSize: 14, fontWeight: 500}}>{entry.type}</div>
            <div style={{fontSize: 13}}>{entry.message}</div>
            <div style={{fontSize: 12, color: '#aaa'}}>{new Date(entry.timestamp).toLocaleString()}</div>
            <button
              style={{marginTop: 8, padding: '4px 12px', borderRadius: 6, background: '#ffb347', color: '#222', border: 'none', cursor: 'pointer', fontWeight: 600}}
              onClick={() => onPrint(entry)}
            >
              Print/Save Receipt
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
