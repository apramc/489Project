import React from 'react';

function AdminDashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>
      <div style={{ margin: '20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <h2>Section 1</h2>
          <p>Information or statistics here</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <h2>Section 2</h2>
          <p>More information or actions here</p>
        </div>
      </div>
      {/* More sections or widgets can be added similarly */}
    </div>
  );
}

export default AdminDashboard;