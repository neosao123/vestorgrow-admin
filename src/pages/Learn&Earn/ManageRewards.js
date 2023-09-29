import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import ManageRewardService from "../../services/ManageReward";

export default function ManageRewars() {
  const manageRewardServ = new ManageRewardService();

  const [manageRewardList, setManageRewardList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });

  useEffect(() => {
    getRewardList();
  }, []);

  const getRewardList = async () => {
    try {
      let activity = {
        start: search.start,
        length: search.perPage,
        filter: {
          searchText: search.searchTxt,
        },
      };

      let response = await manageRewardServ.listAllReward(activity);
      if (response) {
        setManageRewardList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  };

  const activeToggleHandler = async (reward) => {
    let isActive = !reward.is_active;
    let obj = {
      is_active: isActive,
      _id: reward._id,
    };
    let response = await manageRewardServ.activeToggle(obj);
    if (response.message) {
      getRewardList();
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure want to delete this record?")) {
      try {
        let response = await manageRewardServ.deleteReward(id);
        if (response.message) {
          toast.success("Record deleted successfully");
          getRewardList();
        }
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <div
      className="ljSectionData w-100 clearfix ljpManageRewards pb-4"
      id="ljpManageRewards"
    >
      <div className="current_course_top">
        <div className="row">
          <div className="col-md-6 pr-3 pr-md-0">
            <div className="build_coursebox courses_box flex-wrap h-100">
              <div className="coursebox_left">
                <div className="course_heading">
                  <h4>
                    <img
                      src="assets/images/icons/build_course_img.png"
                      className="me-2"
                      width="20px"
                      height="20px"
                    />
                    BUILD A COURSE
                  </h4>
                </div>
                <div className="course_para">
                  <p>
                    Lorem impsum smaple text will be placed here. Lorem impsum.
                  </p>
                </div>
              </div>
              <div className="coursebox_right">
                <Link to="/build_courses" className="d-inline-block">
                  BUILD
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 pl-3 pl-md-0 mt_30 mt-md-0">
            <div className="build_coursebox courses_box flex-wrap">
              <div className="coursebox_left">
                <div className="course_heading">
                  <h4>
                    <img
                      src="assets/images/icons/current_course_img.png"
                      className="me-2"
                      width="20px"
                      height="20px"
                    />
                    CURRENT COURSES
                  </h4>
                </div>
                <div className="course_para">
                  <p>
                    Lorem impsum smaple text will be placed here. Lorem impsum.
                  </p>
                </div>
              </div>
              <div className="coursebox_right">
                <Link to="/current_courses">VIEW</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="current_courses">
        <div className="total_updates_top ljpTTPUpdates m-0">
          <div className="walletAddressHead accountChangeHead px-3 py-2">
            <div className="toupadetes_heading d-flex">
              <h4 className="mb-0 me-3">MANAGE REWARDS STORE</h4>
              <div className="updates_icon p-0 d-flex align-items-center d-flex align-items-center">
                <Link to="#">
                  <img
                    src="assets/images/icons/eye.svg"
                    className="img-fluid me-2"
                  />
                </Link>
                <label className="press ms-2">
                  <input type="checkbox" className="cbx hidden" checked="" />
                  <span className="lbl"></span>
                </label>
              </div>
            </div>
            <div className="d-flex crsRight">
              <div className="coursebox_right">
                <Link to="#">Add Item</Link>
              </div>
              <div className="updates_search">
                <div className="input-group update_search_bar">
                  <button className="btn" type="button" style={{ zIndex: 1 }}>
                    <img
                      src="assets/images/icons/search.png"
                      alt="logo"
                      className="img-fluid"
                    />
                  </button>
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search Here"
                  />
                  <div className="input-group-append">
                    <button className="btn search_btn" type="submit">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="current_courses_table table-responsive">
          <table className="main_table w-100">
            <thead>
              <tr>
                <th className="">STORE ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Sold</th>
                <th>Price</th>
                <th>Date Added</th>
                <th>Total Revenue</th>
                <th className="action_head">Actions</th>
              </tr>
            </thead>
            <tbody>
              {manageRewardList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    No records found.
                  </td>
                </tr>
              ) : (
                manageRewardList.map((reward, i) => {
                  return (
                    <tr key={i}>
                      <td>{reward.order_id}</td>
                      <td>
                        {reward.course_id && reward.course_id.course_name}
                      </td>
                      <td>{reward.quantity}</td>
                      <td>
                        {moment(reward.sold).format("DD/MM/YYYY hh:mm A")}
                      </td>
                      <td>{reward.Price} COINS</td>
                      <td>
                        {moment(reward.date_added).format("DD/MM/YYYY hh:mm A")}
                      </td>
                      <td>{reward.total_revenue}</td>
                      <td>
                        <div className="updates_icon p-0 d-flex align-items-center">
                          <Link to={`/manage_reward_store/${reward._id}`}>
                            <img
                              src="assets/images/icons/Group_3431.svg"
                              className="img-fluid me-2"
                            />
                          </Link>
                          <label className="press me-2">
                            <input
                              type="checkbox"
                              className="cbx hidden"
                              checked={reward.is_active}
                              onChange={() => activeToggleHandler(reward)}
                            />
                            <span className="lbl"></span>
                          </label>
                          <Link
                            to="/manage_reward_store"
                            onClick={() => handleDeleteCourse(reward._id)}
                          >
                            <img
                              src="assets/images/icons/Group_3496.svg"
                              className="img-fluid me-3"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
