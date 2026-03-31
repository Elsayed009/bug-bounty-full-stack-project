

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function HunterDashboard() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/programs/active');
        setPrograms(response.data.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to load programs");
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">Available Bug Bounty Programs</h2>
            <p className="text-muted">Find vulnerabilities and earn rewards</p>
          </div>
          <Link to="/hunter/profile" className="btn btn-outline-primary">👤 My Profile</Link>
        </div>

        {error && <div className="alert alert-warning">{error}</div>}

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center p-5 border rounded bg-light">
            <h4>No active programs right now</h4>
            <p className="text-muted">Check back later!</p>
          </div>
        ) : (
          <div className="row g-4">
            {programs.map(prog => (
              <div className="col-md-4" key={prog._id}>
                <div className="card h-100 shadow-sm border-0 hover-shadow">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title fw-bold">{prog.title}</h5>
                      <span className="badge bg-success">Active</span>
                    </div>
                    <p className="card-text text-muted">{prog.description}</p>

                    <div className="mt-auto">
                      <div className="d-flex gap-2 flex-wrap mb-3">
                        {['low','medium','high','critical'].map(level => (
                          <span key={level} className="badge bg-light text-dark">
                            {level}: ${prog.rewards[level]}
                          </span>
                        ))}
                      </div>
                      <Link to={`/hunter/submit-report/${prog._id}`} className="btn btn-primary w-100">
                        Submit Report
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default HunterDashboard;










// import { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import { AuthContext } from '../Context/AuthContext';

// function HunterDashboard() {
//   const { user } = useContext(AuthContext);
//   const [programs, setPrograms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPrograms = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/programs/programs', {
//           withCredentials: true
//         });
//         setPrograms(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.msg || "Failed to load programs");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPrograms();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <div>
//             <h2 className="fw-bold">🎯 Available Programs</h2>
//             <p className="text-muted">Find vulnerabilities and earn rewards</p>
//           </div>
//           <Link to="/hunter/profile" className="btn btn-outline-primary fw-bold">
//             👤 My Profile
//           </Link>
//         </div>

//         {error && <div className="alert alert-warning">{error}</div>}

//         {loading ? (
//           <div className="text-center mt-5">
//             <div className="spinner-border text-primary" role="status"></div>
//           </div>
//         ) : programs.length === 0 ? (
//           <div className="text-center mt-5 p-5 border rounded bg-light">
//             <h4>No active programs available right now</h4>
//             <p className="text-muted">Check back later for new bug bounty programs</p>
//           </div>
//         ) : (
//           <div className="row">
//             {programs.map((prog) => (
//               <div className="col-md-4 mb-4" key={prog._id}>
//                 <div className="card h-100 shadow-sm border-0">
//                   <div className="card-body d-flex flex-column">
//                     <div className="d-flex justify-content-between align-items-start mb-2">
//                       <h5 className="card-title fw-bold text-primary">{prog.title}</h5>
//                       <span className={`badge ${prog.isActive ? 'bg-success' : 'bg-secondary'}`}>
//                         {prog.isActive ? 'Active' : 'Paused'}
//                       </span>
//                     </div>
//                     <p className="card-text text-muted">{prog.description}</p>

//                     <div className="mt-auto border-top pt-3">
//                       <p className="small fw-bold mb-2">💰 Rewards:</p>
//                       <div className="d-flex gap-2 flex-wrap mb-3">
//                         {['low','medium','high','critical'].map(level => (
//                           <span key={level} className={`badge ${
//                             level === 'critical' ? 'bg-danger' :
//                             level === 'high' ? 'bg-warning text-dark' :
//                             level === 'medium' ? 'bg-primary' : 'bg-success'
//                           }`}>
//                             {level}: ${prog.rewards[level]}
//                           </span>
//                         ))}
//                       </div>
//                       {prog.isActive && (
//                         <Link
//                           to={`/hunter/submit-report/${prog._id}`}
//                           className="btn btn-sm btn-primary w-100 fw-bold"
//                         >
//                           🐛 Submit Report
//                         </Link>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default HunterDashboard;






















// // import { useState, useEffect } from 'react';
// // import axios from 'axios';

// // function HunterDashboard() {
// //   //   memory and data State 
// //   const [programs, setPrograms] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   //   useEffect to get the data from the apis
// //   useEffect(() => {
// //     const fetchPrograms = async () => {
// //       try {
// //         // Method: GET (URL, Config)
// // // ✅ صح
// //       const response = await axios.get('http://localhost:5000/programs/programs', {
// //         withCredentials: true //to send the  HttpOnly Cookie to the backend peacekeeper 
// //         });
        
// //         // 3.   API Wrapper
// //         setPrograms(response.data.data); 
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Path Error:", error.response?.status);
// //         // console.error("Error fetching programs:", error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchPrograms();
// //   }, []); // empty array to work once atleast

// //   // Guard Clause for Loading
// //   if (loading) return <div>Loading B2B Programs...</div>;

// //   return (
// //     <div className="dashboard-container">
// //       <h2>Available B2B Bug Bounty Programs</h2>
// //       <div className="programs-grid">
// //         {programs.map((prog) => (
// //           <div key={prog._id} className="program-card">
// //             <h3>{prog.companyName}</h3>
// //             <p>Target: {prog.targetUrl}</p>
// //             <p>Max Bounty: ${prog.maxBounty}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default HunterDashboard;




// // // full sides error handleer
// // // catch (err) {
// // //   //  دي رسالة الباك إند اللي إحنا تعبنا فيها
// // //   const serverMsg = err.response?.data?.msg; 
  
// // //   //  دي الرسالة العامة بتاعة أكسيوس لو السيرفر مبردش أصلاً
// // //   const genericMsg = err.message;

// // //   console.error("The Error Is:", serverMsg || genericMsg);
// // // }