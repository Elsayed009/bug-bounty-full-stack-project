import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function CreateProgram() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initializing state to match your Joi programSchema
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scope: '', // We will handle this as a string then split it into an array
    rewards: {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    },
    isActive: true // Optional field in your schema
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRewardChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      rewards: {
        ...prev.rewards,
        [name]: Number(value)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Logic to convert comma-separated string into an array for Joi
      const finalData = {
        ...formData,
        scope: formData.scope.split(',').map(item => item.trim()).filter(item => item !== "")
      };

      // Ensure the endpoint matches your backend exactly: /programs/program
      await axios.post('http://localhost:5000/programs/program', finalData, {
        withCredentials: true
      });
      
      navigate('/company');
    } catch (err) {
      // If Joi returns multiple errors, they will be inside err.response.data.errors
      const serverError = err.response?.data?.errors ? err.response.data.errors.join(", ") : err.response?.data?.msg;
      setError(serverError || "Failed to create program");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-5" style={{ maxWidth: '800px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Create New Program</h2>
          <Link to="/company" className="btn btn-secondary shadow-sm">&larr; Cancel</Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label className="form-label fw-bold">Program Title</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
              </div>

              {/* Scope - Added this to match your schema */}
              <div className="mb-4">
                <label className="form-label fw-bold">Scope (Domains/URLs)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="scope" 
                  placeholder="example.com, api.example.com (Separate with commas)" 
                  value={formData.scope} 
                  onChange={handleChange} 
                  required 
                />
                <small className="text-muted">Enter domains separated by commas.</small>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="form-label fw-bold">Description (Min 10 characters)</label>
                <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
              </div>

              <hr />
              <h5 className="fw-bold mb-3">Rewards (USD)</h5>
              <div className="row g-3 mb-4">
                {['low', 'medium', 'high', 'critical'].map((level) => (
                  <div className="col-md-3" key={level}>
                    <label className="form-label text-capitalize">{level}</label>
                    <input type="number" className="form-control" name={level} value={formData.rewards[level]} onChange={handleRewardChange} required />
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
                {loading ? 'Processing...' : 'Publish Program'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProgram;