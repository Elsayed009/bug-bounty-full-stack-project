


import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function EditProgram() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scope: '',
    rewards: { low: 0, medium: 0, high: 0, critical: 0 },
    isActive: true
  });

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        // ✅ الـ URL الصحيح للـ backend الحالي
        const res = await axios.get(`http://localhost:5000/programs/programs/${id}`, {
          withCredentials: true
        });
        const data = res.data.data;
        setFormData({
          title: data.title,
          description: data.description || '',
          scope: data.scope.join(', '),
          rewards: data.rewards,
          isActive: data.isActive
        });
      } catch (err) {
        setError("Failed to load program details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRewardChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      rewards: { ...prev.rewards, [name]: Number(value) }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const finalData = {
      ...formData,
      scope: formData.scope.split(',').map(item => item.trim()).filter(Boolean)
    };

    try {
      await axios.put(`http://localhost:5000/programs/program/${id}`, finalData, {
        withCredentials: true
      });
      setSuccess("program updated seccussfully");
      setTimeout(() => navigate('/company'), 1500);
    } catch (err) {
      const msg = err.response?.data?.msg || err.response?.data?.errors?.join(' | ') || " update failed";
      setError(msg);
      console.error("Edit error:", err.response?.data);
    }
  };

  if (loading) return <Navbar />;

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: '700px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Edit Program</h2>
          <Link to="/company" className="btn btn-secondary">← Back</Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="card shadow border-0">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Program Title</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="mb-3 form-check form-switch">
                <input className="form-check-input" type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
                <label className="form-check-label fw-bold">Active Status</label>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Scope (comma separated)</label>
                <input type="text" className="form-control" name="scope" value={formData.scope} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <textarea className="form-control" name="description" rows="4" value={formData.description} onChange={handleChange} required></textarea>
              </div>

              <h6 className="fw-bold mb-3">Rewards (USD)</h6>
              <div className="row g-3">
                {['low', 'medium', 'high', 'critical'].map(level => (
                  <div className="col-md-3" key={level}>
                    <label className="form-label text-capitalize">{level}</label>
                    <input type="number" className="form-control" name={level} value={formData.rewards[level]} onChange={handleRewardChange} required />
                  </div>
                ))}
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-4 fw-bold py-3">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProgram;












// import { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../components/Navbar';

// function EditProgram() {
//   const { id } = useParams(); // Get program ID from URL
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     scope: '', // String to be converted to Array
//     rewards: { low: 0, medium: 0, high: 0, critical: 0 },
//     isActive: true
//   });

//   useEffect(() => {
//     // Fetch current program data to fill the form
//     const fetchProgram = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/programs/programs/${id}`, {
//           withCredentials: true
//         });
//         const data = res.data.data;
//         setFormData({
//           ...data,
//           scope: data.scope.join(', ') // Convert Array back to String for the input field
//         });
//       } catch (err) {
//         setError("Failed to fetch program details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProgram();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleRewardChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       rewards: { ...prev.rewards, [name]: Number(value) }
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Process scope string into array before sending
//       const finalData = {
//         ...formData,
//         scope: formData.scope.split(',').map(item => item.trim()).filter(item => item !== "")
//       };

//       await axios.put(`http://localhost:5000/programs/program/${id}`, finalData, {
//         withCredentials: true
//       });
//       navigate('/company'); // Redirect to dashboard after update
//     } catch (err) {
//       setError(err.response?.data?.msg || "Update failed");
//     }
//   };

//   if (loading) return <Navbar />;

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5 mb-5" style={{ maxWidth: '700px' }}>
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="fw-bold">Edit Program</h2>
//           <Link to="/company" className="btn btn-secondary">Back</Link>
//         </div>

//         {error && <div className="alert alert-danger">{error}</div>}

//         <div className="card shadow-sm border-0">
//           <div className="card-body p-4">
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label fw-bold">Program Title</label>
//                 <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
//               </div>

//               <div className="mb-3 form-check form-switch">
//                 <input className="form-check-input" type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
//                 <label className="form-check-label fw-bold">Active Status</label>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label fw-bold">Scope (Comma separated)</label>
//                 <input type="text" className="form-control" name="scope" value={formData.scope} onChange={handleChange} required />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label fw-bold">Description</label>
//                 <textarea className="form-control" name="description" rows="5" value={formData.description} onChange={handleChange} required></textarea>
//               </div>

//               <h6 className="fw-bold mb-3 border-bottom pb-2">Bounty Rewards (USD)</h6>
//               <div className="row g-2 mb-4">
//                 {['low', 'medium', 'high', 'critical'].map((level) => (
//                   <div className="col-3" key={level}>
//                     <label className="form-label small text-capitalize">{level}</label>
//                     <input type="number" className="form-control" name={level} value={formData.rewards[level]} onChange={handleRewardChange} required />
//                   </div>
//                 ))}
//               </div>

//               <button type="submit" className="btn btn-primary w-100 fw-bold py-2">Save Changes</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditProgram;