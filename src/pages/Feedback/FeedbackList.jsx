import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import LinkName from "../LinkName/LinkName";
import SearchBlock from "../SearchBlock/SearchBlock";
import Table from "../Table/Table";
import FeedbackService from "../../services/FeedbackService";
import GlobalContext from "../../context/GlobalContext";

function FeedbackList() {
  const sitectx = useContext(GlobalContext);
  const feedbackServ = new FeedbackService();
  const { id } = useParams();
  const [feedbackList, setFeedbackList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
    searchTxt: "",
    searchField: "",
  });

  function searchFeedbackList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    getFeedbackList();
  }

  useEffect(() => {
    getFeedbackList();
  }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

  async function getFeedbackList() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          sitectx.searchDtl && sitectx.searchDtl.type === "feedback"
            ? sitectx.searchDtl && sitectx.searchDtl.value
            : "",
        courseId: id
      },
    };
    try {
      let response = await feedbackServ.listAll(activity);
      if (response.data) {
        setFeedbackList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  const deleteHandler = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await feedbackServ.deleteRecord(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...feedbackList];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          getFeedbackList();
        } else {
          toast.error("Something went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const activeToggleHandler = async (feedback) => {
    try {
      let isActive = !feedback.is_active;
      let obj = {
        is_active: isActive,
        _id: feedback._id,
      };
      let response = await feedbackServ.activeToggle(obj);
      if (response.message) {
        getFeedbackList();
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };

  const handlePaging = (e) => {
    if (e.target.text) {
      search.start = parseInt(e.target.text) * search.perPage - search.perPage;
      getFeedbackList();
    }
  };

  let active = Math.ceil((search.start + 1) / search.perPage);
  let pages = Math.ceil(totalCount / search.perPage);

  const items = [];
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
  const actionsButtons = (row) => {
    return (
      <div className="updates_icon p-0">
        {/* <Link to={`/create_feedback/${row._id}`}>
          <img
            src="/assets/images/icons/Group_3431.svg"
            className="img-fluid mr-2"
          />
        </Link> */}
        <Link to="#" onClick={() => deleteHandler(row._id)}>
          <img src="/assets/images/icons/Group_3496.svg" className="img-fluid" />
        </Link>
      </div>
    );
  };

  // const activeButton = (data) => {
  //   return (
  //     <div className="updates_icon d-flex align-items-center">
  //       <label className="press me-2">
  //         <input
  //           type="checkbox"
  //           className="cbx hidden"
  //           checked={data?.is_active}
  //           onChange={() => activeToggleHandler(data)}
  //         />
  //         <span className="lbl"></span>
  //       </label>
  //       {data?.is_active ? <label>Active</label> : <label>Inactive</label>}
  //     </div>
  //   );
  // };

  return (
    <div
      className="ljSectionData w-100 clearfix ljpPublishUpdate"
      id="ljpPublishUpdate"
    >

      <LinkName
        heading="Publish/Manage - Feedbacks"
        image="/assets/images/icons/publish.svg"
        span="Create a feedback"
        link="/create_feedback"
        span2="Drafts"
        link2="/draft"
      />
      <div className="custom_link">
        <div className="users_bottom_part">
          <div className="custom-link_backbtn custom-link_backbtn-feedback">
            <Link to="/course">
              <img
                src="/assets/images/icons/leftarrow.svg"
                alt="arrow"
                className="ml-2"
                style={{ paddingLeft: "8px" }}
              />
            </Link>
          </div>
          <SearchBlock
            heading={`Feedbacks`}
            count={totalCount}
            para="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            placeholder="Search updates"
            searchData={searchFeedbackList}
          />
          <Table
            thead={[
              "Published",
              "Subject",
              "Description",
              "Course",
              // "STATUS",
              "ACTIONS",
            ]}
            tdata={
              feedbackList &&
              feedbackList.map((crs, i) => ({
                id: crs._id,
                items: [
                  moment(crs.createdAt).format("DD/MM/YYYY"),
                  crs.subject,
                  crs.description,
                  crs.courseId && crs.courseId.course_name,
                  // activeButton(crs),
                  actionsButtons(crs),
                ],
              }))
            }
            items={items}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default FeedbackList;
