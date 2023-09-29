import React from "react";

function AddQuestions({ queIdx, formik }) {
  const optionsLabel = [
    "Answer Option 1",
    "Answer Option 2",
    "Answer Option 3",
    "Answer Option 4",
  ];

  return (
    <>
      <div className="col-12">
        <div className="form-group">
          <label htmlFor="questionfirst" className="form-label">
            Question No. {queIdx + 1} <span className="star">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="question"
            placeholder="Enter a question"
            name={"questions[" + queIdx + "].question"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.questions[queIdx].question}
          />
          {formik.errors.questions &&
          formik.errors.questions[queIdx] &&
          formik.errors.questions[queIdx].question ? (
            <div className="formik-errors bg-error">
              {formik.errors.questions[queIdx].question}
            </div>
          ) : null}
        </div>
      </div>

      {["a", "b", "c", "d"].map((opt, idx) => {
        return (
          <div key={idx} className="col-sm-6 col-12">
            <div className="form-group">
              <label htmlFor="answerfirst" className="form-label">
                {optionsLabel[idx]} <span className="star">*</span>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Enter answer option ${idx + 1}`}
                  name={`questions[${queIdx}].option[${idx}]`}
                  value={formik.values.questions[queIdx].option[idx]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="input-group-text">
                  <input
                    type="checkbox"
                    value="1"
                    checked={
                      formik.values.questions[queIdx].correct_answers[idx] ===
                      true
                        ? true
                        : false
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name={`questions[${queIdx}].correct_answers[${idx}]`}
                  />
                </div>
              </div>
              {formik.errors.questions &&
              formik.errors.questions[queIdx] &&
              formik.errors.questions[queIdx].option &&
              formik.errors.questions[queIdx].option[idx] ? (
                <div className="formik-errors bg-error">
                  {formik.errors.questions[queIdx].option[idx]}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AddQuestions;
