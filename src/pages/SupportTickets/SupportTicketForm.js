import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import SupportService from "../../services/SupportTicketService";

export default function ContributorForm() {
  const params = useParams();
  const router = useNavigate();
  const supportServ = new SupportService();
  const [value, setValue] = useState({
    full_name: "",
    twitter_username: "",
    wallet_address: "",
    discord_username: "",
    email_address: "",
    subject: "",
    message: "",
    attachments: "",
    status: "",
  });

  useEffect(() => {
    if (params?.id) {
      getPartnerDetail(params.id);
    }
  }, []);

  const getPartnerDetail = async (id) => {
    try {
      let response = await supportServ.getSupportTicketDetails(id);
      if (response) {
        setValue({
          _id: response.data._id,
          full_name: response.data.full_name,
          twitter_username: response.data.twitter_username,
          wallet_address: response.data.wallet_address,
          discord_username: response.data.discord_username,
          email_address: response.data.email_address,
          subject: response.data.subject,
          attachments: response.data.attachments,
          status: response.data.status,
          message: response.data.message,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    return true;
  };

  const ValidateSchema = Yup.object({
    full_name: Yup.string().required("Name is a required field"),
    twitter_username: Yup.string().required(
      "Twitter username is a required field"
    ),
    wallet_address: Yup.string().required("wallet is a required field"),
    discord_username: Yup.string().required(
      "Discord username is a required field"
    ),
    email_address: Yup.string()
      .required("Email address is a required field")
      .email(),
    subject: Yup.string().required("Subject is a required field"),
    // status: Yup.string().required("Status is a required field"),
    message: Yup.string().required("Message is a required field"),
  });

  const onSubmit = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    if (values._id) {
      formData.append("_id", values._id);
    }
    formData.append("full_name", values.full_name);
    formData.append("twitter_username", values.twitter_username);
    formData.append("wallet_address", values.wallet_address);
    formData.append("discord_username", values.discord_username);
    formData.append("email_address", values.email_address);
    formData.append("subject", values.subject);
    formData.append("attachments", values.attachments);
    formData.append("status", values.status);
    formData.append("message", values.message);
    try {
      let response;
      if (values._id) {
        response = await supportServ.editSupportTicketRecord(formData);
      } else {
        response = await supportServ.addSupportTicketRecord(formData);
      }
      if (response.err) {
        toast.error(response.err);
      } else {
        router("/support_ticket");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const formik = useFormik({
    initialValues: value,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });
  return (
    <div className="ljSectionData w-100 clearfix" id="ljSectionData">
      <div className="custom_link">
        <div className="users_bottom_part">
          <div className="total_updates_top ActiveLinks">
            <div className="custom-link_backbtn">
              <Link to="/support_ticket">
                <img
                  src="/assets/images/icons/leftarrow.svg"
                  alt="arrow"
                  className="ml-2"
                  style={{ paddingLeft: "8px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">Add a Supporter</h5>
            </div>
            <div className="d-flex active_link_customs">
              <p className="m-0 pt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
          <div className="custom_link_form">
            <div className="custom_form CreateCustomLink">
              <div className="update_form accountInner p-0 border-0">
                <form onSubmit={formik.handleSubmit}>
                  <div
                    className="row"
                    style={{
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <div className="col-4">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Name</label>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter the full name"
                          name="full_name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.full_name}
                        />
                        {formik.touched.full_name && formik.errors.full_name ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.full_name}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="online_view_link">
                          Twitter Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="twitter_username"
                          placeholder="Enter the twitter username here"
                          name="twitter_username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.twitter_username}
                        />
                        {formik.touched.twitter_username &&
                        formik.errors.twitter_username ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.twitter_username}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="online_view_link">Wallet address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="wallet_address"
                          placeholder="Enter the wallet address here"
                          name="wallet_address"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.wallet_address}
                        />
                        {formik.touched.wallet_address &&
                        formik.errors.wallet_address ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.wallet_address}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="online_view_link">
                          Discord username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="discord_username"
                          placeholder="Enter the Discord Username here"
                          name="discord_username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.discord_username}
                        />
                        {formik.touched.discord_username &&
                        formik.errors.discord_username ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.discord_username}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="online_view_link">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email_address"
                          placeholder="Enter the email address here"
                          name="email_address"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email_address}
                        />
                        {formik.touched.email_address &&
                        formik.errors.email_address ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.email_address}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="online_view_link">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          placeholder="Enter the subject here"
                          name="subject"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.subject}
                        />
                        {formik.touched.subject && formik.errors.subject ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.subject}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 ">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Message</label>
                        <textarea
                          className="form-control m-0"
                          name="message"
                          placeholder="Enter the Message"
                          value={formik.values.message}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />

                        {formik.touched.message && formik.errors.message ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.message}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label htmlFor="bannerimg">Attachments</label>

                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            id="attachments"
                            placeholder="Upload an image (396 x 316px)"
                            name="attachments"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "attachments",
                                event.currentTarget.files[0]
                              );
                            }}
                          />

                          <div className="input-group-append">
                            <Link to="#">
                              <span
                                className="input-group-text"
                                style={{ height: "100%" }}
                              >
                                {formik.values.attachments &&
                                typeof formik.values.attachments == "string" ? (
                                  <img
                                    src={formik.values?.attachments}
                                    alt="attachments"
                                    width={30}
                                    height={25}
                                  />
                                ) : (
                                  <img
                                    src="/assets/images/icons/upload-to-cloud.svg"
                                    alt="upload-to-cloud"
                                    className="img-fluid"
                                  />
                                )}
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Status</label>
                        <select
                          className="form-control"
                          name="status"
                          onChange={formik.handleChange}
                          value={formik.values.status}
                        >
                          <option value={0}>Please select status</option>
                          <option value={0}>Pending</option>
                          <option value={1}>In Progress</option>
                          <option value={2}>Complete</option>
                          <option value={3}>On Hold</option>
                          <option value={4}>Cancelled</option>
                        </select>
                        {formik.touched.status && formik.errors.status ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.status}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 p-4 custom-submitbtn">
                    <button type="submit" className="btn btnForm ">
                      Publish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
