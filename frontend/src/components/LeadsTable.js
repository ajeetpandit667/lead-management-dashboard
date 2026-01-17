import React from 'react';

export default function LeadsTable({ leads, onViewLead, loading }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <div className="leads-section">
        <div className="empty-state">
          <h3>No leads found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="leads-section">
      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Stage</th>
            <th>Status</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>
                <span className="lead-name">{lead.firstName} {lead.lastName}</span>
              </td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.company}</td>
              <td>
                <span className={`stage-badge stage-${lead.stage.toLowerCase()}`}>
                  {lead.stage}
                </span>
              </td>
              <td>
                <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                  {lead.status}
                </span>
              </td>
              <td>${lead.value?.toLocaleString()}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn-view"
                    onClick={() => onViewLead(lead)}
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
