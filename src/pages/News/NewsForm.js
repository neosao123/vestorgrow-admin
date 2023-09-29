import React, { useState, useEffect } from "react";
import moment from "moment"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import WebinarService from "../../services/WebinarService";
import UserService from "../../services/UserService";
import WebinarCategoryService from "../../services/WebinarCategoryService";
import NewsService from "../../services/NewsService";

export default function NewsForm() {
  const params = useParams();
  const router = useNavigate();
  const webinarServ = new WebinarService();
  const categoryServ = new WebinarCategoryService();
  const userServ = new UserService();
  const newsServ = new NewsService();
  const [selectedVideo, setSelectedVideo] = useState();
  const [selectedBanner, setSelectedBanner] = useState();
  const [userList, setUserList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [value, setValue] = useState({
    title: "",
    desc: "",
    createdBy: "",
    type: "",
    link: ""
  });
  // const imageChange = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setSelectedVideo(e.target.files[0]);
  //   }
  // };
  // const bannerChange = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setSelectedBanner(e.target.files[0]);
  //   }
  // };
  useEffect(() => {
    if (params?.id) {
      getSingleNewsData();
    }
    getUserList();
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
  const getSingleNewsData = async () => {
    try {
      let response = await newsServ.getNewsDetails(params?.id);
      if (response) {
        response.data.createdBy = response.data.createdBy?._id
        setValue(response.data);
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    desc: Yup.string(),
    link: Yup.string(),
    createdBy: Yup.string().required("Author is Required"),
    type: Yup.string().required("Type is Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    let obj = {
      title: values.title,
      desc: values.desc,
      createdBy: values.createdBy,
      type: values.type,
    };
    if (values._id) {
      obj._id = values._id
      newsServ.editNewsRecord(values).then((res) => {
        if (res.err) {
          toast.error(res.err);
        } else {
          toast.success("Record updated successfully")
        }
      });
    } else {
      delete values._id;
      newsServ.addNewsRecord(obj).then((res) => {
        if (res.err) {
          toast.error(res.err);
        } else {
          toast.success("Record added successfully")
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
    // <div className="ljSectionData w-100 clearfix" id="ljSectionData">
    <div className="custom_link">
      <div className="users_bottom_part">
        <div className="total_updates_top ActiveLinks">
          <div className="custom-link_backbtn">
            <Link to="/news">
              <img
                src="/assets/images/icons/leftarrow.svg"
                alt="arrow"
                className="ml-2"
                style={{ paddingLeft: "8px" }}
              />
            </Link>
          </div>
          <div className="walletAddressHead accountChangeHead ">
            <h5 className="m-0">Add a News</h5>
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
                  <div className="col-md-3 col-3 ">
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
                  <div className="col-sm-3 col-md-3">
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
                  <div className="col-sm-3 col-md-3">
                    <div className="form-group">
                      <label htmlFor="bannerimg">Type</label>{" "}
                      <span className="star">*</span>
                      <div class="input-group">
                        <select
                          className="form-control"
                          name="type"
                          onChange={formik.handleChange}
                          value={formik.values.type}
                        >
                          <option>Select Type</option>
                          <option value="Link" selected={"Link" === formik.values.type ? true : false}>
                            Link
                          </option>
                          <option value="Content" selected={"Content" === formik.values.type ? true : false}>
                            Content
                          </option>
                        </select>
                      </div>
                      {formik.touched.categoryId && formik.errors.categoryId ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.categoryId}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-3 col-3 ">
                    <div className="form-group m-0">
                      <label htmlFor="for">Link</label>
                      <input
                        type="text"
                        className="form-control m-0"
                        placeholder="Enter the Link"
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
                  <div className="col-12 p-3">
                    <div className="form-group m-0">
                      <label htmlFor="for">Description</label>
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
