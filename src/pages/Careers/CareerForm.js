import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import CareerService from "../../services/CareerService";

export default function NewsletterForm() {
  const params = useParams();
  const router = useNavigate();
  const careerServ = new CareerService();
  const [value, setValue] = useState({
    _id: "",
    role: "",
    location: "",
    availability: "",
    posted_by: window.user.data._id,
  });

  useEffect(() => {
    if (params?.id) {
      getCareerDetail(params?.id);
    }
  }, []);

  const getCareerDetail = async (id) => {
    try {
      let response = await careerServ.getDetails(id);
      if (response) {
        setValue({
          _id: id,
          role: response.data.role,
          location: response.data.location,
          availability: response.data.availability,
          posted_by: response.data.posted_by,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object({
    role: Yup.string().required("role is a required field"),
    location: Yup.string().required("Location is a required field "),
    availability: Yup.string().required("Description a required field"),
  });

  const onSubmit = async (values) => {
    let obj = { ...values };

    try {
      let response;
      if (obj._id) {
        response = await careerServ.updateRecord(obj);
      } else {
        delete obj._id;
        response = await careerServ.addrecord(obj);
      }
      if (response.err) {
        toast.error(res.err);
      } else {
        router("/careers");
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
              <Link to="/careers">
                <img
                  src="/assets/images/icons/leftarrow.svg"
                  alt="arrow"
                  className="ml-2"
                  style={{ paddingLeft: "8px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">Add an opening</h5>
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
                    <div className="col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="for">Role Title</label>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter the role title here"
                          name="role"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.role}
                        />
                        {formik.touched.role && formik.errors.role ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.role}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group m-0">
                        <label htmlFor="location">Location</label>
                        <select
                          name="location"
                          className="form-select"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.location}
                        >
                          <option>Select a Location</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Bengalore">Bengalore</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Chennai">Chennai</option>
                          <option value="Remote">Remote</option>
                        </select>
                        {formik.touched.location && formik.errors.location ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.location}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="form-group m-0">
                        <label htmlFor="availability">Availability</label>
                        <select
                          name="availability"
                          className="form-select"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.availability}
                        >
                          <option>Select the availability</option>
                          <option value="Full time">Full time</option>
                          <option value="Part Time">Part Time</option>
                          <option value="Remote Full Time">
                            Remote Full Time
                          </option>
                          <option value="Remote Part Time">
                            Remote Part Time
                          </option>
                        </select>
                        {formik.touched.availability &&
                        formik.errors.availability ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.availability}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-4 col-12"></div>
                  </div>
                  <div className="col-12 p-4 custom-submitbtn">
                    <button type="submit" className="btn btnForm">
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
