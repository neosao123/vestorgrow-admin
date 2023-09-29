import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NewsletterService from "../../services/NewsLetterService";

export default function NewsletterForm() {
  const params = useParams();
  const router = useNavigate();
  const newsletterServe = new NewsletterService();
  const [value, setValue] = useState({
    name: "",
    online_view_link: "",
    description: "",
    banner_image: "",
    newsletter_pdf: "",
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
          description: response.data?.description,
          banner_image: response.data?.banner_image,
          newsletter_pdf: response.data?.newsletter_pdf,
          online_view_link: response.data?.online_view_link,
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

  const SUPPORTED_FORMAT = ["application/pdf"];

  const ValidateSchema = Yup.object({
    name: Yup.string().required("Name is a required field"),
    online_view_link: Yup.string()
      .test("is-url-valid", "URL is not valid", (value) => isValidUrl(value))
      .required("Online view link a required field "),
    description: Yup.string()
      .max(95, "Maximum 95 words")
      .required("Description a required field"),
    banner_image: Yup.mixed().required("banner_image is required"),
    newsletter_pdf: Yup.mixed().test(
      "fileFormat",
      "Please upload PDF file only",
      function (value) {
        return value && SUPPORTED_FORMAT.includes(value.type);
      }
    ),
  });
  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    if (values._id) {
      formData.set("_id", values._id);
    }
    formData.set("name", values.name);
    formData.set("banner_image", values.banner_image);
    formData.set("description", values.description);
    formData.set("online_view_link", values.online_view_link);
    formData.set("newsletter_pdf", values.newsletter_pdf);

    const token = window.user ? window.user.token : "no-token";
    const config = {
      headers: {
        content: "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };
    if (values._id) {
      try {
        const response = await axios.put(
          process.env.REACT_APP_API_BASEURL + "/newsletter",
          formData,
          config
        );
        if (response.err) {
          toast.error(response.err);
        } else {
          router("/publish_newsletter");
        }
      } catch (err) {
        throw err;
      }
    } else {
      axios
        .post(
          process.env.REACT_APP_API_BASEURL + "/newsletter",
          formData,
          config
        )

        .then((res) => {
          if (res.err) {
            toast.error(res.err);
          } else {
            router("/publish_newsletter");
          }
        })
        .catch((err) => {
          throw err;
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
              <Link to="/publish_profiles">
                <img
                  src="/assets/images/icons/leftarrow.svg"
                  alt="arrow"
                  className="ml-2"
                  style={{ paddingLeft: "8px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">Add a Profiles</h5>
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
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Name</label>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter the name"
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
                    <div className="col-6">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Contract Address</label>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter the address"
                          name="contractAddress"
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
                    <div className="col-12 ">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Description</label>
                        <textarea
                          className="form-control m-0"
                          name="description"
                          placeholder="Enter a description"
                          value={formik.values.description}
                        />

                        {formik.touched.description &&
                        formik.errors.description ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.description}
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
