import React, { useState, useEffect } from "react";
import CreatableSelect from 'react-select/creatable';

function TagsInput({ tags, callBackTags, formik, prevTags, defualtTag }) {
  const [tagValue, setTagValue] = useState(null)
  const handleKeyDown = (e) => {
    // if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    callBackTags([...tags, value]);
    e.target.value = "";
  };

  const handleDelete = (i) => {
    let newTags = [...tags];
    newTags.splice(i, 1);
    callBackTags(newTags);
  };
  const handleChange = e => {
    setTagValue(e)
    let tempTag = []
    e.map(i => {
      tempTag.push(i.value)
    })
    callBackTags([...tempTag]);
  }
  // const colourStyles = {
  //   option: (base, state) => ({
  //     ...base,
  //     backgroundColor: state.isSelected ? { white } : { green },
  //   })
  // }
  return (
    <div className="form-group">
      <CreatableSelect
        // onKeyDown={handleKeyDown}
        // onKeyPress={() => e.preventDefault()}
        onChange={handleChange}
        isMulti
        name="colors"
        options={prevTags}
        value={tagValue ? tagValue : defualtTag}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select the tags for this course"
      // styles={colourStyles}
      />
      {/* <input
        type="text"
        placeholder="Enter the tags for this course"
        className="form-control mb-3"
        onKeyDown={handleKeyDown}
        onKeyPress={() => e.preventDefault()}
      /> */}
      {/* {formik.errors.tags ? (
          <div className="formik-errors bg-error">
            {formik.errors.tags}
          </div>
        ) : null} */}
      {/* {tags.map((tag, i) => {
        return (
          <>
            <a
              key={i}
              className="tag_custom m-1"
              onClick={() => handleDelete(i)}
            >
              <span className="mt-4">{tag}</span>
              <img
                src="/assets/images/icons/Group_3496.svg"
                class="img-fluid"
              />
            </a>
          </>
        );
      })} */}
    </div>
  );
}

export default TagsInput;
