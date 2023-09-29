import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import AccountService from "../../services/AccountService";
import { Formik, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default class WalletAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
    };
    this.state.user = {
        wallet_address: "",
        ...user.data,
    };
    this.accountServ = new AccountService();
    this.schema = Yup.object({
      wallet_address: Yup.string().required("Required"),
    });
  }

  componentDidMount() {
    this.getUserDetails();
  }

  getUserDetails = async () => {
    try {
      let userId = window.user && window.user.data._id;
      let response = await this.accountServ.getUser(userId);
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

  submitAddress = async (values) => {
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
          this.setState({ redirect: true });
        }, 1000);
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
        onSubmit={this.submitAddress.bind(this)}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <div className="walletAddress">
            <div className="walletAddressHead accountChangeHead mb-3">
              <h5>ENS/Wallet Address</h5>
            </div>
            <form className="" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="walletaddress" className="form-label">
                  ENS/Wallet Address <span>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="walletaddress"
                  placeholder="Please enter your ENS/Wallet address"
                  name="wallet_address"
                  value={values && values.wallet_address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.wallet_address && !errors.wallet_address}
                />
                <ErrorMessage name="wallet_address">
                  {(msg) => <div className="err_below">{msg}</div>}
                </ErrorMessage>
              </div>
              <button type="submit" className="btn btnForm mt-2">
                SUBMIT
              </button>
            </form>
          </div>
        )}
      </Formik>
    );
  }
}
