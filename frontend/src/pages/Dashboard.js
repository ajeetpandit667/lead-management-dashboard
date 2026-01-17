import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Analytics from '../components/Analytics';
import Filters from '../components/Filters';
import LeadsTable from '../components/LeadsTable';
import LeadDetails from '../components/LeadDetails';
import Pagination from '../components/Pagination';
import { leadsAPI } from '../services/api';

export default function Dashboard({ user, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Filter states
  const [search, setSearch] = useState('');
  const [stage, setStage] = useState('');
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Fetch leads and analytics
  const fetchData = async () => {
    setLoading(true);
    try {
      const leadsParams = {
        search,
        stage,
        status,
        source,
        page,
        limit,
      };

      const [leadsRes, analyticsRes] = await Promise.all([
        leadsAPI.getLeads(leadsParams),
        leadsAPI.getAnalytics(),
      ]);

      setLeads(leadsRes.data.leads);
      setPagination(leadsRes.data.pagination);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchData();
  }, [search, stage, status, source, page, limit, fetchData]);

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
  };

  const handleDeleteLead = async (id) => {
    try {
      await leadsAPI.deleteLead(id);
      setSelectedLead(null);
      setSuccessMessage('Lead deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchData();
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setStage('');
    setStatus('');
    setSource('');
    setPage(1);
  };

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="container dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <Analytics analytics={analytics} />

        <Filters
          onSearch={setSearch}
          onStageChange={setStage}
          onStatusChange={setStatus}
          onSourceChange={setSource}
          onClearFilters={handleClearFilters}
          searchValue={search}
          stageValue={stage}
          statusValue={status}
          sourceValue={source}
        />

        <LeadsTable
          leads={leads}
          onViewLead={handleViewLead}
          loading={loading}
        />

        <Pagination
          pagination={pagination}
          onPageChange={setPage}
        />
      </div>

      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={() => fetchData()}
          onDelete={handleDeleteLead}
        />
      )}
    </div>
  );
}
