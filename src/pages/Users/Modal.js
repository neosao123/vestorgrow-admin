import React, { useState } from "react";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Modal({ closeModal, data, items, modalData }) {
  const ValidateSchema = Yup.object({
    full_name: Yup.string().required("Required"),
    user_name: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    wallet_address: Yup.string(),
    createdAt: Yup.string().required("Required "),
  });

  const onSubmit = async (data, { resetForm }) => {
    const formData = new FormData();
    formData.set("_id", data._id);
    formData.set("full_name", data.full_name);
    formData.set("user_name", data.user_name);
    formData.set("wallet_address", data.wallet_address);
    formData.set("email", data.email);
    formData.set("role", data.role[0]);
    formData.set("createdAt", data.createdAt);
    const obj = {
      _id: data._id,
      full_name: data.full_name,
      user_name: data.user_name,
      role: data.role,
      email: data.email,
      createdAt: data.createdAt,
    };

    const token = window.user ? window.user.token : "no-token";
    const config = {
      headers: {
        content: "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };
    try {
      let response = await axios.put(
        process.env.REACT_APP_API_BASEURL + "/",
        formData,
        config
      );
      if (response?.status == 200) {
        closeModal(false);
        toast.success(response.data.message);
        modalData(items.map((v) => (v._id === obj._id ? obj : v)));
      } else {
        toast.error("something went wrong!");
      }
    } catch (err) {
      throw err;
    }
  };
  const formik = useFormik({
    initialValues: { ...data },
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });

  return (
    <div className="user-modal-container">
      <div className="cross_btnDiv">
        <h3>User Edit</h3>
        <button className="cross_btn" onClick={() => closeModal(false)}>
          X
        </button>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="form_group">
            <label>Full Name</label>
            <input
              type="text"
              name="full_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.full_name}
            />
            {formik.errors.full_name ? (
              <div className="formik-errors bg-error">
                {formik.errors.full_name}
              </div>
            ) : null}
          </div>
          <div className="form_group">
            <label>Username</label>
            <input
              type="text"
              name="user_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.user_name}
            />
            {formik.errors.user_name ? (
              <div className="formik-errors bg-error">
                {formik.errors.user_name}
              </div>
            ) : null}
          </div>
          <div className="form_group">
            <label>Wallet Address</label>
            <input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="wallet_address"
              value={formik.values.wallet_address}
            />
            {formik.errors.wallet_address ? (
              <div className="formik-errors bg-error">
                {formik.errors.wallet_address}
              </div>
            ) : null}
          </div>
          <div className="form_group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <div className="formik-errors bg-error">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div class="form_group">
            <label>Role</label>
            <select
              className="form-control"
              name="role"
              onChange={(e) => {
                formik.setFieldValue("role", [e.target.value]);
              }}
              value={formik.values.role ? formik.values.role[0] : ""}
            >
              <option value="user" key="user">
                User
              </option>
              <option value="author" key="author">
                Moderator
              </option>
              <option value="admin" key="admin">
                Admin
              </option>
            </select>
            {/* <img
                            src="/assets/images/icons/dwnarw.svg"
                            alt="default"
                            className="img-fulid"
                          /> */}
          </div>
        </div>
        <div className="modal_button">
          <button
            className="btn customButton learnBtn"
            style={{ marginTop: "10px" }}
            onClick={() => closeModal(false)}
          >
            cancel
          </button>
          <button className="btn_submit" type="submit">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Modal;
