

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API = 'http://localhost:5000';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('companies');

  const [companies, setCompanies] = useState([]);
  const [hunters, setHunters] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [cRes, hRes, pRes, rRes] = await Promise.all([
          axios.get(`${API}/admin/companies`, { withCredentials: true }),
          axios.get(`${API}/admin/hunters`, { withCredentials: true }),
          axios.get(`${API}/admin/programs`, { withCredentials: true }),
          axios.get(`${API}/admin/reports`, { withCredentials: true }),
        ]);

        setCompanies(cRes.data.data || []);
        setHunters(hRes.data.data || []);
        setPrograms(pRes.data.data || []);
        setReports(rRes.data.data || []);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Actions
  const verifyCompany = async (id) => {
    try {
      await axios.put(`${API}/admin/companies/${id}`, {}, { withCredentials: true });
      setCompanies(companies.map(c => c._id === id ? { ...c, verified: true } : c));
    } catch {
      alert("Failed to verify company");
    }
  };

  const verifyHunter = async (id) => {
    try {
      await axios.put(`${API}/admin/hunters/${id}`, {}, { withCredentials: true });
      setHunters(hunters.map(h => h._id === id ? { ...h, verified: true } : h));
    } catch {
      alert("Failed to verify hunter");
    }
  };

  const toggleProgram = async (id, currentStatus) => {
    try {
      await axios.put(`${API}/admin/programs/${id}`, {}, { withCredentials: true });
      setPrograms(programs.map(p => p._id === id ? { ...p, isActive: !currentStatus } : p));
    } catch {
      alert("Failed to toggle program");
    }
  };

  const deleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await axios.delete(`${API}/admin/reports/${id}`, { withCredentials: true });
      setReports(reports.filter(r => r._id !== id));
    } catch {
      alert("Failed to delete report");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">🛡️ Admin Dashboard</h2>
          <span className="badge bg-dark fs-5 px-3 py-2">Full Control Panel</span>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Stats Cards - Premium Look */}
        <div className="row g-4 mb-5">
          <div className="col-6 col-md-3">
            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow" onClick={() => setActiveTab('companies')}>
              <div className="fs-1 mb-2">🏢</div>
              <h3 className="fw-bold text-primary">{companies.length}</h3>
              <p className="text-muted mb-0">Companies</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow" onClick={() => setActiveTab('hunters')}>
              <div className="fs-1 mb-2">🎯</div>
              <h3 className="fw-bold text-success">{hunters.length}</h3>
              <p className="text-muted mb-0">Hunters</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow" onClick={() => setActiveTab('programs')}>
              <div className="fs-1 mb-2">📋</div>
              <h3 className="fw-bold text-warning">{programs.length}</h3>
              <p className="text-muted mb-0">Programs</p>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card shadow-sm border-0 h-100 text-center p-4 hover-shadow" onClick={() => setActiveTab('reports')}>
              <div className="fs-1 mb-2">🐛</div>
              <h3 className="fw-bold text-danger">{reports.length}</h3>
              <p className="text-muted mb-0">Reports</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item"><button className={`nav-link ${activeTab === 'companies' ? 'active' : ''}`} onClick={() => setActiveTab('companies')}>🏢 Companies</button></li>
          <li className="nav-item"><button className={`nav-link ${activeTab === 'hunters' ? 'active' : ''}`} onClick={() => setActiveTab('hunters')}>🎯 Hunters</button></li>
          <li className="nav-item"><button className={`nav-link ${activeTab === 'programs' ? 'active' : ''}`} onClick={() => setActiveTab('programs')}>📋 Programs</button></li>
          <li className="nav-item"><button className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>🐛 Reports</button></li>
        </ul>

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div className="card shadow border-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Company Name</th>
                    <th>Website</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map(c => (
                    <tr key={c._id}>
                      <td className="fw-bold">{c.comName}</td>
                      <td><a href={c.website} target="_blank" className="text-primary">{c.website}</a></td>
                      <td className="text-muted">{c.description || '—'}</td>
                      <td>
                        <span className={`badge ${c.verified ? 'bg-success' : 'bg-warning'}`}>
                          {c.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        {!c.verified && <button className="btn btn-sm btn-success" onClick={() => verifyCompany(c._id)}>Verify</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Hunters Tab */}
        {activeTab === 'hunters' && (
          <div className="card shadow border-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Nick Name</th>
                    <th>Skills</th>
                    <th>Reputation</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hunters.map(h => (
                    <tr key={h._id}>
                      <td className="fw-bold">{h.nickName}</td>
                      <td>{h.skills?.join(', ') || '—'}</td>
                      <td><span className="badge bg-warning">⭐ {h.reputation}</span></td>
                      <td>
                        <span className={`badge ${h.verified ? 'bg-success' : 'bg-warning'}`}>
                          {h.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td>
                        {!h.verified && <button className="btn btn-sm btn-success" onClick={() => verifyHunter(h._id)}>Verify</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="card shadow border-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Scope</th>
                    <th>Critical Reward</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map(p => (
                    <tr key={p._id}>
                      <td className="fw-bold">{p.title}</td>
                      <td className="small">{p.scope?.join(', ') || '—'}</td>
                      <td><span className="badge bg-danger">${p.rewards?.critical}</span></td>
                      <td>
                        <span className={`badge ${p.isActive ? 'bg-success' : 'bg-secondary'}`}>
                          {p.isActive ? 'Active' : 'Paused'}
                        </span>
                      </td>
                      <td>
                        <button className={`btn btn-sm ${p.isActive ? 'btn-warning' : 'btn-success'}`} onClick={() => toggleProgram(p._id, p.isActive)}>
                          {p.isActive ? 'Pause' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="card shadow border-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Severity</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(r => (
                    <tr key={r._id}>
                      <td className="fw-bold">{r.title}</td>
                      <td>
                        <span className={`badge ${r.severity === 'critical' ? 'bg-danger' : r.severity === 'high' ? 'bg-warning' : 'bg-primary'}`}>
                          {r.severity}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${r.status === 'accepted' ? 'bg-success' : r.status === 'rejected' ? 'bg-danger' : 'bg-info'}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="small">{new Date(r.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteReport(r._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;























// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from '../components/Navbar';

// const API = 'http://localhost:5000';

// function AdminDashboard() {
//   const [activeTab, setActiveTab] = useState('companies');

//   const [companies, setCompanies] = useState([]);
//   const [hunters, setHunters] = useState([]);
//   const [programs, setPrograms] = useState([]);
//   const [reports, setReports] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ── Fetch all data ──────────────────────────────────────────
//   useEffect(() => {
//     const fetchAll = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const [cRes, hRes, pRes, rRes] = await Promise.all([
//           axios.get(`${API}/admin/companies`, { withCredentials: true }),
//           axios.get(`${API}/admin/hunters`,   { withCredentials: true }),
//           axios.get(`${API}/admin/programs`,  { withCredentials: true }),
//           axios.get(`${API}/admin/reports`,   { withCredentials: true }),
//         ]);
//         setCompanies(cRes.data.data);
//         setHunters(hRes.data.data);
//         setPrograms(pRes.data.data);
//         setReports(rRes.data.data);
//       } catch (err) {
//         setError(err.response?.data?.msg || "Failed to load data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, []);

//   // ── Actions ─────────────────────────────────────────────────
//   const verifyCompany = async (id) => {
//     try {
//       await axios.put(`${API}/admin/companies/${id}`, {}, { withCredentials: true });
//       setCompanies(companies.map(c => c._id === id ? { ...c, verified: true } : c));
//     } catch { alert("Failed to verify company"); }
//   };

//   const verifyHunter = async (id) => {
//     try {
//       await axios.put(`${API}/admin/hunters/${id}`, {}, { withCredentials: true });
//       setHunters(hunters.map(h => h._id === id ? { ...h, verified: true } : h));
//     } catch { alert("Failed to verify hunter"); }
//   };

//   const toggleProgram = async (id, currentStatus) => {
//     try {
//       await axios.put(`${API}/admin/programs/${id}`, {}, { withCredentials: true });
//       setPrograms(programs.map(p => p._id === id ? { ...p, isActive: !currentStatus } : p));
//     } catch { alert("Failed to toggle program"); }
//   };

//   const deleteReport = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this report?")) return;
//     try {
//       await axios.delete(`${API}/admin/reports/${id}`, { withCredentials: true });
//       setReports(reports.filter(r => r._id !== id));
//     } catch { alert("Failed to delete report"); }
//   };

//   // ── Stats Cards ─────────────────────────────────────────────
//   const stats = [
//     { label: 'Companies', value: companies.length, icon: '🏢', color: 'primary',   tab: 'companies' },
//     { label: 'Hunters',   value: hunters.length,   icon: '🎯', color: 'success',   tab: 'hunters'   },
//     { label: 'Programs',  value: programs.length,  icon: '📋', color: 'warning',   tab: 'programs'  },
//     { label: 'Reports',   value: reports.length,   icon: '🐛', color: 'danger',    tab: 'reports'   },
//   ];

//   // ── Tabs config ─────────────────────────────────────────────
//   const tabs = [
//     { key: 'companies', label: '🏢 Companies' },
//     { key: 'hunters',   label: '🎯 Hunters'   },
//     { key: 'programs',  label: '📋 Programs'  },
//     { key: 'reports',   label: '🐛 Reports'   },
//   ];

//   if (loading) return (
//     <>
//       <Navbar />
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
//         <div className="spinner-border text-primary" role="status"></div>
//       </div>
//     </>
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-4 mb-5">

//         <div className="mb-4">
//           <h2 className="fw-bold">🛡️ Admin Dashboard</h2>
//           <p className="text-muted">Manage the entire Bug Bounty platform</p>
//         </div>

//         {error && <div className="alert alert-danger">{error}</div>}

//         {/* ── Stats Cards ── */}
//         <div className="row g-3 mb-4">
//           {stats.map(stat => (
//             <div className="col-6 col-md-3" key={stat.tab}>
//               <div
//                 className={`card border-0 shadow-sm text-center p-3 cursor-pointer border-bottom border-3 border-${stat.color}`}
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => setActiveTab(stat.tab)}
//               >
//                 <div style={{ fontSize: 32 }}>{stat.icon}</div>
//                 <h3 className={`fw-bold text-${stat.color} mb-0`}>{stat.value}</h3>
//                 <small className="text-muted">{stat.label}</small>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ── Tabs ── */}
//         <ul className="nav nav-tabs mb-4">
//           {tabs.map(tab => (
//             <li className="nav-item" key={tab.key}>
//               <button
//                 className={`nav-link fw-bold ${activeTab === tab.key ? 'active' : ''}`}
//                 onClick={() => setActiveTab(tab.key)}
//               >
//                 {tab.label}
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* ══════════════════════════════════════════
//             TAB: COMPANIES
//         ══════════════════════════════════════════ */}
//         {activeTab === 'companies' && (
//           <div className="card shadow-sm border-0">
//             <div className="card-header bg-white fw-bold">
//               🏢 Companies
//               <span className="badge bg-primary ms-2">{companies.length}</span>
//             </div>
//             <div className="table-responsive">
//               <table className="table table-hover align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Company Name</th>
//                     <th>Website</th>
//                     <th>Description</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {companies.map(c => (
//                     <tr key={c._id}>
//                       <td className="fw-bold">{c.comName}</td>
//                       <td>
//                         <a href={c.website} target="_blank" rel="noopener noreferrer"
//                           className="text-decoration-none text-primary small">
//                           {c.website}
//                         </a>
//                       </td>
//                       <td className="text-muted small" style={{ maxWidth: 200 }}>
//                         <span className="text-truncate d-block">{c.description || '—'}</span>
//                       </td>
//                       <td>
//                         <span className={`badge ${c.verified ? 'bg-success' : 'bg-warning text-dark'}`}>
//                           {c.verified ? '✅ Verified' : '⏳ Pending'}
//                         </span>
//                       </td>
//                       <td>
//                         {!c.verified && (
//                           <button
//                             className="btn btn-sm btn-success fw-bold"
//                             onClick={() => verifyCompany(c._id)}
//                           >
//                             Verify
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                   {companies.length === 0 && (
//                     <tr><td colSpan={5} className="text-center text-muted py-4">No companies found</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* ══════════════════════════════════════════
//             TAB: HUNTERS
//         ══════════════════════════════════════════ */}
//         {activeTab === 'hunters' && (
//           <div className="card shadow-sm border-0">
//             <div className="card-header bg-white fw-bold">
//               🎯 Hunters
//               <span className="badge bg-success ms-2">{hunters.length}</span>
//             </div>
//             <div className="table-responsive">
//               <table className="table table-hover align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Nick Name</th>
//                     <th>Skills</th>
//                     <th>Reputation</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {hunters.map(h => (
//                     <tr key={h._id}>
//                       <td className="fw-bold">🎯 {h.nickName}</td>
//                       <td>
//                         <div className="d-flex flex-wrap gap-1">
//                           {h.skills?.slice(0, 3).map((s, i) => (
//                             <span key={i} className="badge bg-light text-dark border small">{s}</span>
//                           ))}
//                           {h.skills?.length > 3 && (
//                             <span className="badge bg-light text-muted border small">+{h.skills.length - 3}</span>
//                           )}
//                         </div>
//                       </td>
//                       <td>
//                         <span className="badge bg-warning text-dark">⭐ {h.reputation}</span>
//                       </td>
//                       <td>
//                         <span className={`badge ${h.verified ? 'bg-success' : 'bg-warning text-dark'}`}>
//                           {h.verified ? '✅ Verified' : '⏳ Pending'}
//                         </span>
//                       </td>
//                       <td>
//                         {!h.verified && (
//                           <button
//                             className="btn btn-sm btn-success fw-bold"
//                             onClick={() => verifyHunter(h._id)}
//                           >
//                             Verify
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                   {hunters.length === 0 && (
//                     <tr><td colSpan={5} className="text-center text-muted py-4">No hunters found</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* ══════════════════════════════════════════
//             TAB: PROGRAMS
//         ══════════════════════════════════════════ */}
//         {activeTab === 'programs' && (
//           <div className="card shadow-sm border-0">
//             <div className="card-header bg-white fw-bold">
//               📋 Programs
//               <span className="badge bg-warning text-dark ms-2">{programs.length}</span>
//             </div>
//             <div className="table-responsive">
//               <table className="table table-hover align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Title</th>
//                     <th>Scope</th>
//                     <th>Rewards (Critical)</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {programs.map(p => (
//                     <tr key={p._id}>
//                       <td className="fw-bold">{p.title}</td>
//                       <td className="small text-muted">
//                         {p.scope?.slice(0, 2).join(', ')}
//                         {p.scope?.length > 2 && ` +${p.scope.length - 2} more`}
//                       </td>
//                       <td>
//                         <span className="badge bg-danger">${p.rewards?.critical}</span>
//                       </td>
//                       <td>
//                         <span className={`badge ${p.isActive ? 'bg-success' : 'bg-secondary'}`}>
//                           {p.isActive ? '🟢 Active' : '⏸️ Paused'}
//                         </span>
//                       </td>
//                       <td>
//                         <button
//                           className={`btn btn-sm fw-bold ${p.isActive ? 'btn-warning' : 'btn-success'}`}
//                           onClick={() => toggleProgram(p._id, p.isActive)}
//                         >
//                           {p.isActive ? 'Pause' : 'Activate'}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {programs.length === 0 && (
//                     <tr><td colSpan={5} className="text-center text-muted py-4">No programs found</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* ══════════════════════════════════════════
//             TAB: REPORTS
//         ══════════════════════════════════════════ */}
//         {activeTab === 'reports' && (
//           <div className="card shadow-sm border-0">
//             <div className="card-header bg-white fw-bold">
//               🐛 Reports
//               <span className="badge bg-danger ms-2">{reports.length}</span>
//             </div>
//             <div className="table-responsive">
//               <table className="table table-hover align-middle mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Title</th>
//                     <th>Severity</th>
//                     <th>Status</th>
//                     <th>Submitted</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {reports.map(r => (
//                     <tr key={r._id}>
//                       <td className="fw-bold">{r.title}</td>
//                       <td>
//                         <span className={`badge ${
//                           r.severity === 'critical' ? 'bg-danger' :
//                           r.severity === 'high'     ? 'bg-warning text-dark' :
//                           r.severity === 'medium'   ? 'bg-primary' : 'bg-success'
//                         }`}>
//                           {r.severity?.toUpperCase()}
//                         </span>
//                       </td>
//                       <td>
//                         <span className={`badge rounded-pill ${
//                           r.status === 'accepted' ? 'bg-success' :
//                           r.status === 'rejected' ? 'bg-danger'  : 'bg-info'
//                         }`}>
//                           {r.status}
//                         </span>
//                       </td>
//                       <td className="small text-muted">
//                         {new Date(r.createdAt).toLocaleDateString()}
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-sm btn-outline-danger fw-bold"
//                           onClick={() => deleteReport(r._id)}
//                         >
//                           🗑️ Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {reports.length === 0 && (
//                     <tr><td colSpan={5} className="text-center text-muted py-4">No reports found</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//       </div>
//     </>
//   );
// }

// export default AdminDashboard;



// // ✅ **التلات خطوات خلصوا!** الملفات اللي اتعملت/اتعدلت:
// // ```
// // ✅ App.jsx              → fixed duplicates + new routes
// // ✅ HunterDashboard.jsx  → fixed endpoint + new UI
// // ✅ HunterProfile.jsx    → new file
// // ✅ SubmitReport.jsx     → new file  
// // ✅ AdminDashboard.jsx   → new file (tabs)
// // ✅ index.html           → Bootstrap added