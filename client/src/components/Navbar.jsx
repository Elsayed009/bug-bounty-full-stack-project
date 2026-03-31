
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

function Navbar({ isLanding = false }) {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error("Logout failed");
    }
  };

  if (isLanding) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/">🛡️ BugBounty</Link>
          <div className="d-flex gap-3">
            <Link to="/login" className="btn btn-outline-light">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </div>
        </div>
      </nav>
    );
  }

  // Navbar عادي للـ logged in users
  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to={`/${user.role}`}>🛡️ BugBounty</Link>
        {/* باقي الـ navbar كما هو في النسخة السابقة */}
        {/* ... (نفس الكود القديم) */}
      </div>
    </nav>
  );
}

export default Navbar;











// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// function LandingPage() {
//   return (
//     <>
//       <Navbar />

//       {/* Hero Section with subtle motion */}
//       <header className="min-vh-100 d-flex align-items-center bg-dark text-white position-relative overflow-hidden">
//         <div className="container position-relative z-3">
//           <div className="row align-items-center">
//             <div className="col-lg-6">
//               <h1 className="display-3 fw-bold mb-4">
//                 Find bugs.<br />
//                 Earn rewards.<br />
//                 <span className="text-primary">Secure the web.</span>
//               </h1>
//               <p className="lead text-light mb-5 fs-5">
//                 The professional bug bounty platform connecting companies with 
//                 ethical hackers. Discover vulnerabilities, get paid, and help make the internet safer.
//               </p>

//               <div className="d-flex flex-wrap gap-3">
//                 <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 fw-bold fs-5">
//                   Join as Hunter
//                 </Link>
//                 <Link to="/register" className="btn btn-outline-light btn-lg px-5 py-3 fw-bold fs-5">
//                   For Companies
//                 </Link>
//               </div>

//               <div className="mt-5 d-flex gap-5 text-muted">
//                 <div>
//                   <h4 className="fw-bold text-white">250+</h4>
//                   <small>Active Hunters</small>
//                 </div>
//                 <div>
//                   <h4 className="fw-bold text-white">18</h4>
//                   <small>Live Programs</small>
//                 </div>
//                 <div>
//                   <h4 className="fw-bold text-white">$124k</h4>
//                   <small>Paid This Month</small>
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-6 text-center mt-5 mt-lg-0">
//               <div className="bg-gradient p-4 rounded-4 shadow-lg">
//                 <img 
//                   src="https://images.unsplash.com/photo-1558494949-ef0d38d3f6b8?w=600" 
//                   alt="Bug Bounty Dashboard" 
//                   className="img-fluid rounded-3 shadow"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Background subtle elements */}
//         <div className="position-absolute top-0 end-0 opacity-10">
//           <div className="display-1 text-primary">🛡️</div>
//         </div>
//       </header>

//       {/* Trust Bar */}
//       <div className="py-3 bg-light border-bottom">
//         <div className="container">
//           <div className="text-center text-muted small">
//             Trusted by security teams at • Fintech • E-commerce • SaaS Companies
//           </div>
//         </div>
//       </div>

//       {/* How it Works */}
//       <section className="py-5">
//         <div className="container">
//           <div className="text-center mb-5">
//             <h2 className="fw-bold">How BugBounty Works</h2>
//             <p className="text-muted">Simple. Secure. Rewarding.</p>
//           </div>

//           <div className="row g-5">
//             <div className="col-md-4 text-center">
//               <div className="mb-4">
//                 <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
//                   1
//                 </div>
//               </div>
//               <h5 className="fw-bold">Companies Create Programs</h5>
//               <p className="text-muted">Define scope, set rewards, and open your systems to ethical hackers.</p>
//             </div>
//             <div className="col-md-4 text-center">
//               <div className="mb-4">
//                 <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
//                   2
//                 </div>
//               </div>
//               <h5 className="fw-bold">Hunters Find Vulnerabilities</h5>
//               <p className="text-muted">Test real applications, submit detailed reports, and earn money.</p>
//             </div>
//             <div className="col-md-4 text-center">
//               <div className="mb-4">
//                 <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
//                   3
//                 </div>
//               </div>
//               <h5 className="fw-bold">We Handle Everything</h5>
//               <p className="text-muted">Validation, payments, and reputation system — all managed professionally.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Final */}
//       <section className="py-5 bg-dark text-white text-center">
//         <div className="container py-5">
//           <h2 className="display-5 fw-bold mb-4">Ready to make the internet safer?</h2>
//           <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 fs-5 fw-bold">
//             Start Your Journey Today
//           </Link>
//         </div>
//       </section>

//       <footer className="bg-light py-5">
//         <div className="container text-center text-muted">
//           © 2026 BugBounty Platform • Built for real security researchers and companies
//         </div>
//       </footer>
//     </>
//   );
// }

// export default LandingPage;

// import { useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../Context/AuthContext';

// function Navbar({ isLanding = false }) {
//   const { user, setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
//       setUser(null);
//       navigate('/');
//     } catch (err) {
//       console.error("Logout failed");
//     }
//   };

//   if (isLanding) {
//     return (
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
//         <div className="container">
//           <Link className="navbar-brand fw-bold fs-3" to="/">🛡️ BugBounty</Link>
//           <div className="d-flex gap-3">
//             <Link to="/login" className="btn btn-outline-light">Login</Link>
//             <Link to="/register" className="btn btn-primary">Register</Link>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   // Navbar عادي للـ logged in users
//   if (!user) return null;

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
//       <div className="container">
//         <Link className="navbar-brand fw-bold fs-4" to={`/${user.role}`}>🛡️ BugBounty</Link>
//         {/* باقي الـ navbar كما هو في النسخة السابقة */}
//         {/* ... (نفس الكود القديم) */}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;






// import { useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../Context/AuthContext';

// function Navbar() {
//   const { user, setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/auth/logout', {}, { withCredentials: true });
//       setUser(null);
//       navigate('/login');
//     } catch (err) {
//       console.error("Logout failed");
//     }
//   };

//   if (!user) return null;

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
//       <div className="container">
//         <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to={`/${user.role}`}>
//           🛡️ <span className="ms-2">BugBounty</span>
//         </Link>

//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto align-items-center">
//             {/* Role-based Links */}
//             {user.role === 'company' && (
//               <>
//                 <li className="nav-item"><Link className="nav-link" to="/company">Dashboard</Link></li>
//                 <li className="nav-item"><Link className="nav-link" to="/create-program">+ New Program</Link></li>
//               </>
//             )}
//             {user.role === 'hunter' && (
//               <>
//                 <li className="nav-item"><Link className="nav-link" to="/hunter">Programs</Link></li>
//                 <li className="nav-item"><Link className="nav-link" to="/hunter/profile">My Profile</Link></li>
//               </>
//             )}
//             {user.role === 'admin' && (
//               <li className="nav-item"><Link className="nav-link" to="/admin">Admin Panel</Link></li>
//             )}

//             <li className="nav-item ms-3">
//               <span className="badge bg-primary fs-6 px-3 py-2">
//                 {user.name} <span className="text-uppercase">({user.role})</span>
//               </span>
//             </li>

//             <li className="nav-item ms-3">
//               <button onClick={handleLogout} className="btn btn-outline-light btn-sm px-4">
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;





// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../Context/AuthContext';

// function Navbar() {
//   const { user, setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/auth/logout', {}, {
//         withCredentials: true
//       });
//       setUser(null);
//       navigate('/login');
//     } catch (err) {
//       console.error("Logout failed:", err.message);
//     }
//   };

//   return (
//     <nav className="navbar navbar-dark bg-dark px-4">
//       <span className="navbar-brand fw-bold">🛡️ Bug Bounty</span>
//       <div className="d-flex align-items-center gap-3">
//         <span className="text-white">
//           {user?.name}
//           <span className="badge bg-secondary ms-2">{user?.role}</span>
//         </span>
//         <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;