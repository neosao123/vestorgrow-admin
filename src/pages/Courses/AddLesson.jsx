import React from "react";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const AddLesson = ({ lesnIdx, formik }) => {
  const imaeOneInputRef = React.useRef();
  const imaeTwoInputRef = React.useRef();
  const getFileName = (filename) => {
    if (filename.name) {
      return
    } else {
      let fileExt = filename.split(".").pop();
      return fileExt;
    }
  };
  return (
    <>
      <div className="col-md-12 col-12">
        <div className="form-group mb-3">
          <label htmlFor="questionfirst" className="form-label">
            Topic Heading <span className="star">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="lesson"
            placeholder="Enter a heading for this lesson"
            name={"lessons[" + lesnIdx + "].lesson"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lessons[lesnIdx].lesson}
          />
          {formik.errors.lessons &&
            formik.errors.lessons[lesnIdx] &&
            formik.errors.lessons[lesnIdx].lesson ? (
            <div className="formik-errors bg-error">
              {formik.errors.lessons[lesnIdx].lesson}
            </div>
          ) : null}
        </div>
      </div>
      <div className="form-group mb-0">
        <label htmlFor="article" className="form-label">
          Lesson Body <span className="star">*</span>
        </label>
        {/* <textarea
          type="text"
          className="form-control"
          id="desc"
          placeholder="Enter the body content for this lesson"
          name={"lessons[" + lesnIdx + "].desc"}
          rows="10"
          value={formik.values.lessons[lesnIdx].desc}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        /> */}


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
          value={formik.values.lessons[lesnIdx].desc}
          onEditorChange={(e) =>
            formik.handleChange({
              target: { name: "lessons[" + lesnIdx + "].desc", value: e },
            })
          }
        />
        {formik.errors.lessons &&
          formik.errors.lessons[lesnIdx] &&
          formik.errors.lessons[lesnIdx].desc ? (
          <div className="formik-errors bg-error">
            {formik.errors.lessons[lesnIdx].desc}
          </div>
        ) : null}

        {/* <div className="row">
          <div className="col-12 col-md-6 mt-3">
            <div className="form-group">
              <label htmlFor="profilepic">File 1</label>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Upload Profile Picture (Size - 500x500px)"
                  id="profilepic"
                  name="profile_picture"
                  ref={imaeOneInputRef}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "lessons[" + lesnIdx + "].file_one",
                      event.currentTarget.files[0]
                    );
                  }}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <Link to="#">
                      <img
                        src="/assets/images/icons/upload-to-cloud.svg"
                        alt="upload-to-cloud"
                        className="img-fluid"
                      />
                    </Link>
                  </span>
                </div>

                {getFileName(formik.values.lessons[lesnIdx].file_one) ===
                  "mp4" ? (
                  <div className="h-80 w-100">
                    <video className="h-80" controls>
                      <source src={formik.values.lessons[lesnIdx].file_one} />
                    </video>
                  </div>
                ) : (
                  <div className="h-80 w-100">
                    <img
                      src={formik.values.lessons[lesnIdx].file_one}
                      className="h-80"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mt-3">
            <div className="form-group">
              <label htmlFor="profilepic">
                File 2 <span className="star">*</span> 
              </label>

              <div className="input-group">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Upload Profile Picture (Size - 500x500px)"
                  id="file_two"
                  name="file_two"
                  ref={imaeTwoInputRef}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "lessons[" + lesnIdx + "].file_two",
                      event.currentTarget.files[0]
                    );
                  }}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <Link to="#">
                      <img
                        src="/assets/images/icons/upload-to-cloud.svg"
                        alt="upload-to-cloud"
                        className="img-fluid"
                      />
                    </Link>
                  </span>
                </div>
                {formik.values.lessons[lesnIdx].file_two && (
                  <div className="h-80 w-100">
                    {getFileName(formik.values.lessons[lesnIdx].file_two) ===
                      "mp4" ? (
                      <video className="h-80" controls>
                        <source src={formik.values.lessons[lesnIdx].file_two} />
                      </video>
                    ) : (
                      <img
                        src={formik.values.lessons[lesnIdx].file_two}
                        className="h-80"
                      />
                    )}
                  </div>
                )}
              </div>
              {/* {formik.errors.lessons &&
                formik.errors.lessons[lesnIdx] &&
                formik.errors.lessons[lesnIdx].file_two ? (
                  <div className="formik-errors bg-error">
                    {formik.errors.lessons[lesnIdx].file_two}
                  </div>
                ) : null} */}
        {/* </div>
          </div>
        </div> */}

        <div className="col-12 mt-4 pt-3 custom-submitbtn">
          <button type="submit" className="btn btnForm ">
            Save &amp; Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default AddLesson;
