import React from 'react';

export default function LeadDetails({ lead, onClose, onUpdate, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      onDelete(lead._id);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{lead.firstName} {lead.lastName}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="modal-row">
            <div className="modal-field">
              <label>Email</label>
              <span>{lead.email}</span>
            </div>
            <div className="modal-field">
              <label>Phone</label>
              <span>{lead.phone}</span>
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>Company</label>
              <span>{lead.company}</span>
            </div>
            <div className="modal-field">
              <label>Value</label>
              <span>${lead.value?.toLocaleString()}</span>
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>Stage</label>
              <span>{lead.stage}</span>
            </div>
            <div className="modal-field">
              <label>Status</label>
              <span>{lead.status}</span>
            </div>
          </div>

          <div className="modal-row">
            <div className="modal-field">
              <label>Source</label>
              <span>{lead.source}</span>
            </div>
            <div className="modal-field">
              <label>Created</label>
              <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {lead.notes && (
            <div className="modal-field">
              <label>Notes</label>
              <span>{lead.notes}</span>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
