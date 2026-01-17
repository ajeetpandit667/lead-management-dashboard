import React from 'react';

export default function Analytics({ analytics }) {
  if (!analytics) return null;

  return (
    <div className="analytics-grid">
      <div className="analytics-card">
        <h3>Total Leads</h3>
        <div className="value">{analytics.totalLeads}</div>
      </div>
      <div className="analytics-card converted">
        <h3>Converted Leads</h3>
        <div className="value">{analytics.convertedLeads}</div>
      </div>
      <div className="analytics-card active">
        <h3>Active Leads</h3>
        <div className="value">{analytics.activeLeads}</div>
      </div>
      <div className="analytics-card lost">
        <h3>Lost Leads</h3>
        <div className="value">{analytics.lostLeads}</div>
      </div>
    </div>
  );
}
