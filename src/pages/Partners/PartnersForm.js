import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import PartnerService from "../../services/PartnerService";

export default function ContributorForm() {
  const params = useParams();
  const router = useNavigate();
  const partnerServ = new PartnerService();
  const [value, setValue] = useState({
    name: "",
    category: "",
    description: "",
    social_links: {
      facebook: "",
      twitter: "",
      instagram: "",
      website: "",
    },
    banner_image: "",
  });

  useEffect(() => {
    if (params?.id) {
      getPartnerDetail(params.id);
    }
  }, []);

  const getPartnerDetail = async (id) => {
    try {
      let response = await partnerServ.getDetails(id);
      if (response) {
        setValue({
          _id: response.data._id,
          name: response.data.name,
          category: response.data.category,
          description: response.data.description,
          social_links: {
            facebook: response.data.social_links.facebook,
            twitter: response.data.social_links.twitter,
            instagram: response.data.social_links.instagram,
            website: response.data.social_links.website,
          },
          banner_image: response.data.banner_image,
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
    name: Yup.string().required("Name is a required field"),
    category: Yup.string().required("Category is a required field"),
    description: Yup.string().required("Description is a required field"),
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    if (values._id) {
      formData.set("_id", values._id);
    }
    formData.set("name", values.name);
    formData.set("banner_image", values.banner_image);
    formData.set("category", values.category);
    formData.set("description", values.description);
    formData.set("social_links", JSON.stringify(values.social_links));
    try {
      let response;
      if (values._id) {
        response = await partnerServ.updateRecord(formData);
      } else {
        response = await partnerServ.addrecord(formData);
      }
      if (response.err) {
        toast.error(res.err);
      } else {
        router("/partners");
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
              <Link to="/partners">
                <img
                  src="/assets/images/icons/leftarrow.svg"
                  alt="arrow"
                  className="ml-2"
                  style={{ paddingLeft: "8px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">Add a partner</h5>
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
                    <div className="col-8">
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
                    <div className="col-4">
                      <div className="form-group mb-3">
                        <label htmlFor="bannerimg">Banner Image</label>

                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            id="online_view_link"
                            placeholder="Upload an image (396 x 316px)"
                            name="banner_image"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "banner_image",
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
                                {formik.values.banner_image &&
                                typeof formik.values.banner_image ==
                                  "string" ? (
                                  <img
                                    src={formik.values?.banner_image}
                                    alt="banner_image"
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
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="online_view_link">Category</label>
                        <input
                          type="text"
                          className="form-control"
                          id="category"
                          placeholder="Enter the category of partner here"
                          name="category"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.category}
                        />
                        {formik.touched.category && formik.errors.category ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.category}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="online_view_link">Website</label>
                        <input
                          type="text"
                          className="form-control"
                          id="social_links.website"
                          placeholder="Enter the website link here"
                          name="social_links.website"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.social_links.website}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="online_view_link">Twitter</label>
                        <input
                          type="text"
                          className="form-control"
                          id="social_links.twitter"
                          placeholder="Enter the Twitter Link here"
                          name="social_links.twitter"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.social_links.twitter}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="online_view_link">Facebook</label>
                        <input
                          type="text"
                          className="form-control"
                          id="social_links.facebook"
                          placeholder="Enter the Facebook Link here"
                          name="social_links.facebook"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.social_links.facebook}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="online_view_link">Instagram</label>
                        <input
                          type="text"
                          className="form-control"
                          id="online_view_link"
                          placeholder="Enter the Instagram link here"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="social_links.instagram"
                          value={formik.values.social_links.instagram}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="online_view_link">Description</label>
                        <textarea
                          className="form-control m-0"
                          name="description"
                          placeholder="Enter the definition of the above word"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
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
