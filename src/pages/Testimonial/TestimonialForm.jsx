import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import testimonialService from "../../services/TestimonialService";


const TestimonialForm = () => {
  const [selectedImage, setSelectedImage] = useState();
  const testimonialServ = new testimonialService();
  const [error, setError] = useState();
  const params = useParams();
  const [value, setValue] = useState({
    name: "",
    designation: "",
    message: "",
    image: "",
  });

  const imageChange = (e) => {      
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };




  const getSingleTestimonialData = async () => {
    try {
      let response = await testimonialServ.getDetails(params?.id);
      if (response) {
        response.data.createdBy = response.data.createdBy?._id;
        setValue(response.data);
        setSelectedImage(response.data.image);
      } else {
        throw error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    if (params?.id) {
      getSingleTestimonialData();
    }
  }, []);

  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    designation: Yup.string().required("Designation is Required"),
    message: Yup.string().required("Message is Required"),
    image: Yup.string().required("Image is Required"),
  });

  const onSubmit = async (formValues) => {
    let values = { ...formValues };
    try {
      if (values._id !== undefined && values._id !== "") {
        const formData = new FormData();
        formData.append("_id", values._id);
        formData.append("name", values.name);
        formData.append("designation", values.designation);
        formData.append("message", values.message);
        formData.append("image", values.image);
        const token = window.user ? window.user.token : "no-token";
        const config = {
          headers: {
            content: "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        axios.put(process.env.REACT_APP_API_BASEURL + "/testimonial", formData, config).then(async (response) => {
          if (response.data) {
            toast.success("Testimonial updated successfully");
            window.scroll(0, 0);
          }
        });
      } else {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("designation", values.designation);
        formData.append("message", values.message);
        formData.append("image", values.image);
        const token = window.user ? window.user.token : "no-token";
        const config = {
          headers: {
            content: "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        axios.post(process.env.REACT_APP_API_BASEURL + "/testimonial", formData, config).then(async (response) => {
          if (response.data) {
            window.scroll(0, 0);
            toast.success("Testimonial added successfully");
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
    <div className="ljSectionData w-100 clearfix">
      <div className="custom_link">
        <div className="users_bottom_part">
          <div className="total_updates_top ActiveLinks">
            <div className="custom-link_backbtn">
              <Link to="/testimonial">
                <img
                  src="/assets/images/icons/leftarrow.svg"
                  alt="arrow"
                  className="ml-2"
                  style={{ paddingLeft: "8px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">Add New Testimonial</h5>
            </div>
            <div className="d-flex active_link_customs">
              <p className="m-0 pt-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
          </div>

          <div className="custom_link_form">
            <div className="CreateCustomLink">
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
                        <label htmlFor="for">Name</label>
                        <span className="star">*</span>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter the Name"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="formik-errors bg-error">{formik.errors.name}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-4 ">
                      <div className="form-group m-0">
                        <label htmlFor="for">Designation</label>
                        <span className="star">*</span>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter Designation"
                          name="designation"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.designation}
                        />
                        {formik.touched.designation && formik.errors.designation ? (
                          <div className="formik-errors bg-error">{formik.errors.designation}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 p-3">
                      <div className="form-group m-0">
                        <label htmlFor="for">Message</label> <span className="star">*</span>
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
                          value={formik.values.message}
                          onEditorChange={(e) =>
                            formik.handleChange({
                              target: { name: "message", value: e },
                            })
                          }
                        />
                        {formik.touched.message && formik.errors.message ? (
                          <div className="formik-errors bg-error">{formik.errors.message}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 p-3">
                      <label htmlFor="for">Upload a Image</label>
                      <span className="star">*</span>
                      <div className="box">
                        {params.id && typeof selectedImage == "string" ? (
                          <img src={selectedImage} alt="default" className="img-fulid" />
                        ) : selectedImage ? (
                          <img src={URL.createObjectURL(selectedImage)} alt="default" className="img-fulid" />
                        ) : (
                          <img src="/assets/images/upload-image.png" alt="default" className="img-fulid" />
                        )}
                      </div>
                      <div className="form-group m-0">
                        <div className="form-group">
                          <div className="input-group">
                            <input
                              type="file"
                              className="form-control"
                              placeholder="Upload Profile Picture (Size - 385X206px)"
                              id="image"
                              name="image"
                              onChange={(event) => {
                                formik.setFieldValue("image", event.currentTarget.files[0]), imageChange(event);
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
                          {formik.touched.image && formik.errors.image ? (
                            <div className="formik-errors bg-error">{formik.errors.image}</div>
                          ) : null}
                         </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 p-4 custom-submitbtn">
                    <button type="submit" className="btn btnForm ">
                      Add Testimonial
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
};

export default TestimonialForm;
