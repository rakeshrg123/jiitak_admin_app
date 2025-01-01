import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from './Nav';
import "../css/ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const navigate = useNavigate();
    const defaultEmail = "admin.s12345@allright.com"; // Default email address
    const correctEmail = "admin.s12345@allright.com"; // Correct email address for comparison

    const handleFocus = () => {
        if (!email) {
            setEmail(defaultEmail);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setErrorMessage("メールアドレスの形式が正しくありません。"); // Invalid format message
            return;
        }

        if (email !== correctEmail) {
            setErrorMessage("入力されたメールアドレスが間違っています。"); // Incorrect email message
            return;
        }

        setErrorMessage(""); // Clear error message if email is valid and correct
        setLoading(true);

        // Simulate API request with random failure
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5; // Randomize success or failure

            setLoading(false);

            if (isSuccess) {
                console.log(`Password setup link: http://localhost:3000/passwordsetup`);
                toast.success("パスワード再設定用のURLをメールで送信しました", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                });

                // Simulate navigation after some delay (optional)
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                toast.error("パスワード再設定用URLの送信に失敗しました。もう一度お試しください。", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }, 2000);
    };

    return (
        <>
            <Nav />
            <div className="forgot-password-page d-flex align-items-center justify-content-center min-vh-100">
                <div className="card " style={{ width: "400px", marginTop: "-100px" }}>
                    <div className="text-center mb-4">
                        <h5 className="mb-2" style={{ fontSize: "28px", fontWeight: "500" }}>パスワード再設定</h5>
                        <p style={{ fontSize: "14px", fontWeight: "400" }}>
                            現在使っているメールアドレスを入力してください。パスワード再設定用のURLをメールで送信いたします。
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ fontSize: "12px", fontWeight: "500" }}>
                                メールアドレス
                            </label>
                            <input
                                type="text" // Changed to text to disable browser validation
                                className={`form-control form ${errorMessage ? "is-invalid" : ""}`} // Highlight input if there's an error
                                id="email"
                                value={email}
                                onFocus={handleFocus}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {errorMessage && ( // Display error message below the input field
                                <p
                                    className="email-hint"
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        color: "red",
                                    }}
                                >
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-orange"
                                disabled={loading || !email} // Disable button when loading or email is empty
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                    </>
                                ) : (
                                    "パスワード再設定用URLを送信する"
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <NavLink to={"/login"} className="link">
                            ログイン画面にもどる
                        </NavLink>
                    </div>
                </div>
                <ToastContainer toastClassName="custom-toast" />
            </div>
        </>
    );
};

export default ForgotPassword;
