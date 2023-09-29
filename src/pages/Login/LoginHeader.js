import React from "react";
import { Link } from "react-router-dom";

export default function LoginHeader() {
  return (
    <header className="w-100 topHeaderSection LoginHeader">
      <div className="topHeaderInner d-flex align-items-center w-100">
        <div className="logoColumn d-lg-flex d-none p-0">
          <Link to="#" className="d-block">
            <img src="/assets/images/logo.svg" alt="logo" className="img-fluid" />
          </Link>
        </div>
        <div className="logoColumn d-flex d-lg-none p-0">
          <Link to="#" className="d-block">
            <img src="/assets/images/m-logo.svg" alt="logo" className="img-fluid" />
          </Link>
        </div>
        <div className="headerMenu ms-auto headerBtnSec ">
          <div className="modeBtn">
            <Link to="#" className="d-inline-block">
              <img
                src="/assets/images/icons/mode.svg"
                alt="mode"
                className="img-fluid"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
