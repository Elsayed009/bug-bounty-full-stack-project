import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function HunterProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    nickName: '',
    bio: '',
    skills: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/hunter/profile', {
          withCredentials: true
        });
        const data = res.data.data;
        setProfile(data);
        setFormData({
          nickName: data.nickName,
          bio: data.bio || '',
          skills: data.skills.join(', ')
        });
      } catch (err) {
        if (err.response?.status === 404) {
          setIsEditing(true); // مفيش بروفايل، هيعمل واحد جديد
        } else {
          setError("Failed to load profile");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== '')
    };

    try {
      if (profile) {
        // Update
        const res = await axios.put('http://localhost:5000/hunter/profile', payload, {
          withCredentials: true
        });
        setProfile(res.data.data);
        setSuccess("Profile updated successfully!");
      } else {
        // Create
        const res = await axios.post('http://localhost:5000/hunter/profile', payload, {
          withCredentials: true
        });
        setProfile(res.data.data);
        setSuccess("Profile created successfully!");
        navigate('/hunter');
      }
      setIsEditing(false);
    } catch (err) {
      const errors = err.response?.data?.errors;
      setError(errors ? errors.join(" | ") : (err.response?.data?.msg || "Error saving profile"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: '650px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">👤 Hunter Profile</h2>
          {profile && !isEditing && (
            <button className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>
              ✏️ Edit
            </button>
          )}
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* View Mode */}
        {profile && !isEditing ? (
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 60, height: 60, fontSize: 24 }}>
                  🎯
                </div>
                <div>
                  <h4 className="fw-bold mb-0">{profile.nickName}</h4>
                  <span className="badge bg-warning text-dark">⭐ Rep: {profile.reputation}</span>
                  {profile.verified && <span className="badge bg-success ms-2">✅ Verified</span>}
                </div>
              </div>
              {profile.bio && (
                <div className="mb-3">
                  <h6 className="fw-bold text-muted">Bio</h6>
                  <p>{profile.bio}</p>
                </div>
              )}
              <div>
                <h6 className="fw-bold text-muted">Skills</h6>
                <div className="d-flex flex-wrap gap-2">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="badge bg-light text-dark border">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Edit / Create Mode */
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">{profile ? 'Edit Profile' : 'Complete Your Profile'}</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Nick Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nickName"
                    value={formData.nickName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Bio</label>
                  <textarea
                    className="form-control"
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Skills (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="XSS, SQLi, SSRF, IDOR"
                    required
                  />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary fw-bold flex-grow-1" disabled={saving}>
                    {saving ? 'Saving...' : (profile ? 'Save Changes' : 'Create Profile')}
                  </button>
                  {profile && (
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HunterProfile;