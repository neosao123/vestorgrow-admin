import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import FaqService from "../../services/FaqService";

export default function UpdateForm() {
  const params = useParams();
  const router = useNavigate();
  const faqServ = new FaqService();
  const [value, setValue] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    if (params?.id) {
      getFaqDetail(params.id);
    }
  }, []);

  const getFaqDetail = async (id) => {
    try {
      let response = await faqServ.getDetails(id);
      if (response) {
        setValue({
          _id: response.data._id,
          question: response.data.question,
          answer: response.data.answer,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object().shape({
    question: Yup.string().required("Required"),
    answer: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    let obj = {
      question: values.question,
      answer: values.answer,
    };

    if (values._id) {
      faqServ.editRecord(values).then((res) => {
        if (res.err) {
          toast.error(res.err);
        } else {
          router("/faq");
        }
      });
    } else {
      delete values._id;
      faqServ.addRecord(obj).then((res) => {
        if (res.err) {
          toast.error(res.err);
        } else {
          router("/faq");
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
              <Link to="/faq">
                <img
                  src="/assets/images/icons/leftarrow.svg"
                  alt="arrow"
                  className="ml-2"
                  style={{ paddingLeft: "8px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">Add a faq</h5>
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
                    <div className="col-12 ">
                      <div className="form-group m-0">
                        <label htmlFor="for">Question</label>
                        <input
                          type="text"
                          className="form-control m-0"
                          placeholder="Enter the question here"
                          name="question"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.question}
                        />
                        {formik.touched.question && formik.errors.question ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.question}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 p-3">
                      <div className="form-group m-0">
                        <label htmlFor="for">Answer</label>
                        <textarea
                          className="form-control m-0"
                          name="answer"
                          placeholder="Enter the answer here"
                          value={formik.values.answer}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {/* <Editor
                          className="form-control m-0"
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
                          }}
                          value={formik.values.answer}
                          onEditorChange={(e) =>
                            formik.handleChange({ target: { name: "answer", value: e } })
                          }
                        /> */}

                        {formik.touched.answer && formik.errors.answer ? (
                          <div className="formik-errors bg-error">
                            {formik.errors.answer}
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
