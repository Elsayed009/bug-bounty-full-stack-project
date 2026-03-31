import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Navbar from '../components/Navbar';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [activeTab, setActiveTab] = useState('hunter'); // hunter | company | admin
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { checkAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let endpoint = '/auth/register';
    let role = 'hunter';

    if (activeTab === 'company') {
      role = 'company';
    } else if (activeTab === 'admin') {
      endpoint = '/auth/admin-register';
      role = 'admin';
    }

    const payload = { ...formData, role };

    try {
      await axios.post(`http://localhost:5000${endpoint}`, payload, {
        withCredentials: true
      });

      await checkAuth();

      // Redirect based on role
      if (activeTab === 'admin') {
        navigate('/admin');
      } else if (activeTab === 'company') {
        navigate('/complete-profile');
      } else {
        navigate('/hunter');
      }
    } catch (err) {
      setError(
        err.response?.data?.msg ||
        err.response?.data?.errors?.join(' | ') ||
        'An error occurred during registration'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar isLanding={false} />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card shadow border-0">
              <div className="card-body p-5">

                <h2 className="text-center fw-bold mb-4">Create New Account</h2>

                {/* Role Selection Tabs */}
                <ul className="nav nav-tabs nav-justified mb-4">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'hunter' ? 'active' : ''}`}
                      onClick={() => setActiveTab('hunter')}
                    >
                      🎯 Hunter
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'company' ? 'active' : ''}`}
                      onClick={() => setActiveTab('company')}
                    >
                      🏢 Company
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
                      onClick={() => setActiveTab('admin')}
                    >
                      🛡️ Admin <span className="badge bg-danger ms-1 small">Dev Only</span>
                    </button>
                  </li>
                </ul>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      {activeTab === 'company' ? 'Company Name' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-bold py-3"
                    disabled={loading}
                  >
                    {loading 
                      ? 'Creating Account...' 
                      : activeTab === 'hunter' 
                        ? 'Register as Hunter' 
                        : activeTab === 'company' 
                          ? 'Register as Company' 
                          : 'Register as Admin (Development Only)'}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">Already have an account? </span>
                  <Link to="/login" className="fw-bold text-primary text-decoration-none">
                    Login here
                  </Link>
                </div>

                {activeTab === 'admin' && (
                  <div className="alert alert-warning mt-4 small text-center">
                    ⚠️ This option is for development purposes only. 
                    Please remove it after testing.
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;








// import { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext';
// import Navbar from '../components/Navbar';

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const [isAdmin, setIsAdmin] = useState(false);   // Admin
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { checkAuth } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     const endpoint = isAdmin ? '/auth/admin-register' : '/auth/register';
//     const payload = isAdmin 
//       ? { ...formData, role: 'admin' } 
//       : { ...formData, role: 'hunter' };   // default hunter

//     try {
//       await axios.post(`http://localhost:5000${endpoint}`, payload, {
//         withCredentials: true
//       });

//       await checkAuth();                    //  update the Context
//       navigate(isAdmin ? '/admin' : '/hunter');
//     } catch (err) {
//       setError(err.response?.data?.msg || err.response?.data?.errors?.join(' | ') || 'there was an error during the update   ');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6 col-lg-5">
//             <div className="card shadow border-0">
//               <div className="card-body p-5">

//                 <h2 className="text-center fw-bold mb-4">Create Account</h2>

//                 {/* Tab Navigation */}
//                 <ul className="nav nav-tabs nav-justified mb-4">
//                   <li className="nav-item">
//                     <button 
//                       className={`nav-link ${!isAdmin ? 'active' : ''}`}
//                       onClick={() => setIsAdmin(false)}
//                     >
//                        Hunter
//                     </button>
//                   </li>
//                   <li className="nav-item">
//                     <button 
//                       className={`nav-link ${isAdmin ? 'active' : ''}`}
//                       onClick={() => setIsAdmin(true)}
//                     >
//                        Admin <span className="badge bg-danger ms-1">Dev Only</span>
//                     </button>
//                   </li>
//                 </ul>

//                 {error && <div className="alert alert-danger text-center">{error}</div>}

//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Full Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       className="form-control"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Email Address</label>
//                     <input
//                       type="email"
//                       name="email"
//                       className="form-control"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="form-label fw-bold">Password</label>
//                     <input
//                       type="password"
//                       name="password"
//                       className="form-control"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <button 
//                     type="submit" 
//                     className="btn btn-primary w-100 fw-bold py-3"
//                     disabled={loading}
//                   >
//                     {loading 
//                       ? 'Creating Account...' 
//                       : isAdmin 
//                         ? 'Register as Admin (Dev)' 
//                         : 'Register as Hunter'}
//                   </button>
//                 </form>

//                 <div className="text-center mt-4">
//                   <span className="text-muted">Already have an account? </span>
//                   <Link to="/login" className="fw-bold text-primary text-decoration-none">
//                     Login here
//                   </Link>
//                 </div>

//                 {isAdmin && (
//                   <div className="alert alert-warning mt-4 small text-center">
//                   </div>
//                 )}

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;
















// import { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../Context/AuthContext';

// function Register() {
//   // 1. Memory: Object State for Scalability
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'hunter' // default value 
//   });
//   const [error, setError] = useState('');
  
//   const navigate = useNavigate();
//   const { checkAuth } = useContext(AuthContext); // محطة الإذاعة

//   // 2. Logic: Dynamic Field Handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 3. Logic: Form Submission & API Call
//   const handleSubmit = async (e) => {
//     e.preventDefault(); //    preventDefault behavior
//     setError(''); //   reset old errors
    
//     try {
//       //  send data to backend side
//       await axios.post('http://localhost:5000/auth/register', formData, {
//         withCredentials: true 
//       });
      
//       // updat user status in all over the app
//       await checkAuth(); 
      
//       // navigate by the choosen path
//       navigate(`/${formData.role}`); 
      
//     } catch (err) {
//       // Hybrid Error Handler
//       const serverMsg = err.response?.data?.msg;
//       const genericMsg = err.message;
//       setError(serverMsg || genericMsg);
//       console.error("Register Error:", err.response?.status);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow-sm p-4">
//             <h2 className="text-center mb-4">Create an Account</h2>
            
//             {/* display errors if existed*/}
//             {error && <div className="alert alert-danger">{error}</div>}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Full Name</label>
//                 <input type="text" name="name" className="form-control" onChange={handleChange} required />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input type="email" name="email" className="form-control" onChange={handleChange} required />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Password</label>
//                 <input type="password" name="password" className="form-control" onChange={handleChange} required />
//               </div>

//               <div className="mb-4">
//                 <label className="form-label">Role</label>
//                 <select name="role" className="form-select" onChange={handleChange} value={formData.role}>
//                   <option value="hunter">Bug Hunter</option>
//                   <option value="company">B2B Company</option>
//                 </select>
//               </div>

//               <button type="submit" className="btn btn-primary w-100">Register</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;