import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Pagination from "react-bootstrap/Pagination";
import CourseService from "../../services/CourseService";
import { toast, ToastContainer } from "react-toastify";

export default function CurrentCourses() {
  const courseServ = new CourseService();
  const [courseList, setCourseList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });

  useEffect(() => {
    getCourseList();
  }, []);

  const getCourseList = async () => {
    try {
      let activity = {
        start: search.start,
        length: search.perPage,
        filter: { searchText: search.searchTxt },
      };

      let response = await courseServ.courseList(activity);
      if (response) {
        setCourseList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure want to delete this record?")) {
      try {
        let response = await courseServ.deleteCourse(courseId);
        if (response.message) {
          toast.success("Course deleted successfully");
          getCourseList();
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const activeToggleHandler = async (course) => {
    let isActive = !course.is_active;
    let obj = {
      is_active: isActive,
      _id: course._id,
    };
    let response = await courseServ.activeToggle(obj);
    if (response.message) {
      getCourseList();
    }
  };

  function searchCourse(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    getCourseList();
  }

  const handlePaging = (e) => {
    if (e.target.text) {
      search.start = parseInt(e.target.text) * search.perPage - search.perPage;
      getCourseList();
    }
  };

  let active = Math.ceil((search.start + 1) / search.perPage);
  let pages = Math.ceil(totalCount / search.perPage);

  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={handlePaging}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div
      className="ljSectionData w-100 clearfix ljpCurrentCourses pb-4"
      id="ljpCurrentCourses"
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
                      width="20px"
                      height="20px"
                    />{" "}
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
                      src="assets/images/icons/manage_reward_img.png"
                      width="20px"
                      height="20px"
                    />{" "}
                    MANAGE REWARDS STORE
                  </h4>
                </div>
                <div className="course_para">
                  <p>
                    Lorem impsum smaple text will be placed here. Lorem impsum.
                  </p>
                </div>
              </div>
              <div className="coursebox_right">
                <Link to="/manage_reward_store">MANAGE</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="current_courses">
        <div className="total_updates_top ljpTTPUpdates m-0">
          <div className="walletAddressHead accountChangeHead px-3 py-2">
            <div className="toupadetes_heading">
              <h4 className="mb-0">CURRENT COURSES</h4>
            </div>
            <div className="updates_search">
              <div className="input-group update_search_bar">
                <button className="btn" type="button" style={{ zIndex: 1 }}>
                  <img
                    src="/assets/images/icons/search.svg"
                    alt="logo"
                    className="img-fluid"
                  />
                </button>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search Here"
                  onChange={(e) => searchCourse(e)}
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
        <div className="current_courses_table table-responsive">
          <table className="main_table w-100">
            <thead>
              <tr>
                <th className="course_id">COURSE ID</th>
                <th>COURSE Name</th>
                <th>Users Enrolled</th>
                <th>Date Created</th>
                <th>Rewards</th>
                <th>Total COINS</th>
                <th className="action_head">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center">
                    No records found.
                  </td>
                </tr>
              ) : (
                courseList.map((course, i) => {
                  return (
                    <tr key={i}>
                      <td></td>
                      <td>{course.course_name}</td>
                      <td>{course.users_enrolled}</td>
                      <td>
                        {moment(course.createdAt).format("DD/MM/YYYY hh:mm A")}
                      </td>
                      <td>{course.rewards} COINS</td>
                      <td>{course.total_coins}</td>
                      <td>
                        <div className="updates_icon p-0 d-flex align-items-center">
                          <Link to={`/build_courses/${course._id}`}>
                            <img
                              src="assets/images/icons/Group_3431.svg"
                              className="img-fluid me-2"
                            />
                          </Link>
                          <label className="press me-2">
                            <input
                              type="checkbox"
                              className="cbx hidden"
                              checked={course.is_active}
                              onChange={() => activeToggleHandler(course)}
                            />
                            <span className="lbl"></span>
                          </label>
                          <Link
                            to="/current_courses"
                            onClick={() => handleDeleteCourse(course._id)}
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
          <ToastContainer />
        </div>
        <div className="users_table_footer">
          <Pagination size="sm">{items}</Pagination>
        </div>
      </div>
    </div>
  );
}
