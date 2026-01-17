import React from 'react';

export default function Filters({
  onSearch,
  onStageChange,
  onStatusChange,
  onSourceChange,
  onClearFilters,
  searchValue,
  stageValue,
  statusValue,
  sourceValue,
}) {
  return (
    <div className="filters-section">
      <div className="filters-grid">
        <div className="filter-input">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="filter-input">
          <label>Stage</label>
          <select value={stageValue} onChange={(e) => onStageChange(e.target.value)}>
            <option value="">All Stages</option>
            <option value="Lead">Lead</option>
            <option value="Prospect">Prospect</option>
            <option value="Qualified">Qualified</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="filter-input">
          <label>Status</label>
          <select value={statusValue} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className="filter-input">
          <label>Source</label>
          <select value={sourceValue} onChange={(e) => onSourceChange(e.target.value)}>
            <option value="">All Sources</option>
            <option value="Website">Website</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="Social Media">Social Media</option>
            <option value="Referral">Referral</option>
          </select>
        </div>
      </div>

      <div className="filter-buttons">
        <button className="btn btn-secondary" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}
