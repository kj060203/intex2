'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    age: '',
    gender: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    streamingServices: [] as string[],
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      const { checked } = e.target;

      setFormData((prev) => {
        const newServices = checked
          ? [...prev.streamingServices, value]
          : prev.streamingServices.filter((s) => s !== value);
        return { ...prev, streamingServices: newServices };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      email,
      password,
      confirmPassword,
      name,
      age,
      gender,
      phone,
      city,
      state,
      zip,
      streamingServices,
    } = formData;

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !name ||
      !age ||
      !gender ||
      !phone ||
      !city ||
      !state ||
      !zip
    ) {
      return setError('Please fill in all fields.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError('Please enter a valid email address.');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    try {
      // STEP 1: Register with Identity
      const registerResponse = await fetch(
        'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/register',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            confirmPassword, // ← REQUIRED for the default Identity /register route
          }),
        }
      );

      if (!registerResponse.ok) {
        return setError(
          'Failed to register user. Email might already be taken.'
        );
      }

      // STEP 2: Add user details to MoviesUser
      const addDetailsResponse = await fetch(
        'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/MoviesUser/AddUserDetails',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            age: parseInt(age, 10) || null,
            gender,
            city,
            state,
            zip: parseInt(zip, 10) || null,
            privilegeLevel: 0,
            netflix: streamingServices.includes('Netflix') ? 1 : 0,
            hulu: streamingServices.includes('Hulu') ? 1 : 0,
            disney: streamingServices.includes('Disney+') ? 1 : 0,
            amazonPrime: streamingServices.includes('Prime Video') ? 1 : 0,
            max: streamingServices.includes('HBO Max') ? 1 : 0,
            appleTv: streamingServices.includes('Apple TV+') ? 1 : 0,
            peacock: streamingServices.includes('Peacock') ? 1 : 0, // ← optional
            paramount: streamingServices.includes('Paramount+') ? 1 : 0, // ← optional
          }),
        }
      );

      if (!addDetailsResponse.ok) {
        return setError('User registered but details failed to save.');
      }

      // Success
      setError('');
      alert('Registration successful! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again later.');
    }
  };

  return (
    <main className="signup-container">
      <div className="content-wrapper">
        <section className="signup-section" aria-label="Signup form">
          <header className="welcome-header">
            <h1 className="welcome-title">Create Account</h1>
          </header>

          <nav className="auth-tabs" aria-label="Authentication options">
            <div className="tab-item" onClick={handleLoginClick}>
              <span className="tab-text">LOGIN</span>
            </div>
            <div className="tab-item active">
              <span className="tab-text">SIGNUP</span>
              <div className="active-indicator" aria-hidden="true" />
            </div>
          </nav>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input-field"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="input-field"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  className="input-field"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="number"
                  placeholder="Age"
                  name="age"
                  className="input-field"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <select
                  name="gender"
                  className="input-field"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  className="input-field"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  className="input-field"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  className="input-field"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  placeholder="Zip"
                  name="zip"
                  className="input-field"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="checkbox-section">
              <p className="disclaimer">
                We are collecting this info to ensure we are giving you unique
                value compared to other streaming services.
              </p>
              <div className="checkbox-grid">
                {[
                  'Netflix',
                  'Hulu',
                  'Disney+',
                  'Prime Video',
                  'HBO Max',
                  'Apple TV+',
                ].map((service) => (
                  <label key={service} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="streamingServices"
                      value={service}
                      checked={formData.streamingServices.includes(service)}
                      onChange={handleChange}
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="signup-button">
              SIGN UP
            </button>

            {error && (
              <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
            )}
          </form>
        </section>
      </div>

      <style>{`
        .signup-container {
          height: 100vh;
          width: 100vw;
          background: linear-gradient(249deg, #030a1b 68.64%, #9747ff 206.69%);
          font-family: "Lato", sans-serif;
          overflow: hidden;
          position: relative;
        }
        .content-wrapper {
          display: flex;
          height: 100vh;
          padding: 20px;
          position: relative;
        }
        .signup-section {
          padding: 40px 20px;
          max-width: 1000px;
          width: 100%;
          margin: auto;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .welcome-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .welcome-title {
          color: #ebfaff;
          font-size: 48px;
          font-weight: 700;
          margin: 0;
        }
        .auth-tabs {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin-bottom: 40px;
        }
        .tab-item {
          position: relative;
          cursor: pointer;
        }
        .tab-text {
          color: #ebfaff;
          font-size: 20px;
          font-weight: 700;
        }
        .active-indicator {
          width: 100%;
          height: 4px;
          border-radius: 50px;
          filter: blur(3px);
          margin-top: 5px;
          position: absolute;
          background-color: #228ee5;
        }
        .signup-form {
          width: 100%;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 30px 40px;
          margin-bottom: 32px;
        }
        .form-field {
          position: relative;
          width: 100%;
        }
        .input-field {
          width: 100%;
          padding: 16px;
          background: transparent;
          border: 1px solid #ebfaff;
          border-radius: 12px;
          color: #ebfaff;
          font-size: 16px;
          box-sizing: border-box;
        }
        .signup-button {
          width: 160px;
          height: 48px;
          border: 1px solid #fff;
          border-radius: 12px;
          color: #ebfaff;
          font-size: 16px;
          margin: 32px auto 0;
          cursor: pointer;
          background-color: #228ee5;
          display: block;
        }
        .checkbox-section {
          margin-top: 16px;
          color: #ebfaff;
          width: 100%;
        }
        .disclaimer {
          margin-bottom: 16px;
          font-size: 14px;
          text-align: center;
        }
        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          justify-items: center;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        @media (max-width: 640px) {
          .welcome-title {
            font-size: 36px;
          }
          .auth-tabs {
            gap: 40px;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
          .signup-button {
            width: 100%;
          }
          .checkbox-grid {
            grid-template-columns: 1fr;
            justify-items: start;
          }
        }
      `}</style>
    </main>
  );
};

export default SignupPage;
