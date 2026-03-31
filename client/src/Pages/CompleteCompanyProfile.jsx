import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function CompleteCompanyProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    comName: '',      // اسم الشركة
    website: '',      // الموقع
    description: ''   // الوصف
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // الرابط الصحيح بناءً على server.js بتاعك
      await axios.post('http://localhost:5000/company/profile', formData, {
        withCredentials: true
      });
      
      // بعد ما ننشئ البروفايل بنجاح، نرجعه للداشبورد عشان يقدر يعمل برامج
      navigate('/company');
    } catch (err) {
      // لو في أخطاء من Joi middleware هتظهر هنا
      const serverErrors = err.response?.data?.errors;
      setError(serverErrors ? serverErrors.join(" | ") : (err.response?.data?.msg || "error happend"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: '600px' }}>
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h2 className="fw-bold mb-4 text-center">complete company profile</h2>
            
            {error && <div className="alert alert-danger text-center">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Company Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="comName" 
                  value={formData.comName} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Website (URL)</label>
                <input 
                  type="url" 
                  className="form-control" 
                  name="website" 
                  placeholder="https://example.com"
                  value={formData.website} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Description</label>
                <textarea 
                  className="form-control" 
                  name="description" 
                  rows="4" 
                  value={formData.description} 
                  onChange={handleChange}
                  placeholder="    descriope ur company..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success w-100 fw-bold py-2" disabled={loading}>
                {loading ? ' saving...' : 'saving data and contounue'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompleteCompanyProfile;