import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
// start the peacekeeper
function ProtectedRoute({ children, allowedRole }) {
  //  Fetch data from the Single Source of Truth
  const { user, loading } = useContext(AuthContext);

  //  Wait for the Axios response from the backend to prevent premature redirects
  if (loading) {
    return <div>Loading... (Verifying Identity)</div>; 
  }

  //  Guard Clause: If not logged in, redirect to the Login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //  Role Authorization: Prevent a user from accessing another role's dashboard 
  // (e.g., preventing a Hunter from accessing a B2B Company route)
  if (allowedRole && user.role !== allowedRole) {
    // Redirect them to their designated dashboard based on their actual role
    return <Navigate to={`/${user.role}`} replace />;
  }

  // Access Granted: Render the loosely coupled children components
  return children;
}

export default ProtectedRoute;