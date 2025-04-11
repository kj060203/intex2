'use client';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const handleSignupClick = (navigate: ReturnType<typeof useNavigate>) => {
  navigate('/create-account');
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setRememberme(checked);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl =
      'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/login?useCookies=true';
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength, 10) > 0) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/movies');
    } catch (error: any) {
      setError(error.message || 'Error logging in.');
      console.error('Fetch attempt failed:', error);
    }
  };

  return (
    <main className="login-container">
      <div className="content-wrapper">
        <section className="login-section" aria-label="Login form">
          <header className="welcome-header">
            <h1 className="welcome-title">Welcome</h1>
          </header>

          <nav className="auth-tabs" aria-label="Authentication options">
            <div className="tab-item active">
              <span className="tab-text">LOGIN</span>
              <div className="active-indicator" aria-hidden="true" />
            </div>
            <div
              className="tab-item"
              onClick={() => handleSignupClick(navigate)}
            >
              <span className="tab-text">SIGNUP</span>
            </div>
          </nav>

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <form
            className="login-form"
            aria-label="Login form"
            onSubmit={handleSubmit}
          >
            <div className="form-field">
              <input
                type="text"
                placeholder="Email"
                className="input-field"
                aria-label="Email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="input-field"
                aria-label="Password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <span
                className="field-icon toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: 'pointer' }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    className="field-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
                      fill="#EBFAFF"
                    />
                    <circle cx="12" cy="12" r="2.5" fill="#030a1b" />
                  </svg>
                ) : (
                  <svg
                    className="field-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.39 1.73 1.11 3l2.73 2.73A11.66 11.66 0 0 0 1 12c1.73 3.89 6 7 11 7 2.05 0 3.98-.5 5.69-1.39L20.73 22l1.27-1.27L2.39 1.73zM12 17c-3.31 0-6.31-2-7.87-5 .73-1.42 1.88-2.6 3.27-3.4l1.47 1.47A3 3 0 0 0 12 15c.52 0 1-.13 1.45-.35l1.44 1.44c-.91.57-1.97.91-3.14.91zM17.12 14.53l-1.45-1.45c.21-.45.33-.95.33-1.48a3 3 0 0 0-3-3c-.53 0-1.03.12-1.48.33L8.47 7.12C9.31 6.83 10.13 6.67 11 6.6c3.31 0 6.31 2 7.87 5-.53 1.13-1.31 2.13-2.25 2.93z"
                      fill="#EBFAFF"
                    />
                  </svg>
                )}
              </span>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberme"
                name="rememberme"
                checked={rememberme}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="rememberme">
                Remember me?
              </label>
              <br />
              <br />
            </div>

            <button type="submit" className="login-button">
              LOGIN
            </button>
          </form>
        </section>

        <div className="background-wrapper" aria-hidden="true">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/64695fe3963cca30d781a469a70a792e374a17d3"
            alt="Login background"
            className="background-image"
          />
        </div>
      </div>

      <style>{`
        .login-container {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(249deg, #030a1b 68.64%, #9747ff 206.69%);
          position: relative;
          font-family: "Lato", sans-serif;
          overflow: hidden;
        }

        .error-message {
          background-color: rgba(255, 0, 0, 0.1);
          border: 1px solid #ff6b6b;
          color: #ff6b6b;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 16px;
          text-align: center;
          margin-bottom: 24px;
          width: 100%;
        }

        .form-field {
          position: relative;
          margin-bottom: 48px;
        }

        .field-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
        }

        .toggle-password {
          z-index: 3;
          background: none;
          border: none;
        }

        /* You can keep the rest of your styles here */
      `}</style>
    </main>
  );
};

export default LoginPage;
