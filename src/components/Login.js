import React, { useState, useEffect } from "react";
import { useNavigate,useLocation, NavLink } from "react-router-dom"; // Import the useNavigate hook
import "../App.css";
import Nav from "./Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const defaultEmail = "admin.s12345@allright.com";
  const defaultPassword = "password123";
  const suspendedEmail = "suspended.user@allright.com"; // Simulate a suspended account email

  const location = useLocation(); // Get the navigation state

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message, {
        position: "bottom-center",
        autoClose: 2000, // Auto-close after 2 seconds
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
      });
  
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  useEffect(() => {
    checkFormValidity();
  }, [email, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Simulate login process
    setTimeout(() => {
        setLoading(false);

        // Check email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            toast.error("メールアドレスの形式が正しくありません", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
                pauseOnHover: true,
                draggable: true,
                style: { whiteSpace: "nowrap" }, // Ensure the message stays in one line
            });
            return;
        }

        // Check for suspended account
        if (email === suspendedEmail) {
            setHasError(true);
            setEmail(""); // Clear the email field
            setPassword(""); // Clear the password field
            toast.error("アカウントが一時停止されています", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
                pauseOnHover: true,
                draggable: true,
                style: { whiteSpace: "nowrap" }, // Ensure the message stays in one line
            });
            return;
        }

        // Check if the email and password match the correct credentials
        if (email !== defaultEmail || password !== defaultPassword) {
            setHasError(true);
            toast.error("メールアドレスかパスワードに誤りがあります", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
                pauseOnHover: true,
                draggable: true,
                style: { whiteSpace: "nowrap" }, // Ensure the message stays in one line
            });
            return;
        }

        // Simulate temporary login failure
        if (email !== defaultEmail || password !== defaultPassword) {
            setHasError(true);
            setEmail(""); // Clear the email field
            setPassword(""); // Clear the password field
            toast.error("一次的なエラーでログインに失敗しました", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
                pauseOnHover: true,
                draggable: true,
                style: { whiteSpace: "nowrap" }, // Ensure the message stays in one line
            });
            return;
        }

        // Successful login
        setHasError(false);

        // Navigate to dashboard
        navigate("/dashboard"); // Redirect to the dashboard route
    }, 2000);
};

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setHasError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setHasError(false);
  };

  const checkFormValidity = () => {
    setIsButtonDisabled(!(email && password));
  };

  const handleFocus = (field) => {
    if (field === "email" && email === "") {
      setEmail(defaultEmail);
    }
    if (field === "password" && password === "") {
      setPassword(defaultPassword);
    }
  };

  useEffect(() => {
    if (email === defaultEmail && password === defaultPassword) {
      setIsButtonDisabled(false);
    }
  }, [email, password]);

  return (
    <>
      <Nav />
      <div className="container d-flex justify-content-center align-items-start pading"> {/* Adjusted padding-top */}
        <div className="row w-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
            <div className="text-center mb-4">
              <h1 className="heading">ログイン</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-start text">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  className={`form-control Field ${hasError ? "is-invalid" : ""}`}
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={() => handleFocus("email")}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-start text">
                  パスワード
                </label>
                <input
                  type="password"
                  id="password"
                  className={`password-field form-control Field ${hasError ? "is-invalid" : ""}`}
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => handleFocus("password")}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-orange"
                  disabled={isButtonDisabled || loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                      style={{ marginRight: "5px" }}
                    ></span>
                  ) : (
                    "ログイン"
                  )}
                </button>
              </div>
            </form>
            <p className="fp text-center">
              <NavLink to={'/passwordreset'} className="link">
                パスワードをお忘れの場合
              </NavLink>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer toastClassName="custom-toast" />
    </>
  );
}

export default Login;
