import React, { Component } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import userService from "../../services/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    const localuser = JSON.parse(localStorage.getItem("user"));
    const user = localuser.data;

    this.state = {
      newPassword: "",
      verifyPassword: "",
      redirect: false,
    };

    this.userServ = new userService();
    this.schema = Yup.object({
      newPassword: Yup.string().required("Required"),
      verifyPassword: Yup.string().required("Required"),
    });
  }

  submitPassword = async (values) => {
    delete values.redirect;
    try {
      const response = await this.userServ.changePassword(values);
      if (response.message) {
        setTimeout(() => {
          toast.success(response.message);
          this.setState({ redirect: true });
        }, 1000);
      } else {
        toast.error(response.error);
        this.setState({ redirect: false });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to="/dashboard" />;
    // }
    return (
      <Formik
        validationSchema={this.schema}
        initialValues={this.state}
        enableReinitialize={true}
        onSubmit={this.submitPassword.bind(this)}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <>
            <div className="changePassword">
              <div className="changePasswordHead accountChangeHead mb-3">
                <h5>Change your Password</h5>
              </div>
              <form className="" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="NewPassword" className="form-label">
                    Enter New Password <span>*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="newPassword"
                      className="form-control"
                      id="NewPassword"
                      placeholder="Please enter your new password"
                      value={values && values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.newPassword && !errors.newPassword}
                    />
                    <span className="input-group-text">
                      <img
                        src="/assets/images/icons/tick.png"
                        alt="tickicon"
                        className="img-fluid"
                      />
                    </span>
                  </div>
                  <ErrorMessage name="newPassword">
                    {(msg) => <div className="err_below">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword" className="form-label">
                    Confirm New Password <span>*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="verifyPassword"
                      value={values.verifyPassword}
                      className="form-control"
                      id="ConfirmPassword"
                      placeholder="Please confirm your new password"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    />
                    <span className="input-group-text">
                      <img
                        src="/assets/images/icons/tick.png"
                        alt="tickicon"
                        className="img-fluid"
                      />
                    </span>
                  </div>
                  <ErrorMessage name="verifyPassword">
                    {(msg) => <div className="err_below">{msg}</div>}
                  </ErrorMessage>
                </div>
                <button type="submit" className="btn btnForm mt-2">
                  CHANGE PASSWORD
                </button>
              </form>
            </div>

            <ToastContainer />
          </>
        )}
      </Formik>
    );
  }
}
