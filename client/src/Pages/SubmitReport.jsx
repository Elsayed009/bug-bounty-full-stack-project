import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function SubmitReport() {
  const { id } = useParams(); // Program ID
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'low',
    proofUrl: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`http://localhost:5000/reports/report/${id}`, formData, {
        withCredentials: true
      });
      navigate('/hunter');
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(errors ? errors.join(" | ") : (err.response?.data?.msg || "Failed to submit report"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ maxWidth: '750px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold"> Submit Report</h2>
            <p className="text-muted">Report a vulnerability responsibly</p>
          </div>
          <Link to="/hunter" className="btn btn-outline-secondary">← Back</Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Vulnerability Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. XSS in login form"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Severity</label>
                <select className="form-select" name="severity" value={formData.severity} onChange={handleChange}>
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🟠 High</option>
                  <option value="critical">🔴 Critical</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the vulnerability in detail: steps to reproduce, impact, affected endpoint..."
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Proof of Concept URL</label>
                <input
                  type="url"
                  className="form-control"
                  name="proofUrl"
                  value={formData.proofUrl}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/... or https://youtube.com/..."
                  required
                />
                <small className="text-muted">Link to screenshot, video, or PoC code</small>
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold py-2" disabled={loading}>
                {loading ? 'Submitting...' : ' Submit Report'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmitReport;