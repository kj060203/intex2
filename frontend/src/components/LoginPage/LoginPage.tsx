'use client';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Handle button click for Create Account
const handleSignupClick = (navigate: ReturnType<typeof useNavigate>) => {
  navigate('/create-account');
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function
  // state variables for email and passwords
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);

  // state variable for error messages
  const [error, setError] = useState<string>('');

  // handle change events for input fields
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

  // handle submit event for the form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    console.log(error);
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl =
      'https://intex21-cza7e5hfc3e5evg3.eastus-01.azurewebsites.net/login?useCookies=true';
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include', // ✅ Ensures cookies are sent & received
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Ensure we only parse JSON if there is content
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
              <svg
                className="field-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.99924 4C4.99924 2.34315 6.34239 1 7.99924 1C9.6561 1 10.9992 2.34315 10.9992 4C10.9992 5.65685 9.6561 7 7.99924 7C6.34239 7 4.99924 5.65685 4.99924 4Z"
                  fill="#EBFAFF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.50007 13.4036C2.55163 10.4104 4.9939 8 7.99924 8C11.0047 8 13.447 10.4105 13.4984 13.4038C13.5018 13.6023 13.3875 13.784 13.207 13.8668C11.6211 14.5945 9.85693 15 7.99946 15C6.14182 15 4.37753 14.5945 2.79146 13.8666C2.61101 13.7838 2.49666 13.6021 2.50007 13.4036Z"
                  fill="#EBFAFF"
                />
              </svg>
            </div>

            <div className="form-field">
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                aria-label="Password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <svg
                className="field-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2.35355 1.64645C2.15829 1.45118 1.84171 1.45118 1.64645 1.64645C1.45118 1.84171 1.45118 2.15829 1.64645 2.35355L13.6464 14.3536C13.8417 14.5488 14.1583 14.5488 14.3536 14.3536C14.5488 14.1583 14.5488 13.8417 14.3536 13.6464L2.35355 1.64645Z"
                  fill="#EBFAFF"
                />
                <path
                  d="M15.1172 8.36887C14.7546 9.45913 14.1484 10.4383 13.3631 11.2418L11.2975 9.17615C11.4286 8.80857 11.5 8.41262 11.5 8C11.5 6.067 9.933 4.5 8 4.5C7.58738 4.5 7.19143 4.5714 6.82385 4.70253L5.17265 3.05133C6.04522 2.69587 6.99985 2.5 8.00035 2.5C11.3139 2.5 14.1243 4.64848 15.117 7.62697C15.1973 7.86768 15.1973 8.12812 15.1172 8.36887Z"
                  fill="#EBFAFF"
                />
                <path
                  d="M10.5 8C10.5 8.12011 10.4915 8.23824 10.4752 8.35383L7.64617 5.52485C7.76176 5.50847 7.87989 5.5 8 5.5C9.38071 5.5 10.5 6.61929 10.5 8Z"
                  fill="#EBFAFF"
                />
                <path
                  d="M8.35383 10.4752L5.52485 7.64617C5.50847 7.76176 5.5 7.87989 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C8.12011 10.5 8.23824 10.4915 8.35383 10.4752Z"
                  fill="#EBFAFF"
                />
                <path
                  d="M4.5 8C4.5 7.58738 4.5714 7.19143 4.70253 6.82385L2.63662 4.75794C1.85124 5.56148 1.24498 6.54076 0.882274 7.63113C0.802188 7.87188 0.802265 8.13233 0.882492 8.37303C1.87522 11.3515 4.68565 13.5 7.99918 13.5C8.9998 13.5 9.95455 13.3041 10.8272 12.9485L9.17615 11.2975C8.80857 11.4286 8.41262 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8Z"
                  fill="#EBFAFF"
                />
              </svg>
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

        .back-button {
          position: absolute;
          top: 13px;
          left: 21px;
          z-index: 10;
        }

        .back-arrow {
          width: 27px;
          height: 27px;
           background-color: #002244;
          transform: rotate(90deg);
        }

        .content-wrapper {
          display: flex;
          min-height: 100vh;
          padding: 20px;
          position: relative;
        }

        .login-section {
          padding: 87px 28px;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .welcome-header {
          width: 100%;
          text-align: center;
          margin-bottom: 26px;
        }

        .welcome-title {
          color: #ebfaff;
          font-size: 72px;
          font-weight: 700;
          margin: 0;
        }

        .auth-tabs {
          display: flex;
          justify-content: center;
          gap: 108px;
          margin-bottom: 85px;
        }

        .tab-item {
          position: relative;
          cursor: pointer;
        }

        .tab-text {
          color: #ebfaff;
          font-size: 24px;
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

        .login-form {
          width: 100%;
        }

        .form-field {
          position: relative;
          margin-bottom: 48px;
        }

        .input-field {
          width: 100%;
          padding: 22px 20px;
          background: transparent;
          border: 1px solid #ebfaff;
          border-radius: 12px;
          color: #ebfaff;
          font-size: 18px;
        }

        .field-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
        }

        .forgot-password {
          color: #b1b7ba;
          font-size: 16px;
          text-align: center;
          width: 100%;
          margin: 26px 0 44px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .login-button {
          width: 160px;
          height: 48px;
          border: 1px solid #fff;
          border-radius: 12px;
          color: #ebfaff;
          font-size: 16px;
          margin: 0 auto;
          cursor: pointer;
          background-color: #228ee5;
          display: block;
        }

        .background-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.3;
          z-index: 1;
        }

        .background-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        @media (max-width: 991px) {
          .login-container {
            max-width: 991px;
          }

          .content-wrapper {
            flex-direction: column;
          }

          .login-section {
            width: 100%;
            padding: 40px 20px;
          }
        }

        @media (max-width: 640px) {
          .login-container {
            max-width: 640px;
          }

          .welcome-title {
            font-size: 48px;
          }

          .auth-tabs {
            gap: 60px;
          }

          .tab-text {
            font-size: 20px;
          }

          .login-button {
            width: 100%;
          }

          .background-wrapper {
            display: none;
          }
        }
      `}</style>
    </main>
  );
};

export default LoginPage;
