import React, { useState } from "react";
import Nav from "./Nav";
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/PasswordSetup.css";

function PasswordSetup() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
    const [passwordMismatchError, setPasswordMismatchError] = useState(false);
    const [submitted, setSubmitted] = useState(false);



    const navigate = useNavigate();
    const defaultPassword = "Password1234";

 
    const checkPasswordStrength = (password) => {
        if (password.length < 8) {
            return "パスワードは8文字以上にしてください";
        } else if (!/[A-Z]/.test(password)) {
            return "パスワードには大文字を含めてください";
        } else if (!/[a-z]/.test(password)) {
            return "パスワードには小文字を含めてください";
        } else if (!/\d/.test(password)) {
            return "パスワードには数字を含めてください";
        } else {
            return "パスワードは強力です";
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            if (password !== confirmPassword) {
                setPasswordMismatchError(true);
                return;
            }


            const success = Math.floor(Math.random()*2) > 0;
            if (!success) {
                toast.error("パスワード設定に失敗しました。もう一度お試しください。", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }

            setShowConfirmPassword(true);
            navigate("/login", { state: { message: "パスワード設定が完了しました" } });
        }, 2000);
    };


    const handleFocus = (field) => {
        if (field === "password" && !password) {
            setPassword(defaultPassword);
            setPasswordStrengthMessage(checkPasswordStrength(defaultPassword));
            updateButtonState(defaultPassword, confirmPassword);
        } else if (field === "confirmPassword" && !confirmPassword) {
            setConfirmPassword(defaultPassword);
            updateButtonState(password, defaultPassword);
        }
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordStrengthMessage(checkPasswordStrength(newPassword));
        setPasswordMismatchError(false); // Reset error state
        updateButtonState(newPassword, confirmPassword);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordMismatchError(false); // Reset error state
        updateButtonState(password, event.target.value);
    };

    const updateButtonState = (passwordValue, confirmPasswordValue) => {
        setIsButtonDisabled(!(passwordValue && confirmPasswordValue));
    };

    return (
        <>
            <Nav />
            <div className="container d-flex justify-content-center align-items-start pading">
                <div className="row w-100">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
                        <div className="text-center mb-4">
                            <h1 style={{ fontSize: "28px", fontWeight: "400" }}>パスワード設定</h1>

                            <p style={{ fontSize: "15px", fontWeight: "400" }}>
                                パスワードを入力後 [設定ボタン] を押してサービスの 利用を開始してください。
                            </p>

                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label" style={{ fontSize: "12px", fontWeight: "400" }}>
                                    パスワード
                                </label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        className={`form-control Field ${submitted && passwordStrengthMessage !== "パスワードは強力です" ? "is-invalid" : ""
                                            }`}
                                        value={password}
                                        onFocus={() => handleFocus("password")}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <p className="posi" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? "非表示" : "表示"}
                                    </p>
                                </div>
                                <p
                                    className="password-hint"
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        color: submitted && passwordStrengthMessage !== "パスワードは強力です" ? "red" : "inherit",
                                    }}
                                >
                                    半角大文字・小文字・数字を含めた8文字以上20文字以内
                                </p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label" style={{ fontSize: "12px", fontWeight: "400" }}>
                                    パスワード確認用
                                </label>
                                <div className="input-group">
                                    <input
                                        type={loading || showConfirmPassword ? "text" : "password"} // Show text format during loading
                                        id="confirmPassword"
                                        className={`form-control Field ${passwordMismatchError ? "is-invalid" : ""}`}
                                        value={confirmPassword}
                                        onFocus={() => handleFocus("confirmPassword")}
                                        onChange={handleConfirmPasswordChange}
                                        required
                                    />
                                    <p className="posi" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? "非表示" : "表示"}
                                    </p>
                                </div>
                                {passwordMismatchError && (
                                    <p className="text-danger" style={{ fontSize: "12px", fontWeight: "400" }}>
                                        パスワードが一致していません
                                    </p>
                                )}
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
                                        "設定"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer toastClassName="custom-toast" />
        </>
    );
}

export default PasswordSetup;
