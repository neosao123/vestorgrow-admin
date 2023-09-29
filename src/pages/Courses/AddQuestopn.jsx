import React from 'react'

const AddQuestopn = ({ queIdx, formik }) => {
  const optionsLabel = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ];
  return (
    <div className='courseQustionMain'>
      <div className="col-12 mb-3">
        <div className="form-group">
          <label htmlFor="questionfirst" className="form-label questionfirstlabel">
            Question <span className="star">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="question"
            placeholder="Enter a question for this lesson"
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
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // height: "14vh",
          }}>
            <div className="col-md-2" style={{ width: "5%" }}>
              <label className="form-label"></label>
              <div
                className=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <input
                  type="checkbox"
                  value="1"
                  checked={
                    formik.values.questions[queIdx].correct_answers[idx] ===
                      true
                      ? true
                      : false
                  }
                  onChange={() => {
                    formik.values.questions[queIdx].correct_answers.map((item, i) => {
                      formik.setFieldValue(`questions[${queIdx}].correct_answers[${i}]`, false)
                    })
                    formik.setFieldValue(`questions[${queIdx}].correct_answers[${idx}]`, true)
                  }}
                  onBlur={formik.handleBlur}
                  name={`questions[${queIdx}].correct_answers[${idx}]`}
                />
              </div>
            </div>
            <div key={idx} className="col-sm-10 col-12" style={{ width: "95%" }}>
              <div className="form-group">
                <label htmlFor="answerfirst" className="form-label">
                  {optionsLabel[idx]} <span className="star">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a choise for the above question"
                    name={`questions[${queIdx}].option[${idx}]`}
                    value={formik.values.questions[queIdx].option[idx]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
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
          </div>
        );
      })}

      <div className="col-12 custom-submitbtn">
        <button type="submit" className="btn btnForm " style={{
          background: "rgb(186,189,255)!important",
          border: "1px solid rgba(0, 0, 0, 0.25)"
        }}>
          Save &amp; Review
        </button>
      </div>
    </div>
  );
}

export default AddQuestopn