import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To display error messages neatly
  
  const navigate = useNavigate();
  // Getting setUser from our "broadcasting station" (Context) to update the global app state
  const { setUser } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    try {
      // 1. Send login credentials to get the token in Cookies
      await axios.post('http://localhost:5000/auth/login', 
        { email, password },
        { withCredentials: true }
      );

      // 2. Fetch current user data to determine their Role
      const res = await axios.get('http://localhost:5000/auth/me', {
        withCredentials: true
      });

      // 3. Update the Context immediately with the new data
      const userData = res.data.data;
      setUser(userData); 

      // 4. Dynamic routing to the appropriate dashboard
      navigate(`/${userData.role}`);

    } catch (err) {
      // Catch the error and display it to the user
      setError(err.response?.data?.msg || "An error occurred during login");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">Welcome Back 🛡️</h2>
                <p className="text-muted">Login to your Bug Bounty account</p>
              </div>

              {/* Display error message if it exists */}
              {error && <div className="alert alert-danger py-2">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-medium">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control"
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium">Password</label>
                  <input 
                    type="password" 
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                  />
                </div>

                <button type="submit" className="btn btn-dark w-100 mb-3 py-2 fw-bold">
                  Login
                </button>

                <div className="text-center mt-3">
                  <span className="text-muted small">Don't have an account? </span>
                  <Link to="/register" className="text-decoration-none fw-bold small text-primary">
                    Register here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;