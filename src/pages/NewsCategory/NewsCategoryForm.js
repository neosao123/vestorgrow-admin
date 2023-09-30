import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import NewsCategoryService from "../../services/NewsCategoryService";

export default function NewsCategoryForm() {
    const params = useParams();
    const router = useNavigate();
    const categoryServ = new NewsCategoryService();
    const [value, setValue] = useState({
        name: "",
    });

    useEffect(() => {
        if (params?.id) {
            getSingleCategoryData();
        }
    }, []);

    const getSingleCategoryData = async () => {
        try {
            let response = await categoryServ.getCategoryDetails(params?.id);
            if (response) {
                setValue({
                    _id: response.data._id,
                    name: response.data.name,
                });
            } else {
                toast.error(response?.error);
            }
        } catch (err) {
            throw err;
        }
    };

    const ValidateSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
    });

    const onSubmit = (values, { resetForm }) => {
        let obj = {
            name: values.name,
        };

        if (values._id) {
            categoryServ.editCategoryRecord(values).then((res) => {
                if (res.err) {
                    toast.error(res.err);
                }
                else {
                    router("/newscategory");
                }
            });
        } else {
            categoryServ.addCategoryRecord(obj).then((res) => {
                if (res.err) {
                    toast.error(res.err);
                }
                else if (res.message) {
                    toast.info(res.message);
                }
                else {
                    router("/newscategory");
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
        <div className="ljSectionData w-100 clearfix" id="ljSectionData">
            <div className="custom_link">
                <div className="users_bottom_part">
                    <div className="total_updates_top ActiveLinks">
                        <div className="custom-link_backbtn">
                            <Link to="/newscategory">
                                <img
                                    src="/assets/images/icons/leftarrow.svg"
                                    alt="arrow"
                                    className="ml-2"
                                    style={{ paddingLeft: "8px" }}
                                />
                            </Link>
                        </div>
                        <div className="walletAddressHead accountChangeHead ">
                            <h5 className="m-0">Add a News Category</h5>
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
                                        <div className="col-12 ">
                                            <div className="form-group m-0">
                                                <label htmlFor="for">Name</label>
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
                                                    <div className="formik-errors bg-error">
                                                        {formik.errors.name}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-4 custom-submitbtn">
                                        <button type="submit" className="btn btnForm ">
                                            Submit
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
