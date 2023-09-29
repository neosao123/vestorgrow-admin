import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import AccountService from "../../services/AccountService";
import { toast } from "react-toastify";
import axios from "axios";

export default class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      user: [],
    };

    this.state.user = {
      full_name: "",
      user_name: "",
      bio: "",
      email: "",
      gender: "",
      file: "",
    };

    this.accountService = new AccountService();

    this.schema = Yup.object({
      full_name: Yup.string().required("Full name a required field"),
      user_name: Yup.string().required("User name a required field"),
      // bio: Yup.string().required("Bio a required field"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      gender: Yup.string().required("Please select gender"),
    });
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    try {
      let userId = window.user && window.user._id;
      let response = await this.accountService.getUser(userId);
      if (response.data) {
        this.setState({ user: response.data });
      }
    } catch (err) {
      this.setState({
        user: [],
        errorMsg: err.error,
      });
    }
  };

  submitUser = async (values) => {
    let tx = values;
    delete tx.redirect;
    const formData = new FormData();
    for (let prop in tx) {
      formData.append(prop, tx[prop]);
    }
    const token = window.user ? window.user.token : "no-token";
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.put(
        process.env.REACT_APP_API_BASEURL + "/",
        formData,
        config
      );

      if (response.data.message) {
        setTimeout(() => {
            toast.success("User updated successfully");
            this.getUserDetails();
          this.setState({ redirect: true });
        }, 2000);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  render() {
    return (
      <Formik
        validationSchema={this.schema}
        initialValues={this.state.user}
        enableReinitialize={true}
        onSubmit={this.submitUser.bind(this)}
        render={({
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="w-100 profilePicOuter d-flex align-items-center">
              <div className="profilePic position-relative me-4">
                <div className="profImg">
                  <span>SK</span>
                </div>
                <div className="editProfile position-absolute">
                  {/* <Link to="#" className="text-uppercase"> */}
                  <img
                    // src="assets/images/icons/change.png"
                    src={values.file} width={"100px"} height={"auto"}
                    alt="edit icon"
                    className="img-fulid"
                    onClick={() => {
                      //call ref click event of input
                      this.myRef.current.click();
                    }}
                  />
                  <input
                    style={{display: 'none'}}
                    type="file"
                    id="user"
                    ref={this.myRef}
                    name="user"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                      this.setState({ disabled: false });
                    }}
                  />
                  <span>Change</span>
                  {/* </Link> */}
                </div>
              </div>
              <div className="w-100 profileInfo">
                <div className="form-group">
                  <label htmlFor="fullname" className="form-label">
                    Full Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="full_name"
                    placeholder="Enter Your Full Name"
                    name="full_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.full_name}
                  />
                  <ErrorMessage name="full_name">
                    {(msg) => <div className="err_below">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="form-group">
                  <label htmlFor="pwd" className="form-label">
                    Username <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="user_name"
                    placeholder="Please choose a username"
                    name="user_name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.user_name}
                  />
                  <ErrorMessage name="username">
                    {(msg) => <div className="err_below">{msg}</div>}
                  </ErrorMessage>
                </div>
              </div>
            </div>
            <div className="proBio">
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  className="form-control"
                  rows="4"
                  id="bio"
                  name="bio"
                  placeholder="Tell us your story!"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bio}
                />
                <ErrorMessage name="bio">
                  {(msg) => <div className="err_below">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Please enter your email address"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="err_below">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-group">
                <label htmlFor="gender" className="form-label">
                  Gender <span>*</span>
                </label>
                <select
                  className="form-control"
                  name="gender"
                  onChange={handleChange}
                  value={values.gender}
                  isvalid={touched.gender && !errors.gender}
                >
                  <option>Please select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" className="btn btnForm mt-2">
                Save
              </button>
            </div>
          </form>
        )}
      />
    );
  }
}
