import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginHeader from "./LoginHeader";
import InfoUpdate from "./InfoUpdate";
import Footer from "../Footer/Footer";
import UserService from "../../services/UserService";

export default function ForgotPassword({ handleAuthState }) {
  const emailAddressInputRef = useRef();

  const userService = new UserService();
  const navigate = useNavigate();

  const loginhandler = () => {
    navigate("/login");
  };
  // const passwordHandler = () => {

  // };

  const submitHandler = (event) => {
    try {
      event.preventDefault();
      const enteredEmailAddress = emailAddressInputRef.current.value;
      emailAddressInputRef.current.value = "";
      const formData = {
        email: enteredEmailAddress,
        flag: "admin_fogot_password",
      };
      userService
        .forgotPassword(formData)
        .then((response) => {
          if (response.message) {
            toast.success(response.message);
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            toast.error(response?.error);
          }
        })
        .catch(console.log);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="w-100 clearfix mainSection">
      <div className="w-100 clearfix rightSection">
        <div className="contantSection">
          <LoginHeader />
          <section className="w-100 clearfix loginFormSection">
            <div className="w-100 logInSection d-flex align-items-center">
              <InfoUpdate />
              <div className="loginFormSection">
                <div className="loginFormSec mx-auto">
                  <div className="loginFormHeading text-center">
                    <h4>VestorGrow ADMIN</h4>
                  </div>
                  <div className="logInFormInput">
                    <form action="" onSubmit={submitHandler}>
                      <div className="mb-4 mt-4 pb-3">
                        <label htmlFor="email_id" className="form-label">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email_id"
                          name="email address"
                          ref={emailAddressInputRef}
                        />
                      </div>
                      <button type="submit" className="btn btnForm mt-4">
                        SEND RESET LINK
                      </button>
                      <p className="or_text">OR</p>
                      <button
                        type="submit"
                        className="btn w-100 login_btn customButton mb-2"
                        onClick={loginhandler}
                      >
                        <span className="gradiant_text login_btn_text">
                          LOG IN
                        </span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
