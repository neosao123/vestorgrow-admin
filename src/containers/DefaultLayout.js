import React, { useEffect, useContext } from "react";
import Select, { components } from "react-select";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import GlobalContext from "../context/GlobalContext";

function DefaultLayout({ children, handleAuthState }) {
  const sitectx = useContext(GlobalContext);
  const navigate = useNavigate();
  const userServ = new UserService();
  const [isActive, setIsActive] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState(null);
  const [allOptions, setAllOptions] = useState([]);

  const clickHandler = () => {
    setIsActive(!isActive);
  };
  const dropDownHandler = (e) => {
    setIsOpen(!isOpen);
  };
  const logoutHandler = () => {
    window.user = null;
    localStorage.clear();
    handleAuthState(false);
  };

  useEffect(() => {
    getSearchAllData();
  }, []);

  async function getSearchAllData() {
    try {
      let obj = { start: 0, length: 100 };
      let response = await userServ.listAllSearchData(obj);
      let objMap = {
        toupdate: "word",
        course: "course_name",
        toglossary: "word",
        tomint: "name",
        tonewsletter: "name",
        toprofile: "name",
        user: "user_name",
      };

      let allOptions = [];
      if (response.megaResult) {
        for (const [key, value] of Object.entries(response.megaResult)) {
          response.megaResult[key] = value.map((el) => {
            return {
              value: el._id,
              label: el[objMap[key]],
              type: key,
            };
          });
          allOptions.push({ label: key, options: response.megaResult[key] });
        }
        setAllOptions(allOptions);
        // setSearchDataList(response.megaResult);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const handleSearchChange = (e) => {
  //   // window.location.href='publish_mint';
  //   if (e.type === "toglossary") {
  //     sitectx.setSearchDetails(e);
  //     navigate("/publish_glossary");
  //   } else if (e.type === "course") {
  //     sitectx.setSearchDetails(e);
  //     navigate("/course");
  //   }
  // };

  const formatGroupLabel = (data) => (
    <div>
      <span>{data.label}</span>
    </div>
  );

  const accountOpenHandler = () => {
    setAccountOpen(!accountOpen);
  };
  return (
    <main className="w-100 clearfix mainSection d-flex">
      <div
        className="w-100 clearfix leftSection navbar navbar-expand-lg p-0"
        id="collapsibleNavbar"
      >
        <aside className="sidebarSection collapse navbar-collapse">
          <div className="topNav">
            <div className="logoColumn d-lg-flex d-none">
              <Link to="index.html" className="d-flex">
                {/* <img
                  src="/assets/images/icons/Group 4545.png"
                  alt="logo"
                  className="img-fluid"
                /> */}
                <span className="logoColumn-logotext">
                  <span className="admintxt">VestorGrow</span>
                </span>
                {/* <img src="/assets/images/admin_icon/logo-mavefi-admin.svg" alt="logo"
                  className="img-fluid"
                /> */}
              </Link>
            </div>
            <div className="sidebarColumn">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link d-flex" +
                      (selectedNav == "dashboard" ? " active" : "")
                    }
                    to="/home"
                    onClick={() => setSelectedNav("dashboard")}
                  >
                    <svg
                      className="img-fluid sidebar-img"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.5002 1.1333C8.35208 1.13331 8.20985 1.19131 8.10397 1.29489L1.92266 6.35062C1.91552 6.35599 1.90851 6.36152 1.90163 6.36722L1.8806 6.38493V6.38603C1.82376 6.43898 1.77842 6.50305 1.74739 6.57426C1.71635 6.64546 1.70029 6.72229 1.7002 6.79997C1.7002 6.95026 1.7599 7.09439 1.86617 7.20066C1.97244 7.30693 2.11657 7.36663 2.26686 7.36663H2.83353V13.6C2.83353 14.2261 3.3407 14.7333 3.96686 14.7333H13.0335C13.6597 14.7333 14.1669 14.2261 14.1669 13.6V7.36663H14.7335C14.8838 7.36663 15.028 7.30693 15.1342 7.20066C15.2405 7.09439 15.3002 6.95026 15.3002 6.79997C15.3003 6.7221 15.2843 6.64507 15.2532 6.57366C15.2222 6.50225 15.1768 6.438 15.1198 6.38493L15.1109 6.37829C15.0985 6.36702 15.0856 6.35631 15.0722 6.34619L14.1669 5.60576V3.39997C14.1669 3.08717 13.913 2.8333 13.6002 2.8333H13.0335C12.7207 2.8333 12.4669 3.08717 12.4669 3.39997V4.21566L8.88424 1.28493C8.77985 1.18789 8.64272 1.13375 8.5002 1.1333ZM10.2002 8.49997H12.4669V13.0333H10.2002V8.49997Z"
                        fill="#7D8190"
                      />
                    </svg>
                    <div className="sidebar-text">Dashboard</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link d-flex" +
                      (selectedNav == "testimonial" ? " active" : "")
                    }
                    to="/testimonial"
                    onClick={() => setSelectedNav("testimonial")}
                  >
                    <svg
                      className="img-fluid sidebar-img"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37324 2.82886C7.06044 2.82886 6.80658 3.08272 6.80658 3.39552V13.0289H9.63991V3.39552C9.63991 3.08272 9.38604 2.82886 9.07324 2.82886H7.37324ZM0.573242 3.96219V15.2955H14.7399V14.1622H1.70658V3.96219H0.573242ZM11.3399 3.96219C11.0271 3.96219 10.7732 4.21606 10.7732 4.52886V13.0289H13.6066V4.52886C13.6066 4.21606 13.3527 3.96219 13.0399 3.96219H11.3399ZM3.40658 6.22886C3.09378 6.22886 2.83991 6.48272 2.83991 6.79552V13.0289H5.67324V6.79552C5.67324 6.48272 5.41938 6.22886 5.10658 6.22886H3.40658Z"
                        fill="#7D8190"
                      />
                    </svg>

                    <div className="sidebar-text">Testimonial</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link d-flex" +
                      (selectedNav == "course" ? " active" : "")
                    }
                    to="/course"
                    onClick={() => setSelectedNav("course")}
                  >
                    <svg
                      className="img-fluid sidebar-img"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37324 2.82886C7.06044 2.82886 6.80658 3.08272 6.80658 3.39552V13.0289H9.63991V3.39552C9.63991 3.08272 9.38604 2.82886 9.07324 2.82886H7.37324ZM0.573242 3.96219V15.2955H14.7399V14.1622H1.70658V3.96219H0.573242ZM11.3399 3.96219C11.0271 3.96219 10.7732 4.21606 10.7732 4.52886V13.0289H13.6066V4.52886C13.6066 4.21606 13.3527 3.96219 13.0399 3.96219H11.3399ZM3.40658 6.22886C3.09378 6.22886 2.83991 6.48272 2.83991 6.79552V13.0289H5.67324V6.79552C5.67324 6.48272 5.41938 6.22886 5.10658 6.22886H3.40658Z"
                        fill="#7D8190"
                      />
                    </svg>

                    <div className="sidebar-text">Course</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link d-flex" +
                      (selectedNav == "category" ? " active" : "")
                    }
                    to="/category"
                    onClick={() => setSelectedNav("category")}
                  >
                    <svg
                      className="img-fluid sidebar-img"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37324 2.82886C7.06044 2.82886 6.80658 3.08272 6.80658 3.39552V13.0289H9.63991V3.39552C9.63991 3.08272 9.38604 2.82886 9.07324 2.82886H7.37324ZM0.573242 3.96219V15.2955H14.7399V14.1622H1.70658V3.96219H0.573242ZM11.3399 3.96219C11.0271 3.96219 10.7732 4.21606 10.7732 4.52886V13.0289H13.6066V4.52886C13.6066 4.21606 13.3527 3.96219 13.0399 3.96219H11.3399ZM3.40658 6.22886C3.09378 6.22886 2.83991 6.48272 2.83991 6.79552V13.0289H5.67324V6.79552C5.67324 6.48272 5.41938 6.22886 5.10658 6.22886H3.40658Z"
                        fill="#7D8190"
                      />
                    </svg>

                    <div className="sidebar-text">Category</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link d-flex" +
                      (selectedNav == "learning_material" ? " active" : "")
                    }
                    to="/learning_material"
                    onClick={() => setSelectedNav("learning_material")}
                  >
                    <svg
                      className="img-fluid sidebar-img"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37324 2.82886C7.06044 2.82886 6.80658 3.08272 6.80658 3.39552V13.0289H9.63991V3.39552C9.63991 3.08272 9.38604 2.82886 9.07324 2.82886H7.37324ZM0.573242 3.96219V15.2955H14.7399V14.1622H1.70658V3.96219H0.573242ZM11.3399 3.96219C11.0271 3.96219 10.7732 4.21606 10.7732 4.52886V13.0289H13.6066V4.52886C13.6066 4.21606 13.3527 3.96219 13.0399 3.96219H11.3399ZM3.40658 6.22886C3.09378 6.22886 2.83991 6.48272 2.83991 6.79552V13.0289H5.67324V6.79552C5.67324 6.48272 5.41938 6.22886 5.10658 6.22886H3.40658Z"
                        fill="#7D8190"
                      />
                    </svg>

                    <div className="sidebar-text">Learning Material</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link d-flex" +
                      (selectedNav == "webinar" ? " active" : "")
                    }
                    to="/webinar"
                    onClick={() => setSelectedNav("webinar")}
                  >
                    <svg
                      className="img-fluid sidebar-img"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37324 2.82886C7.06044 2.82886 6.80658 3.08272 6.80658 3.39552V13.0289H9.63991V3.39552C9.63991 3.08272 9.38604 2.82886 9.07324 2.82886H7.37324ZM0.573242 3.96219V15.2955H14.7399V14.1622H1.70658V3.96219H0.573242ZM11.3399 3.96219C11.0271 3.96219 10.7732 4.21606 10.7732 4.52886V13.0289H13.6066V4.52886C13.6066 4.21606 13.3527 3.96219 13.0399 3.96219H11.3399ZM3.40658 6.22886C3.09378 6.22886 2.83991 6.48272 2.83991 6.79552V13.0289H5.67324V6.79552C5.67324 6.48272 5.41938 6.22886 5.10658 6.22886H3.40658Z"
                        fill="#7D8190"
                      />
                    </svg>

                    <div className="sidebar-text">Webinar</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link d-flex" +
                      (selectedNav == "webinar_category" ? " active" : "")
                    }
                    to="/webinar_category"
                    onClick={() => setSelectedNav("webinar_category")}
                  >
                    <svg
                      className="img-fluid sidebar-img"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37324 2.82886C7.06044 2.82886 6.80658 3.08272 6.80658 3.39552V13.0289H9.63991V3.39552C9.63991 3.08272 9.38604 2.82886 9.07324 2.82886H7.37324ZM0.573242 3.96219V15.2955H14.7399V14.1622H1.70658V3.96219H0.573242ZM11.3399 3.96219C11.0271 3.96219 10.7732 4.21606 10.7732 4.52886V13.0289H13.6066V4.52886C13.6066 4.21606 13.3527 3.96219 13.0399 3.96219H11.3399ZM3.40658 6.22886C3.09378 6.22886 2.83991 6.48272 2.83991 6.79552V13.0289H5.67324V6.79552C5.67324 6.48272 5.41938 6.22886 5.10658 6.22886H3.40658Z"
                        fill="#7D8190"
                      />
                    </svg>

                    <div className="sidebar-text">Webinar Category</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link d-flex" +
                      (selectedNav == "learning_material_category"
                        ? " active"
                        : "")
                    }
                    to="/learning_material_category"
                    onClick={() => setSelectedNav("learning_material_category")}
                  >
                    <svg
                      className="img-fluid sidebar-img"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37324 2.82886C7.06044 2.82886 6.80658 3.08272 6.80658 3.39552V13.0289H9.63991V3.39552C9.63991 3.08272 9.38604 2.82886 9.07324 2.82886H7.37324ZM0.573242 3.96219V15.2955H14.7399V14.1622H1.70658V3.96219H0.573242ZM11.3399 3.96219C11.0271 3.96219 10.7732 4.21606 10.7732 4.52886V13.0289H13.6066V4.52886C13.6066 4.21606 13.3527 3.96219 13.0399 3.96219H11.3399ZM3.40658 6.22886C3.09378 6.22886 2.83991 6.48272 2.83991 6.79552V13.0289H5.67324V6.79552C5.67324 6.48272 5.41938 6.22886 5.10658 6.22886H3.40658Z"
                        fill="#7D8190"
                      />
                    </svg>

                    <div className="sidebar-text">
                      Learning material category
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link d-flex" +
                      (selectedNav == "banner" ? " active" : "")
                    }
                    to="/banner"
                    onClick={() => setSelectedNav("banner")}
                  >
                    <svg
                      className="img-fluid sidebar-img"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37324 2.82886C7.06044 2.82886 6.80658 3.08272 6.80658 3.39552V13.0289H9.63991V3.39552C9.63991 3.08272 9.38604 2.82886 9.07324 2.82886H7.37324ZM0.573242 3.96219V15.2955H14.7399V14.1622H1.70658V3.96219H0.573242ZM11.3399 3.96219C11.0271 3.96219 10.7732 4.21606 10.7732 4.52886V13.0289H13.6066V4.52886C13.6066 4.21606 13.3527 3.96219 13.0399 3.96219H11.3399ZM3.40658 6.22886C3.09378 6.22886 2.83991 6.48272 2.83991 6.79552V13.0289H5.67324V6.79552C5.67324 6.48272 5.41938 6.22886 5.10658 6.22886H3.40658Z"
                        fill="#7D8190"
                      />
                    </svg>

                    <div className="sidebar-text">Banner</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link d-flex" +
                      (selectedNav == "user" ? " active" : "")
                    }
                    to="/user"
                    onClick={() => setSelectedNav("user")}
                  >
                    <svg
                      className="img-fluid sidebar-img"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37324 2.82886C7.06044 2.82886 6.80658 3.08272 6.80658 3.39552V13.0289H9.63991V3.39552C9.63991 3.08272 9.38604 2.82886 9.07324 2.82886H7.37324ZM0.573242 3.96219V15.2955H14.7399V14.1622H1.70658V3.96219H0.573242ZM11.3399 3.96219C11.0271 3.96219 10.7732 4.21606 10.7732 4.52886V13.0289H13.6066V4.52886C13.6066 4.21606 13.3527 3.96219 13.0399 3.96219H11.3399ZM3.40658 6.22886C3.09378 6.22886 2.83991 6.48272 2.83991 6.79552V13.0289H5.67324V6.79552C5.67324 6.48272 5.41938 6.22886 5.10658 6.22886H3.40658Z"
                        fill="#7D8190"
                      />
                    </svg>

                    <div className="sidebar-text">User</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      "nav-link d-flex" +
                      (selectedNav == "news" ? " active" : "")
                    }
                    to="/news"
                    onClick={() => setSelectedNav("news")}
                  >
                    <svg
                      className="img-fluid sidebar-img"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.37324 2.82886C7.06044 2.82886 6.80658 3.08272 6.80658 3.39552V13.0289H9.63991V3.39552C9.63991 3.08272 9.38604 2.82886 9.07324 2.82886H7.37324ZM0.573242 3.96219V15.2955H14.7399V14.1622H1.70658V3.96219H0.573242ZM11.3399 3.96219C11.0271 3.96219 10.7732 4.21606 10.7732 4.52886V13.0289H13.6066V4.52886C13.6066 4.21606 13.3527 3.96219 13.0399 3.96219H11.3399ZM3.40658 6.22886C3.09378 6.22886 2.83991 6.48272 2.83991 6.79552V13.0289H5.67324V6.79552C5.67324 6.48272 5.41938 6.22886 5.10658 6.22886H3.40658Z"
                        fill="#7D8190"
                      />
                    </svg>

                    <div className="sidebar-text">News</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
      <div className="w-100 clearfix rightSection">
        <div className="contantSection">
          <header className="w-100 topHeaderSection">
            <div className="topHeaderInner d-flex align-items-center w-100">
              <div className="toggleBtn  d-inline-block-block d-lg-none">
                <button
                  className="navbar-toggler btn ljBtn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsibleNavbar"
                >
                  <span className="line1"></span>
                  <span className="line2"></span>
                  <span className="line3"></span>
                </button>
              </div>
              <div className="logoColumn d-flex d-lg-none">
                <Link to="index.html" className="d-block">
                  <img
                    src="/assets/images/m-logo.svg"
                    alt="logo"
                    className="img-fluid"
                  />
                </Link>
              </div>
              {/* <div className="col-xl-6 col-lg-5  headerSearchBarMain ms-lg-0 ms-auto"> */}
              {/* <div className="termBtn serchBtn d-inline-block d-lg-none">
                  <Link to="#" className="btn ljBtn btnOne">
                  {/* <span>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </span> */}
              {/* </Link> */}
              {/* </div> */}
              {/* <button className="btn " type="button">
                  <img
                    src="/assets/images/icons/search.svg"
                    alt="logo"
                    className="img-fluid"
                  />
                </button> */}

              {/* <Select
                  styles={{
                    control: base => ({
                      ...base,
                      border: 0,
                      boxShadow: 'none'
                    })
                  }}
                  className="headerSearchBarSelect"
                  onChange={(e) => handleSearchChange(e)}
                  options={allOptions}
                  placeholder="Search courses, profiles, glossary, users, support tickets & etc &emsp; &emsp;&emsp;&emsp;(ctrl+/)"
                  noOptionsMessage={() => "No data found"}
                  isSearchable
                  formatGroupLabel={formatGroupLabel}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                /> */}

              {/* </div> */}
              <div className="headerMenu ms-lg-auto">
                <div className="headerBtnSec d-flex">
                  <div className="termBtn myaccnt">
                    <Link to="#" className="d-inline-block">
                      <img
                        src="/assets/images/icons/doodle.png"
                        className="img-fluid"
                        alt="circle"
                      />
                    </Link>
                  </div>
                  <div className="adminname ">
                    <span className="adminname name-span">Shubham Kumar</span>
                    <span className="adminname owner-span">
                      Super Admin/Owner{" "}
                    </span>
                  </div>
                  <div className="logoutBtn d-lg-block d-none">
                    <Link
                      to="#"
                      className="d-inline-block"
                      onClick={accountOpenHandler}
                    >
                      <img
                        src="/assets/images/icons/Vector6.png"
                        alt="mode"
                        className="img-fluid-dwn-arrowbtn"
                      />
                    </Link>
                    {accountOpen && (
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/account">
                            <span>Account</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="#" onClick={logoutHandler}>
                            <span>Logout</span>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
        {children}
      </div>
    </main>
  );
}

export default DefaultLayout;
