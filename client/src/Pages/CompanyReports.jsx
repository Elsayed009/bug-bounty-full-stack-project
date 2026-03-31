import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function CompanyReports() {
  const { id } = useParams(); // Program ID
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all reports related to this program
    const fetchReports = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/reports/report/${id}`, {
          withCredentials: true
        });
        setReports(res.data.data);
      } catch (err) {
        setError(err.response?.data?.msg || "No reports found for this program");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [id]);

  const updateStatus = async (reportId, newStatus) => {
    try {
      // Endpoint for company to accept/reject report
      await axios.put(`http://localhost:5000/reports/report/company/${reportId}`, 
        { status: newStatus }, 
        { withCredentials: true }
      );
      // Refresh local state to show updated status
      setReports(reports.map(r => r._id === reportId ? { ...r, status: newStatus } : r));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Program Reports</h2>
          <Link to="/company" className="btn btn-outline-secondary">Dashboard</Link>
        </div>

        {error ? (
          <div className="alert alert-info text-center">{error}</div>
        ) : (
          <div className="table-responsive bg-white shadow-sm p-3 rounded">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id}>
                    <td>
                      <Link to={`/report-details/${report._id}`} className="text-decoration-none fw-bold">
                        {report.title}
                      </Link>
                    </td>
                    <td>
                      <span className={`badge bg-${report.severity === 'critical' ? 'danger' : 'warning text-dark'}`}>
                        {report.severity}
                      </span>
                    </td>
                    <td>
                      <span className={`badge rounded-pill ${report.status === 'accepted' ? 'bg-success' : report.status === 'rejected' ? 'bg-danger' : 'bg-info'}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="small">{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td>
                      {report.status === 'pending' && (
                        <div className="btn-group">
                          <button onClick={() => updateStatus(report._id, 'accepted')} className="btn btn-sm btn-success">Accept</button>
                          <button onClick={() => updateStatus(report._id, 'rejected')} className="btn btn-sm btn-danger">Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default CompanyReports;