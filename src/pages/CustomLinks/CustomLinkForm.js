import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import CustomLinkService from "../../services/CustomLinkService";
import Pagination from "react-bootstrap/Pagination";
import UserService from "../../services/UserService";

export default function CustomLinkForm() {
  const params = useParams();
  const router = useNavigate();
  const customServe = new CustomLinkService();
  const [userList, setUserList] = useState([]);
  const [value, setValue] = useState({
    for: "",
    duration: "",
    createdBy: "",
    purpose: "",
  });
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });

  useEffect(() => {
    userListApi();
    if (params?.id) {
      getActiveLinkData();
    }
  }, []);

  const getActiveLinkData = async () => {
    try {
      let response = await customServe.getCustomLinkDetails(params?.id);
      if (response) {
        setValue({
          for: response.data.for,
          duration: response.data.duration,
          _id: response.data._id,
          createdBy: response.data.createdBy,
          purpose: response.data.purpose,
          clicks: response.data.clicks,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object().shape({
    for: Yup.string().required("Required"),
    duration: Yup.string().required("Required"),
    createdBy: Yup.string().required("Required"),
    purpose: Yup.string().required("Required"),
  });

  const onSubmit = (values, { resetForm }) => {
    let obj = {
      for: values.for,
      duration: values.duration,
      createdBy: values.createdBy,
      purpose: values.purpose,
      link: `https://mavefi-api.ritzyware.net/${uuidv4()}`,
    };

    if (values._id) {
      customServe.editCustomLinkRecord(values).then((res) => {
        setValue({
          _id: "",
          for: "",
          createdBy: "",
          duration: "",
          clicks: "",
          purpose: "",
        });
        resetForm();

        if (res.err) {
          toast.error(res.err);
        } else {
          router("/custom_link");
        }
      });
    } else {
      delete values._id;
      customServe.addCustomLinkRecord(obj).then((res) => {
        toast.success("Record added successfully.");
        if (res.err) {
          toast.error(res.err);
        } else {
          router("/custom_link");
        }
      });
    }
  };

  let userServe = new UserService();
  // const userListApi = async () => {
  //   let activity = {}
  //   try {
  //     let userList = await userServe.userListApi(activity)
  //     if (userList) {
  //       setUserList(userList.data)
  //     }
  //   } catch (err) { throw err }
  // }

  async function userListApi() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: { searchText: search.searchTxt },
    };

    try {
      let response = await userServe.userListApi(activity);
      if (response) {
        setUserList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

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
              <Link to="/custom_link">
                <img
                  src="/assets/images/icons/leftarrow.svg"
                  alt="arrow"
                  className="ml-2"
                  style={{ paddingLeft: "8px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">Create a Link</h5>
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
                    <div className="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 ml-2 mr-2">
                      <div className="form-group m-0">
                        <label htmlFor="title">
                          For <span>*</span>
                        </label>
                        <input
                          type="text"
                          name="for"
                          className="form-control m-0"
                          placeholder="Enter a name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.for}
                        />
                        {formik.touched.for && formik.errors.for ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.for}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <div className="form-group m-0">
                        <label htmlFor="duration">
                          Duration <span>*</span>
                        </label>
                        <select
                          name="duration"
                          className="form-select"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.duration}
                        >
                          <option>Select a duration for this link</option>
                          <option value="1">1 day</option>
                          <option value="7">7 days</option>
                          <option value="30">30 days</option>
                          <option value="365"> 365 days</option>
                        </select>
                        {formik.touched.duration && formik.errors.duration ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.duration}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <div className="form-group m-0">
                        <label htmlFor="for">
                          Created By <span>*</span>
                        </label>

                        <select
                          className="form-select"
                          name="createdBy"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.createdBy}
                        >
                          <option>Select an user</option>
                          {userList.map((v, i) => {
                            return (
                              <>
                                <option value={v._id} key={i}>
                                  {v.full_name}
                                </option>
                              </>
                            );
                          })}
                        </select>
                        {formik.touched.createdBy && formik.errors.createdBy ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.createdBy}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 p-3">
                      <div className="form-group m-0">
                        <label htmlFor="for">
                          Purpose <span>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter why is the custom link being created"
                          name="purpose"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.purpose}
                        />
                        {formik.touched.purpose && formik.errors.purpose ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.for}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 p-4 custom-submitbtn">
                    <button type="submit" className="btn btnForm ">
                      Generate custom link
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
