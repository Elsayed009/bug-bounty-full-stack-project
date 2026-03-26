import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  // State for form inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault()
    
    try {
      // Step 1: Send login credentials to get the token in cookies
      await axios.post('http://localhost:5000/auth/login', 
        { email, password },
        { withCredentials: true }
      )

      // Step 2: Fetch current user data to determine their role
      const res = await axios.get('http://localhost:5000/auth/me', {
        withCredentials: true
      })

      // Step 3: Extract the role from the response
      const userRole = res.data.data.role

      // Step 4: Navigate to the appropriate dashboard based on the role
      if (userRole === 'admin') {
        navigate('/admin')
      } else if (userRole === 'company') {
        navigate('/company')
      } else if (userRole === 'hunter') {
        navigate('/hunter')
      }

    } catch (err) {
      // Handle potential errors gracefully
      alert(err.response?.data?.msg || "An error occurred during login")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login


// alternative 
// for usenavigation
// window.location.href = '/hunter'; wrang cause it make the page refresh

// import { Link } from 'react-router-dom'; //not for us here cause for it to work 
// user must hit a button and here we dont want that behavior
// // جوه الـ return
// <Link to="/hunter">Go to Hunter Dashboard</Link>