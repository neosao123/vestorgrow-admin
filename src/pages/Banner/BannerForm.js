import React, { useState, useEffect } from "react";
import moment from "moment"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import BannerService from "../../services/BannerService";

const locationList = ["Learning"]
export default function BannerForm() {
  const params = useParams();
  const navigate = useNavigate();
  const bannerServ = new BannerService();
  const [error, setError] = useState();
  const [selectedBanner, setSelectedBanner] = useState();
  const [value, setValue] = useState({
    title: "",
    subTitle: "",
    location: "",
    banner_image: "",
    link: "",
    linkName: ""
  });

  const bannerChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();

      img.onload = function () {
        const width = img.width;
        const height = img.height;

        if (width === 1440 && height === 350) {
          console.log("Image dimensions:", width, "x", height);
          setError("")
          setSelectedBanner(file);
        } else {
          setSelectedBanner("");
          setError("Image size should be width 1440px X height 350px");
          console.log("Image not perfect")
          console.log("Image dimensions:", width, "x", height);
        }
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  // const bannerChange = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setSelectedBanner(e.target.files[0]);
  //   }
  // };
  useEffect(() => {
    if (params?.id) {
      getSingleBannerData();
    }
  }, []);

  const getSingleBannerData = async () => {
    try {
      let response = await bannerServ.getDetails(params?.id);
      if (response) {
        setValue(response.data);
        setSelectedBanner(response.data.banner_image);
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    subTitle: Yup.string().required("sub title is Required"),
    location: Yup.string().required("Location is Required"),
    link: Yup.string().required("link is Required"),
    banner_image: Yup.string().required("banner image is Required"),
    linkName: Yup.string().required("Required"),
  });

  const onSubmit = async (formValues) => {
    let values = { ...formValues };
    try {
      if (values._id !== undefined && values._id !== "") {
        const formData = new FormData();
        formData.append("_id", values._id);
        formData.append("title", values.title);
        formData.append("subTitle", values.subTitle);
        formData.append("location", values.location);
        formData.append("banner_image", values.banner_image);
        formData.append("link", values.link);
        formData.append("linkName", values.linkName);
        const token = window.user ? window.user.token : "no-token";
        const config = {
          headers: {
            content: "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        axios
          .put(process.env.REACT_APP_API_BASEURL + "/banner", formData, config)
          .then(async (response) => {
            if (response.data) {
              toast.success("Learning Material updated successfully");
              window.scroll(0, 0);
            }
          });
      } else {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("subTitle", values.subTitle);
        formData.append("location", values.location);
        formData.append("banner_image", values.banner_image);
        formData.append("link", values.link);
        formData.append("linkName", values.linkName);
        const token = window.user ? window.user.token : "no-token";
        const config = {
          headers: {
            content: "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        axios
          .post(process.env.REACT_APP_API_BASEURL + "/banner", formData, config)
          .then(async (response) => {
            if (response.data) {
              window.scroll(0, 0);
              toast.success("Learning Material added successfully");
            }
          });
      }
    } catch (err) {
      throw err;
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
    // <div className="ljSectionData w-100 clearfix" id="ljSectionData">
    <div className="custom_link">
      <div className="users_bottom_part">
        <div className="total_updates_top ActiveLinks">
          <div className="custom-link_backbtn">
            <Link to="/banner">
              <img
                src="/assets/images/icons/leftarrow.svg"
                alt="arrow"
                className="ml-2"
                style={{ paddingLeft: "8px" }}
              />
            </Link>
          </div>
          <div className="walletAddressHead accountChangeHead ">
            <h5 className="m-0">Add a Banner</h5>
          </div>
          <div className="d-flex active_link_customs">
            <p className="m-0 pt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>

        <div className="custom_link_form">
          <div className=" CreateCustomLink">
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
                  <div className="col-md-4 col-4 ">
                    <div className="form-group m-0">
                      <label htmlFor="for">Title</label>
                      <span className="star">*</span>
                      <input
                        type="text"
                        className="form-control m-0"
                        placeholder="Enter the Name"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                      />
                      {formik.touched.title && formik.errors.titel ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.title}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-4 col-4 ">
                    <div className="form-group m-0">
                      <label htmlFor="for">Add Link</label>
                      <span className="star">*</span>
                      <input
                        type="text"
                        className="form-control m-0"
                        placeholder="Enter the Web Link"
                        name="link"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.link}
                      />
                      {formik.touched.link && formik.errors.link ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.link}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-4 col-4 ">
                    <div className="form-group m-0">
                      <label htmlFor="for">Add Link Name</label>
                      <span className="star">*</span>
                      <input
                        type="text"
                        className="form-control m-0"
                        placeholder="Enter the Link Name"
                        name="linkName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.linkName}
                      />
                      {formik.touched.linkName && formik.errors.linkName ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.linkName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 p-3">
                    <div className="form-group m-0">
                      <label htmlFor="for">Sub-title</label>{" "}
                      <span className="star">*</span>
                      <Editor
                        apiKey={window.tinyAPIKEY}
                        init={{
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
                          menubar: false,
                        }}
                        value={formik.values.subTitle}
                        onEditorChange={(e) =>
                          formik.handleChange({
                            target: { name: "subTitle", value: e },
                          })
                        }
                      />
                      {formik.touched.subTitle &&
                        formik.errors.subTitle ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.subTitle}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4">
                    <div className="form-group">
                      <label htmlFor="bannerimg">Location</label>{" "}
                      <span className="star">*</span>
                      <div class="input-group">
                        <select
                          className="form-control"
                          name="location"
                          onChange={formik.handleChange}
                          value={formik.values.location}
                        >
                          <option>Select Location</option>
                          {locationList.map((item, idx) => {
                            return (
                              <option value={item} key={idx} selected={item === formik.values.location ? true : false}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {formik.touched.location && formik.errors.location ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.location}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="for">Banner Image</label>{" "}
                    <span className="star">*</span>
                    <div className="box">
                      {params.id && typeof selectedBanner == "string" ? (
                        <img
                          src={selectedBanner}
                          alt="default"
                          className="img-fulid"
                        />
                      ) : selectedBanner ? (
                        <img
                          src={URL.createObjectURL(selectedBanner)}
                          alt="default"
                          className="img-fulid"
                        />
                      ) : (
                        <img
                          src="/assets/images/upload-image.png"
                          alt="default"
                          className="img-fulid"
                        />
                      )}
                    </div>
                    <div className="form-group m-0">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            placeholder="Upload Profile Picture (Size - 385X206px)"
                            id="banner_image"
                            name="banner_image"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "banner_image",
                                event.currentTarget.files[0]
                              ),
                                bannerChange(event);
                            }}
                          />
                          <div className="input-group-append">
                            <Link to="#">
                              <span className="input-group-text">
                                <img
                                  src="/assets/images/icons/upload-to-cloud.svg"
                                  alt="upload-to-cloud"
                                  className="img-fluid"
                                />
                              </span>
                            </Link>
                          </div>
                        </div>
                        {formik.touched.banner_image &&
                          formik.errors.banner_image ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.banner_image}
                          </div>
                        ) : null}
                        <span className="text-danger">{error}</span>
                      </div>
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
        {/* </div> */}
      </div>
      <ToastContainer />
    </div>
  );
}
