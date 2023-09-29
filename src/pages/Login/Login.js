import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import UserService from "../../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ handleAuthState }) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");

  const userService = new UserService();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUserEmail = emailInputRef.current.value;
    const enteredUserPassword = passwordInputRef.current.value;

    const formData = {
      email: enteredUserEmail,
      password: enteredUserPassword,
    };
    userService
      .login(formData)
      .then((res) => {
        if (res?.token) {
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
          handleAuthState(true);
        } else {
          setErrorMsg(res);
          // toast.error(res?.error);
        }
      })
      .catch((err) => {
        setErrorMsg(err.err);
        // toast.error(err);
      });
  };

  return (
    <>
      <div className="loginFormSection">
        <div className="loginFormSec mx-auto">
          <div className="loginFormHeading text-center">
            <h4>VestorGrow ADMIN</h4>
          </div>
          <div className="logInFormInput">
            <form onSubmit={submitHandler}>
              <div className="mb-4 mt-4">
                <label htmlFor="" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id=""
                  name="new password"
                  ref={emailInputRef}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmpassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  name="confirm password"
                  ref={passwordInputRef}
                  required
                />
              </div>
              <div className="rememberPassword d-flex mb-5">
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="show password"
                    />{" "}
                    Remember Me
                  </label>
                </div>
                <div className="forgotPassword ms-auto">
                  <Link to="/forgot_password" className="textPassword">
                    Forgot Password?
                  </Link>
                </div>
              </div>
              {errorMsg && (
                <div className="valid_feedbackMsg text-center">
                  {errorMsg}
                </div>
              )}
              <button type="submit" className="btn btnForm mt-3 mb-2">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
