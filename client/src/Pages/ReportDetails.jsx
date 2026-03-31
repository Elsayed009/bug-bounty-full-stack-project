import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ReportDetails() {
  const { id } = useParams(); // Extracting the report ID from the URL
  const navigate = useNavigate(); // Used to go back to the previous page

  // State management
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false); // For Accept/Reject buttons

  // Fetch report details on component mount
  useEffect(() => {
    const fetchReport = async () => {
      try {
        // Calling your specific backend endpoint for a single report
        const response = await axios.get(`http://localhost:5000/reports/report/single/${id}`, {
          withCredentials: true
        });
        
        setReport(response.data.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch report details");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  // Handle Accept or Reject actions
  const handleUpdateStatus = async (newStatus) => {
    setActionLoading(true);
    try {
      // Calling your update endpoint: router.put("/report/company/:id")
      await axios.put(`http://localhost:5000/reports/report/company/${id}`, 
        { status: newStatus }, 
        { withCredentials: true }
      );
      
      // Update local state to reflect the change immediately without refreshing
      setReport(prevReport => ({ ...prevReport, status: newStatus }));
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating report status");
    } finally {
      setActionLoading(false);
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  // Error UI
  if (error || !report) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">{error || "Report not found"}</div>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          &larr; Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Report Details</h2>
          <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            &larr; Back to Reports
          </button>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body p-5">
            {/* Badges Row (Severity & Status) */}
            <div className="d-flex justify-content-between mb-4">
              <span className={`badge px-3 py-2 fs-6 ${
                report.severity === 'critical' ? 'bg-danger' : 
                report.severity === 'high' ? 'bg-warning text-dark' : 
                report.severity === 'medium' ? 'bg-primary' : 'bg-success'
              }`}>
                Severity: {report.severity?.toUpperCase()}
              </span>

              <span className={`badge px-3 py-2 fs-6 border ${
                report.status === 'accepted' ? 'bg-success text-white' : 
                report.status === 'rejected' ? 'bg-danger text-white' : 
                'bg-light text-dark'
              }`}>
                Status: {report.status?.toUpperCase() || 'PENDING'}
              </span>
            </div>

            {/* Title and Hunter Info */}
            <h3 className="fw-bold text-dark mb-2">{report.title}</h3>
            <p className="text-muted small mb-4">
              Submitted by Hunter ID: <span className="text-primary">{report.hunterId}</span>
            </p>

            <hr />

            {/* Vulnerability Description */}
            <div className="mb-4 mt-4">
              <h5 className="fw-bold text-dark">Vulnerability Description</h5>
              {/* Using pre-wrap to keep the line breaks written by the hunter */}
              <div className="p-4 bg-light rounded text-dark" style={{ whiteSpace: "pre-wrap" }}>
                {report.description}
              </div>
            </div>

            {/* Proof of Concept (PoC) */}
            <div className="mb-5">
              <h5 className="fw-bold text-dark">Proof of Concept (PoC)</h5>
              <a href={report.proofUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary mt-2">
                View Proof (External Link) &rarr;
              </a>
            </div>

            <hr />

            {/* Action Buttons: Accept / Reject */}
            <div className="d-flex gap-3 mt-4">
              <button 
                className="btn btn-success px-4 py-2 fw-bold shadow-sm"
                onClick={() => handleUpdateStatus('accepted')}
                disabled={actionLoading || report.status === 'accepted'}
              >
                {actionLoading ? 'Processing...' : '✓ Accept Report'}
              </button>

              <button 
                className="btn btn-danger px-4 py-2 fw-bold shadow-sm"
                onClick={() => handleUpdateStatus('rejected')}
                disabled={actionLoading || report.status === 'rejected'}
              >
                {actionLoading ? 'Processing...' : '✕ Reject Report'}
              </button>
            </div>

            {/* Success Note based on your backend logic */}
            {report.status === 'accepted' && (
              <p className="text-success small mt-3 fw-medium">
                * This report has been accepted. Reputation points have been awarded to the hunter.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportDetails;