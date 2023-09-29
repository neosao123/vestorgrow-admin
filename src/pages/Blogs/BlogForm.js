import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import blogService from "../../services/blogService";
import TagService from "../../services/TagService";
import UserService from "../../services/UserService";
import TagsInput from "../Courses/TagsInput";

export default function NewsletterForm() {
  const params = useParams();
  const router = useNavigate();
  const blogServ = new blogService();
  const userServ = new UserService();
  const tagServ = new TagService();
  const [catList, setCatList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [defaultTagList, setDefaultTagList] = useState([]);
  const [value, setValue] = useState({
    blog_title: "",
    author: "",
    category_id: "",
    read_duration: "",
    content: "",
    blog_image: "",
    tags: [],
    hero_image: "",
  });
  const [selectedImage, setSelectedImage] = useState();
  const [selectedHeroImage, setSelectedHeroImage] = useState();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const heroImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedHeroImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    getUserList();
    getCatList();
    getTagList();
    if (params?.id) {
      getBlogDetail(params?.id);
    }
  }, []);

  async function getTagList() {
    try {
      const response = await tagServ.listAll();
      if (response.data) {
        let prTag = [];
        response.data.map((item) => {
          let obj = { value: item.title, label: item.title };
          prTag = [...prTag, obj];
        });
        setTagList(prTag);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getUserList() {
    try {
      let activity = {
        filter: { role: "author" },
      };
      const response = await userServ.userList(activity);
      if (response.data) {
        setUserList(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function getCatList() {
    try {
      let activity = {};
      const response = await blogServ.BlogCatList(activity);
      if (response.data) {
        setCatList(response.data);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  const getBlogDetail = async (id) => {
    try {
      let response = await blogServ.getDetails(id);
      if (response) {
        setValue({
          _id: response.data._id,
          blog_title: response.data.blog_title,
          author: response.data.author,
          category_id: response.data.category_id,
          read_duration: response.data.read_duration,
          content: response.data.content,
          blog_image: response.data.blog_image,
          hero_image: response.data.hero_image,
          tags: response.data.tags,
        });
        let defaultTag = [];
        response.data.tags.forEach((item) => {
          let obj = { value: item, label: item };
          defaultTag = [...defaultTag, obj];
        });
        setDefaultTagList([...defaultTag]);
        setSelectedImage(response.data.blog_image);
        setSelectedHeroImage(response.data.hero_image);
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };
  const callBackTags = (tags) => {
    formik.setFieldValue("tags", tags);
  };
  const ValidateSchema = Yup.object({
    blog_title: Yup.string().required("Title is a required field"),
    author: Yup.string().required("Author is a required field"),
    category_id: Yup.string().required("Category is a required field"),
    read_duration: Yup.string().required("Duration is a required field"),
    content: Yup.string().required("Content is a required field"),
    blog_image: Yup.string().required("Blog image is required field"),
    // blog_image: Yup.mixed().test({
    //   message:
    //     "Please set image resolution to (" +
    //     process.env.REACT_APP_BLOG_IMAGE_WIDTH +
    //     "*" +
    //     process.env.REACT_APP_BLOG_IMAGE_HEIGHT +
    //     ")",
    //   test: function (value) {
    //     return new Promise((resolve, reject) => {
    //       const image = new Image();
    //       let fr = new FileReader();
    //       fr.onload = function () {
    //         if (fr !== null && typeof fr.result == "string") {
    //           image.src = fr.result;
    //         }
    //       };
    //       image.onload = async function () {
    //         const width = image.width;
    //         const height = image.height;
    //         if (
    //           width == parseInt(process.env.REACT_APP_BLOG_IMAGE_WIDTH) &&
    //           height == parseInt(process.env.REACT_APP_BLOG_IMAGE_HEIGHT)
    //         ) {
    //           resolve(true);
    //         } else {
    //           resolve(false);
    //         }
    //       };
    //       fr.readAsDataURL(value);
    //     });
    //   },
    // }),
    hero_image: Yup.string().required("Hero image is required field"),
    // hero_image: Yup.mixed().test({
    //   message: "Please set image resolution to (" + 1660 + "*" + 640 + ")",
    //   test: function (value) {
    //     return new Promise((resolve, reject) => {
    //       const image = new Image();
    //       let fr = new FileReader();
    //       fr.onload = function () {
    //         if (fr !== null && typeof fr.result == "string") {
    //           image.src = fr.result;
    //         }
    //       };
    //       image.onload = async function () {
    //         const width = image.width;
    //         const height = image.height;
    //         if (width == parseInt(1660) && height == parseInt(640)) {
    //           resolve(true);
    //         } else {
    //           resolve(false);
    //         }
    //       };
    //       fr.readAsDataURL(value);
    //     });
    //   },
    // }),
  });

  const onSubmit = async (values, { resetForm }) => {
    let obj = { ...values };

    try {
      let response;
      if (obj._id) {
        const formData = new FormData();
        formData.append("_id", obj._id);
        formData.append("author", obj.author);
        formData.append("blog_title", obj.blog_title);
        formData.append("category_id", obj.category_id);
        formData.append("content", obj.content);
        formData.append("read_duration", obj.read_duration);
        formData.append("blog_image", obj.blog_image);
        formData.append("hero_image", obj.hero_image);
        formData.append("tags", JSON.stringify(obj.tags));
        response = await blogServ.updateRecord(formData);
      } else {
        const formData = new FormData();
        formData.append("author", obj.author);
        formData.append("blog_title", obj.blog_title);
        formData.append("category_id", obj.category_id);
        formData.append("content", obj.content);
        formData.append("read_duration", obj.read_duration);
        formData.append("blog_image", obj.blog_image);
        formData.append("hero_image", obj.hero_image);
        formData.append("tags", JSON.stringify(obj.tags));
        response = await blogServ.addrecord(formData);
      }
      if (response.err) {
        toast.error(res.err);
      } else {
        router("/blogs");
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
              <Link to="/blogs">
                <img
                  src="/assets/images/icons/leftarrow.svg"
                  alt="arrow"
                  className="ml-2"
                  style={{ paddingLeft: "8px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">Create a Blog</h5>
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
                    <div className="col-8 ">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Title</label>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter a title for this blog post"
                          name="blog_title"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.blog_title}
                        />
                        {formik.touched.blog_title &&
                        formik.errors.blog_title ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.blog_title}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group m-0">
                        <label htmlFor="for">Course Tags</label>
                        <TagsInput
                          callBackTags={callBackTags}
                          tags={formik.values.tags}
                          formik={formik}
                          isSearchable
                          prevTags={tagList}
                          defualtTag={defaultTagList}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Author</label>
                        <div class="input-group">
                          <select
                            className="form-control"
                            name="author"
                            onChange={formik.handleChange}
                            value={formik.values.author}
                          >
                            <option>Select Author</option>
                            {userList &&
                              userList.map((user, idx) => {
                                return (
                                  <option value={user._id} key={idx}>
                                    {user.user_name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        {formik.touched.author && formik.errors.author ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.author}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Category</label>
                        <div class="input-group">
                          <select
                            className="form-control"
                            name="category_id"
                            onChange={formik.handleChange}
                            value={formik.values.category_id}
                          >
                            <option>Select Category</option>
                            {catList &&
                              catList.map((cat, idx) => {
                                return (
                                  <option value={cat._id} key={idx}>
                                    {cat.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        {formik.touched.category_id &&
                        formik.errors.category_id ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.category_id}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Read Time</label>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Select Read Time"
                          name="read_duration"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.read_duration}
                        />
                        {formik.touched.read_duration &&
                        formik.errors.read_duration ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.read_duration}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 ">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Content</label>
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
                          value={formik.values.content}
                          onEditorChange={(e) =>
                            formik.handleChange({
                              target: { name: "content", value: e },
                            })
                          }
                        />

                        {formik.touched.content && formik.errors.content ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.content}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 p-3">
                      <label htmlFor="for">Blog Image</label>{" "}
                      <span className="star">*</span>
                      <div className="box">
                        {params.id ? (
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
                              placeholder="Upload Profile Picture (Size - 830x280px)"
                              id="cover_image"
                              name="blog_image"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "blog_image",
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
                          {formik.touched.blog_image &&
                          formik.errors.blog_image ? (
                            <div className="formik-errors bg-error">
                              {formik.errors.blog_image}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 p-3">
                      <label htmlFor="for">Hero Image</label>{" "}
                      <span className="star">*</span>
                      <div className="box">
                        {params.id ? (
                          <img
                            src={selectedHeroImage}
                            alt="default"
                            className="img-fulid"
                          />
                        ) : selectedHeroImage ? (
                          <img
                            src={URL.createObjectURL(selectedHeroImage)}
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
                              placeholder="Upload Profile Picture (Size - 830x280px)"
                              id="hero_image"
                              name="hero_image"
                              onChange={(event) => {
                                formik.setFieldValue(
                                  "hero_image",
                                  event.currentTarget.files[0]
                                ),
                                  heroImageChange(event);
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
                          {formik.touched.hero_image &&
                          formik.errors.hero_image ? (
                            <div className="formik-errors bg-error">
                              {formik.errors.hero_image}
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
