import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
export const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => { // chilren = app now 
  const [user, setUser] = useState(null); // Stores user data (null if not logged in)
  const [loading, setLoading] = useState(true); // Tracks initial authentication check
const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/me', {
        withCredentials: true, 
      });
      setUser(response.data.data); 
    } catch (err) {
      setUser(null); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
   
    checkAuth();
  }, []); // Empty array ensures this runs ONLY once on initial app load

  // 3. Broadcast the state to all wrapped components
  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};