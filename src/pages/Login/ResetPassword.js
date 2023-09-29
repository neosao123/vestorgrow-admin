
import React, { useState, useRef } from "react";
import LoginHeader from "./LoginHeader";
import Footer from "../Footer/Footer";
import InfoUpdate from "./InfoUpdate";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import { Formik, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ResetPassword() {
  const params = useParams();
  const [passwordShown, setPasswordShown] = useState(false);
  const newPasswordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const navigate = useNavigate();
  const userService = new UserService();

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    newPassword: Yup.string().required("Password is a required field"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Password must match")
      .required("Confirm Password is a required field"),
  });

  function submitResetPassword(values, e) {
    try {
      let obj = {
        newPassword: values.newPassword,
        verifyPassword: values.confirmPassword
      }
      userService
        .resetPassword(obj, params.token)
        .then((result) => {
          if (result.message) {
            setTimeout(() => {
              toast.success(result.message);
              navigate("/login");
            }, 2000)
          } else {
            toast.error(result.error);
          }
        })
        .catch((e) => {
          toast.error(e);
        });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={submitResetPassword}
    >
      {({
        values,
        errors,
        status,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
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
                        <form action="" onSubmit={handleSubmit}>
                          <div className="mb-4 mt-4">
                            <label htmlFor="" className="form-label">
                              Enter New Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              name="newPassword"
                              value={values && values.newPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={
                                touched.newPassword && !errors.newPassword
                              }
                            />
                          </div>
                          <ErrorMessage name="newPassword">
                            {(msg) => <div className="err_below">{msg}</div>}
                          </ErrorMessage>
                          <div className="mb-4">
                            <label
                              htmlFor=""
                              className="form-label"
                            >
                              Confirm New Password
                            </label>
                            <input
                              type={passwordShown ? "text" : "password"}
                              className="form-control"
                              name="confirmPassword"
                              value={values && values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={
                                touched.confirmPassword && !errors.confirmPassword
                              }
                            />
                          </div>
                          <ErrorMessage name="confirmPassword">
                            {(msg) => <div className="err_below">{msg}</div>}
                          </ErrorMessage>
                          <div className="rememberPassword d-flex mb-5">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="show password"
                                  onClick={togglePassword}
                                />{" "}
                                Show Password
                              </label>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btnForm mt-3 mb-2"
                          >
                            CHANGE PASSWORD
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <Footer />
          <ToastContainer />
        </main>
      )}
    </Formik>
  );
}














