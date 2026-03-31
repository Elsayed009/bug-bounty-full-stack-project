import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function CompanyDashboard() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        // نستخدم الـ Endpoint اللي بيجيب برامج الشركة دي بس
        const res = await axios.get('http://localhost:5000/programs/programs', {
          withCredentials: true
        });
        setPrograms(res.data.data);
      } catch (err) {
        // لو مفيش بروفايل أصلاً، الباك إند هيرجع 404 "user not found" (حسب الكود بتاعك)
        if (err.response?.status === 404 && err.response?.data?.msg === "user not found") {
          navigate('/complete-profile'); // وديه يعمل بروفايل فوراً
        } else {
          setError(err.response?.data?.msg || "Failed to load programs");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Company Dashboard</h2>
          <Link to="/create-program" className="btn btn-primary fw-bold">+ Create New Program</Link>
        </div>

        {error && <div className="alert alert-warning text-center">{error}</div>}

        <div className="row">
          {loading ? (
            <div className="text-center w-100 mt-5"><h5>Loading your programs...</h5></div>
          ) : programs.length === 0 ? (
            <div className="text-center mt-5 p-5 border rounded bg-light">
              <h4>No programs found!</h4>
              <p>Start your first Bug Bounty program to receive security reports.</p>
            </div>
          ) : (
            programs.map((prog) => (
              <div className="col-md-4 mb-4" key={prog._id}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold text-primary">{prog.title}</h5>
                      <span className={`badge ${prog.isActive ? 'bg-success' : 'bg-secondary'}`}>
                        {prog.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    <p className="card-text text-muted text-truncate">{prog.description}</p>
                    <div className="mt-auto border-top pt-3">
                      <div className="d-flex justify-content-between small mb-3">
                        <span>💰 Critical: <strong>${prog.rewards.critical}</strong></span>
                        <span>🎯 Scope: <strong>{prog.scope.length}</strong> items</span>
                      </div>
                      <div className="d-group d-flex gap-2">
                         <Link to={`/edit-program/${prog._id}`} className="btn btn-sm btn-outline-dark flex-grow-1">Edit</Link>
                         <Link to={`/programs/${prog._id}/reports`} className="btn btn-sm btn-info flex-grow-1 text-white">View Reports</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default CompanyDashboard;