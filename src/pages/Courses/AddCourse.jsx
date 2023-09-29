import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CourseService from "../../services/CourseService";
import UserService from "../../services/UserService";
import CategoryService from "../../services/CategoryService";

export default function AddCourse({ course, setCourse, changeStep }) {
  const params = useParams();
  const router = useNavigate();
  const courseServ = new CourseService();
  const userServ = new UserService();
  const categoryServ = new CategoryService();

  const [userList, setUserList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedBanner, setSelectedBanner] = useState();
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

  const ValidateSchema = Yup.object().shape({
    course_name: Yup.string().required("Required"),
    // watch_time: Yup.string().required("Required"),
    createdBy: Yup.string().required("Required"),
    // topic: Yup.string().required("Required"),
    cover_image: Yup.string().required("Required"),
    banner_image: Yup.string().required("Required"),
    level: Yup.string().required("Required"),
    categoryId: Yup.string().required("Category is Required")
  });

  useEffect(() => {
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

  useEffect(() => {
    if (params?.id) {
      onLoadCourseData();
    }
  }, []);
  const onLoadCourseData = async () => {
    try {
      let response = await courseServ.getCourse(params?.id);
      if (response.data) {
        response.data.createdBy = response.data.createdBy._id
        setCourse(response.data);
        setSelectedImage(response.data.cover_image);
        setSelectedBanner(response.data.banner_image);
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const onSubmit = async (formValues) => {
    let values = { ...formValues };
    try {
      if (values._id !== undefined && values._id !== "") {
        const formData = new FormData();
        formData.append("_id", values._id);
        formData.append("course_name", values.course_name);
        formData.append("course_desc", values.course_desc);
        formData.append("createdBy", values.createdBy);
        formData.append("cover_image", values.cover_image);
        formData.append("banner_image", values.banner_image);
        formData.append("categoryId", values.categoryId);
        formData.append("watch_time", parseInt(values.watch_time));
        formData.append("level", values.level);
        formData.append(
          "users_enrolled",
          JSON.stringify(values.users_enrolled)
        );
        const token = window.user ? window.user.token : "no-token";
        const config = {
          headers: {
            content: "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        axios
          .put(process.env.REACT_APP_API_BASEURL + "/course", formData, config)
          .then(async (response) => {
            if (response.data) {
              toast.success("Course updated successfully");
              window.scroll(0, 0);
              setCourse(response.data.result.data)
              setTimeout(() => {
                changeStep(2)
              }, 1500);
            }
          });
      } else {
        const formData = new FormData();
        formData.append("course_name", values.course_name);
        formData.append("course_desc", values.course_desc);;
        formData.append("createdBy", values.createdBy);
        formData.append("cover_image", values.cover_image);
        formData.append("banner_image", values.banner_image);
        formData.append("categoryId", values.categoryId);
        formData.append("watch_time", parseInt(values.watch_time));
        formData.append("level", values.level);
        formData.append(
          "users_enrolled",
          JSON.stringify(values.users_enrolled)
        );
        const token = window.user ? window.user.token : "no-token";
        const config = {
          headers: {
            content: "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        axios
          .post(process.env.REACT_APP_API_BASEURL + "/course", formData, config)
          .then(async (response) => {
            if (response.data) {
              window.scroll(0, 0);
              setCourse(response.data.data)
              toast.success("Course added successfully");
              setTimeout(() => {
                changeStep(2)
              }, 1000);
            }
          });
      }
    } catch (err) {
      throw err;
    }

  };
  const formik = useFormik({
    initialValues: course,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });
  return (
    <div className="custom_link_form">
      <div className="CreateCustomLink">
        <div className="update_form accountInner p-0 border-0">
          <form onSubmit={formik.handleSubmit}>
            <div
              className="row"
              style={{
                padding: "3px 20px",
              }}
            >
              <div className="col-md-4">
                <div className="form-group m-0">
                  <label htmlFor="for">Course Title</label>{" "}
                  <span className="star">*</span>
                  <input
                    type="text"
                    className="form-control m-0"
                    placeholder="Enter a title for this course"
                    name="course_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.course_name}
                  />
                  {formik.touched.course_name &&
                    formik.errors.course_name ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.course_name}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="bannerimg">Course Author</label>{" "}
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
              <div className="col-sm-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="bannerimg">Course Level</label>{" "}
                  <span className="star">*</span>
                  <div class="input-group">
                    <select
                      className="form-control"
                      name="level"
                      onChange={formik.handleChange}
                      value={formik.values.level}
                    >
                      <option>Select Level</option>

                      <option value="Easy" selected={"Easy" === formik.values.level ? true : false}>
                        Easy
                      </option>
                      <option value="Medium" selected={"Medium" === formik.values.level ? true : false}>
                        Medium
                      </option>
                      <option value="Hard" selected={"Hard" === formik.values.level ? true : false}>
                        Hard
                      </option>
                    </select>
                  </div>
                  {formik.touched.level && formik.errors.level ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.level}
                    </div>
                  ) : null}
                </div>
              </div>


              <div className="col-12 p-3">
                <div className="form-group m-0">
                  <label htmlFor="for">Course Intro/Description</label>{" "}
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
                    value={formik.values.course_desc}
                    onEditorChange={(e) =>
                      formik.handleChange({
                        target: { name: "course_desc", value: e },
                      })
                    }
                  />
                  {formik.touched.course_desc &&
                    formik.errors.course_desc ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.course_desc}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6 col-md-4 p-3">
                <div className="form-group">
                  <label htmlFor="bannerimg">Course Category</label>{" "}
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
                        categoryList.map((item, idx) => {
                          return (
                            <option value={item._id} key={idx} selected={item._id === formik.values.category ? true : false}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  {formik.touched.categoryId && formik.errors.categoryId ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.categoryId}
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
                Save &amp; Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
