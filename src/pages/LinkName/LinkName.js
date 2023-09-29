import React from "react";
import { Link } from "react-router-dom";

export default function LinkName({ heading, image, span, link, span2, link2 }) {
  return (
    <div className="d-flex ljSectionDatacustomlink">
      <div className="users_heading d-flex">
        <img src={image} alt="logo" className="img-fluid sidebar-img" />
        <h4>{heading}</h4>
      </div>

      <div className="linkbtn_main">
        {span2 && (
          <button className="draft_btn">
            <Link to={link2}>
              <img src="/assets/images/icons/draft.svg" alt="plus" />
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "13px",
                  color: "#666CFF",
                  paddingLeft: "5px",
                }}
              >
                {span2}
              </span>
            </Link>
          </button>
        )}
        {span && (
          <button className="custon_linkbtn">
            <Link to={link}>
              <img src="/assets/images/icons/plus.svg" alt="plus" />
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "13px",
                  color: "#FFFFFF",
                  paddingLeft: "5px",
                }}
              >
                {span}
              </span>
            </Link>
          </button>
        )}
      </div>
    </div>
  );
}
