import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ProgramReports() {
  const { id } = useParams(); // Program ID from URL
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // المطابقة مع ملف الراوتر بتاعك: /reports/report/:id
        const response = await axios.get(`http://localhost:5000/reports/report/${id}`, {
          withCredentials: true
        });
        
        // الداتا راجعة جوه response.data.data زي ما انت كاتب في الكنترولر
        setReports(response.data.data);
        setError(null);
      } catch (err) {
        // لو الباك إند رجع 404 (no reportes founded) زي ما انت مبرمجه
        if (err.response && err.response.status === 404) {
          setReports([]); // خلي المصفوفة فاضية عشان الـ UI يعرض رسالة "مفيش تقارير"
        } else {
          // أي خطأ تاني (مثلاً السيرفر واقع 500)
          setError(err.response?.data?.msg || err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">Program Reports</h2>
            <p className="text-muted">Review vulnerabilities submitted by hunters.</p>
          </div>
          <Link to="/company" className="btn btn-secondary shadow-sm">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* عرض أي خطأ سيرفر حقيقي لو حصل */}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            {reports.length === 0 && !error ? (
              <div className="text-center p-5 text-muted">
                No reports have been submitted for this program yet.
              </div>
            ) : (
              <ul className="list-group list-group-flush">
                {reports.map((report) => (
                  <li key={report._id} className="list-group-item p-4 hover-bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {/* the report link*/}
                            <Link to={`/report/${report._id}`} className="text-decoration-none">
                            <h5 className="mb-1 fw-bold text-dark hover-text-primary">{report.title}</h5>
                            </Link>                     
                        <small className="text-muted">
                          Hunter ID: <span className="text-primary">{report.hunterId}</span>
                        </small>
                      </div>
                      <div className="text-end">
                        <span className={`badge mb-2 px-3 py-2 ${
                          report.severity === 'critical' ? 'bg-danger' : 
                          report.severity === 'high' ? 'bg-warning text-dark' : 
                          report.severity === 'medium' ? 'bg-primary' : 'bg-success'
                        }`}>
                          {report.severity?.toUpperCase() || 'UNKNOWN'}
                        </span>
                        <br />
                        {/* هنعرض الـ Status اللي انت عملتها في الـ Update Report */}
                        <span className={`badge border ${
                          report.status === 'accepted' ? 'bg-success text-white' : 
                          report.status === 'rejected' ? 'bg-danger text-white' : 
                          'bg-light text-dark'
                        }`}>
                          Status: {report.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProgramReports;