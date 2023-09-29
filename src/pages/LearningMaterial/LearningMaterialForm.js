import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import LearningMatService from "../../services/LearningMaterialService";
import UserService from "../../services/UserService";
import LearningMaterialCatService from "../../services/LearningMaterialCategoryService";

export default function LearningMaterialForm() {
  const params = useParams();
  const router = useNavigate();
  const learningMatServ = new LearningMatService();
  const userServ = new UserService();
  const categoryServ = new LearningMaterialCatService();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedBanner, setSelectedBanner] = useState();
  const [userList, setUserList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [value, setValue] = useState({
    title: "",
    desc: "",
    cover_image: "",
    banner_image: "",
    createdBy: "",
    categoryId: "",
  });
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const bannerChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedBanner(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (params?.id) {
      getSingleLearningMaterialData();
    }
    getUserList();
    getCategoryList();
  }, []);
  async function getUserList() {
    try {
      let activity = {
        filter: {},
      };
      const response = await userServ.userList(activity);
      if (response.data) {
        setUserList(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getCategoryList() {
    try {
      let activity = {
        filter: {},
      };
      const response = await categoryServ.listAllCategory(activity);
      if (response.data) {
        setCategoryList(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const getSingleLearningMaterialData = async () => {
    try {
      let response = await learningMatServ.getDetails(params?.id);
      if (response) {
        response.data.createdBy = response.data.createdBy?._id
        setValue(response.data);
        setSelectedImage(response.data.cover_image);
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
    desc: Yup.string().required("Description is Required"),
    createdBy: Yup.string().required("Author is Required"),
    banner_image: Yup.string().required("banner image is Required"),
    cover_image: Yup.string().required("cover image is Required"),
    createdBy: Yup.string().required("Required"),
    categoryId: Yup.string().required("Required"),
  });

  const onSubmit = async (formValues) => {
    let values = { ...formValues };
    try {
      if (values._id !== undefined && values._id !== "") {
        const formData = new FormData();
        formData.append("_id", values._id);
        formData.append("title", values.title);
        formData.append("desc", values.desc);
        formData.append("createdBy", values.createdBy);
        formData.append("categoryId", values.categoryId);
        formData.append("cover_image", values.cover_image);
        formData.append("banner_image", values.banner_image);
        const token = window.user ? window.user.token : "no-token";
        const config = {
          headers: {
            content: "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        axios
          .put(process.env.REACT_APP_API_BASEURL + "/learningmaterial", formData, config)
          .then(async (response) => {
            if (response.data) {
              toast.success("Learning Material updated successfully");
              window.scroll(0, 0);
            }
          });
      } else {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("desc", values.desc);;
        formData.append("createdBy", values.createdBy);
        formData.append("categoryId", values.categoryId);
        formData.append("cover_image", values.cover_image);
        formData.append("banner_image", values.banner_image);
        const token = window.user ? window.user.token : "no-token";
        const config = {
          headers: {
            content: "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        axios
          .post(process.env.REACT_APP_API_BASEURL + "/learningmaterial", formData, config)
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
    <div className="ljSectionData w-100 clearfix" id="ljSectionData">
      <div className="custom_link">
        <div className="users_bottom_part">
          <div className="total_updates_top ActiveLinks">
            <div className="custom-link_backbtn">
              <Link to="/learning_material">
                <img
                  src="/assets/images/icons/leftarrow.svg"
                  alt="arrow"
                  className="ml-2"
                  style={{ paddingLeft: "8px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">Add Learning Material</h5>
            </div>
            <div className="d-flex active_link_customs">
              <p className="m-0 pt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
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
                    <div className="col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="bannerimg">Author</label>{" "}
                        <span className="star">*</span>
                        <div class="input-group">
                          <select
                            className="form-control"
                            name="createdBy"
                            onChange={formik.handleChange}
                            value={formik.values.createdBy}
                          >
                            <option>Select Author</option>
                            {userList &&
                              userList.map((user, idx) => {
                                return (
                                  <option value={user._id} key={idx} selected={user._id === formik.values.createdBy ? true : false}>
                                    {user.user_name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        {formik.touched.createdBy && formik.errors.createdBy ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.createdBy}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4">
                      <div className="form-group">
                        <label htmlFor="bannerimg">Category</label>{" "}
                        <span className="star">*</span>
                        <div class="input-group">
                          <select
                            className="form-control"
                            name="categoryId"
                            onChange={formik.handleChange}
                            value={formik.values.categoryId}
                          >
                            <option>Select Category</option>
                            {categoryList &&
                              categoryList.map((cat, idx) => {
                                return (
                                  <option value={cat._id} key={idx} selected={cat._id === formik.values.categoryId ? true : false}>
                                    {cat.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        {formik.touched.createdBy && formik.errors.createdBy ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.createdBy}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 p-3">
                      <div className="form-group m-0">
                        <label htmlFor="for">Description</label>{" "}
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
                          value={formik.values.desc}
                          onEditorChange={(e) =>
                            formik.handleChange({
                              target: { name: "desc", value: e },
                            })
                          }
                        />
                        {formik.touched.desc &&
                          formik.errors.desc ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.desc}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 p-3">
                      <label htmlFor="for">Cover Image</label>{" "}
                      <span className="star">*</span>
                      <div className="box">
                        {params.id && typeof selectedImage == "string" ? (
                          <img
                            src={selectedImage}
                            alt="default"
                            className="img-fulid"
                          />
                        ) : selectedImage ? (
                          <img
                            src={URL.createObjectURL(selectedImage)}
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
                              id="cover_image"
                              name="cover_image"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "cover_image",
                                  event.currentTarget.files[0]
                                ),
                                  imageChange(event);
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
                          {formik.touched.cover_image &&
                            formik.errors.cover_image ? (
                            <div className="formik-errors bg-error">
                              {formik.errors.cover_image}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 p-3">
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
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
