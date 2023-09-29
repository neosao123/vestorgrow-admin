import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="ljSectionData w-100 clearfix" id="ljSectionData">
      {/* <div className="titleCard card mb-4"> */}
      <div className="title-container-dashbrd mb-2">
        <img
          src="/assets/images/icons/Vector(25).png"
          alt="logo"
          className="img-fluid sidebar-img "
          style={{ color: "#4A5056" }}
          width="22"
        />
        <span
          style={{
            paddingLeft: "10px",
            marginTop: "-7px",
            fontFamily: 'Inter',
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "28px",
            color: "#4A5056",
          }}
        >
          Dashboard
        </span>
      </div>
      {/* </div> */}
      <div className="allCardList">
        <div className="row">
          <div className=" card-box-dashbrd col-xl-2 col-md-6 col-6 pb-6">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Total Users</h6>
                <h3 className="m-0 full-amount">299,890</h3>
              </Link>
            </div>
          </div>
          <div className="card-box-dashbrd col-xl-2 col-md-6 col-6 pb-4">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">
                  Monthly Unique <br />
                  Visitors
                </h6>
                <h3 className="full-amount m-0">50,000</h3>
              </Link>
            </div>
          </div>
          <div className="card-box-dashbrd col-xl-2 col-md-6 col-6 pb-4">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">
                  Weekly Unique <br />
                  Visitors
                </h6>
                <h3 className="m-0 full-amount">12,500</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">
                  Daily Unique <br />
                  Visitors
                </h6>
                <h3 className="m-0 full-amount">2,442</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">
                  Hourly Unique
                  <br /> Visitors
                </h6>

                <h3 className="m-0 full-amount">83</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Tools Count</h6>
                <h3 className="m-0 full-amount">7</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Profiles Count</h6>
                <h3 className="m-0 full-amount">230</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Courses Count</h6>
                <h3 className="m-0 full-amount">85</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="" className="d-flex">
                <h6 className="m-0">Glossary Count</h6>
                <h3 className="m-0 full-amount">729</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">
                  Blog Articles <br />
                  Count
                </h6>
                <h3 className="m-0 full-amount">000</h3>
              </Link>
            </div>
          </div>
          {/* <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Courses Count</h6>
                <h3 className="m-0 full-amount">299,890</h3>
              </Link>
            </div>
          </div> */}
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">
                  Newsletter
                  <br /> Subscribers
                </h6>
                <h3 className="m-0 full-amount">15,925</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Twitter Followers</h6>
                <h3 className="m-0 full-amount">34,583</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Discord Members</h6>
                <h3 className="m-0 full-amount">18,791</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">
                  Instagram <br />
                  Followers
                </h6>
                <h3 className="m-0 full-amount">15,432</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-6 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">
                  Youtube
                  <br /> Subscribers
                </h6>
                <h3 className="m-0 full-amount">3,630</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">
                  Reward Coins
                  <br /> Claimed
                </h6>
                <h3 className="m-0 full-amount">1,349,340</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">
                  Open Support
                  <br /> Tickets
                </h6>
                <h3 className="m-0 full-amount">34</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Title</h6>
                <h3 className="m-0 full-amount">NA</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Title</h6>
                <h3 className="m-0 full-amount">NA</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Title</h6>
                <h3 className="m-0 full-amount">NA</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Title</h6>
                <h3 className="m-0 full-amount">000</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Title</h6>
                <h3 className="m-0 full-amount">000</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Title</h6>
                <h3 className="m-0 full-amount">000</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Title</h6>
                <h3 className="m-0 full-amount">000</h3>
              </Link>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-6 pb-4 card-box-dashbrd">
            <div className="FullViews card">
              <Link to="#" className="d-flex">
                <h6 className="m-0">Title</h6>
                <h3 className="m-0 full-amount">000</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
