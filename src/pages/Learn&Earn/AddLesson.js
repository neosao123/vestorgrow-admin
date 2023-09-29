import React from "react";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

function AddLesson({ lesnIdx, formik }) {
  const imaeOneInputRef = React.useRef();
  const imaeTwoInputRef = React.useRef();
  return (
    <>
      <div className="col-md-12 col-12">
        <div className="form-group">
          <label htmlFor="questionfirst" className="form-label">
            Lesson Name <span className="star">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="lesson"
            placeholder="Enter a lesson"
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
          Description <span className="star">*</span>
        </label>
        <textarea
          type="text"
          className="form-control"
          id="desc"
          placeholder="Enter article"
          name={"lessons[" + lesnIdx + "].desc"}
          rows="10"
          value={formik.values.lessons[lesnIdx].desc}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.lessons &&
        formik.errors.lessons[lesnIdx] &&
        formik.errors.lessons[lesnIdx].desc ? (
          <div className="formik-errors bg-error">
            {formik.errors.lessons[lesnIdx].desc}
          </div>
        ) : null}
      </div>

      {/* <div className="col-md-12 col-12">
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="description">
                Description <span className="star">*</span>
              </label>
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
                }}
                name={"lessons[" + lesnIdx + "].desc"}
                value={formik.values.lessons[lesnIdx].desc}
                onEditorChange={(e) =>
                  formik.handleChange({
                    target: { name: "desc", value: e },
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
            </div>
          </div>
        </div>
      </div> */}
      <div className="col-12 col-md-6">
        <div className="form-group">
          <label htmlFor="profilepic">
            File 1 <span className="star">*</span>
          </label>

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
                    src="assets/images/icons/upload-to-cloud.svg"
                    alt="upload-to-cloud"
                    className="img-fluid"
                  />
                </Link>
              </span>
            </div>
            {formik.errors.lessons &&
            formik.errors.lessons[lesnIdx] &&
            formik.errors.lessons[lesnIdx].file_one ? (
              <div className="formik-errors bg-error">
                {formik.errors.lessons[lesnIdx].file_one}
              </div>
            ) : null}
            {formik.values.lessons[lesnIdx].file_one && (
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
      <div className="col-12 col-md-6">
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
                    src="assets/images/icons/upload-to-cloud.svg"
                    alt="upload-to-cloud"
                    className="img-fluid"
                  />
                </Link>
              </span>
            </div>
            {formik.errors.lessons &&
            formik.errors.lessons[lesnIdx] &&
            formik.errors.lessons[lesnIdx].file_two ? (
              <div className="formik-errors bg-error">
                {formik.errors.lessons[lesnIdx].file_two}
              </div>
            ) : null}
            {formik.values.lessons[lesnIdx].file_two && (
              <div className="h-80 w-100">
                <img
                  src={formik.values.lessons[lesnIdx].file_two}
                  className="h-80"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddLesson;
