import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NewsSubscriptionService from "../../services/NewsSubscriptionService";

export default function NewsletterForm() {
  const params = useParams();
  const router = useNavigate();
  const newsletterServe = new NewsSubscriptionService();
  const [value, setValue] = useState({
    name: "",
    country: "",
    email: ""
  });

  useEffect(() => {
    if (params?.id) {
      getSinglenewsletterData();
    }
  }, []);

  const getSinglenewsletterData = async () => {
    try {
      let response = await newsletterServe.getNewsDetails(params?.id);
      if (response) {
        setValue({
          _id: response.data?._id,
          name: response.data?.name,
          email: response.data?.email,
          country: response.data?.country,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };


  const ValidateSchema = Yup.object({
    name: Yup.string().required("Name is a required field"),
    email: Yup.string().required("Email is a required field").email(),
    country: Yup.string().required("Country is a required field"),
  });
  const onSubmit = async (values, { resetForm }) => {
    let obj = {
      name: values.name,
      email: values.email,
      country: values.country,
    };
    if (values._id) {
      obj._id = values._id
      newsletterServe.editrecord(values).then((res) => {
        if (res.err) {
          toast.error(res.err);
        } else {
          router("/newssubscription");
        }
      });
    } else {
      delete values._id;
      newsletterServe.addrecord(obj).then((res) => {
        if (res.err) {
          toast.error(res.err);
        } else {
          router("/newssubscription");
        }
      });
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
              <Link to="/newssubscription">
                <img
                  src="/assets/images/icons/leftarrow.svg"
                  alt="arrow"
                  className="ml-2"
                  style={{ paddingLeft: "8px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">Add a subscriber</h5>
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
                    <div className="col-6 ">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Name</label>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter the heading here"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-6 ">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Country</label>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter the heading here"
                          name="country"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.country}
                        />
                        {formik.touched.country && formik.errors.country ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.country}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 ">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Email Address</label>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter the heading here"
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.email}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 p-4 custom-submitbtn">
                    <button type="submit" className="btn btnForm ">
                      Submit
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
