import React, { useState } from "react";

function TagsInput({tags, callBackTags}) {
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
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

  return (
    <div>
      {tags.map((tag, i) => {
        return (
          <>
            <a
              key={i}
              className="btn customButton learnBtn"
              style={{ margin: "5px 0" }}
              onClick={() => handleDelete(i)}
            >
              <span>{tag}</span>
              <img src="assets/images/icons/Group_3496.svg" class="img-fluid" />
            </a>
          </>
        );
      })}

      <input type="text" onKeyDown={handleKeyDown} onKeyPress={() => e.preventDefault()}/>
    </div>
  );
}

export default TagsInput;
