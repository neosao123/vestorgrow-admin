import React, { useEffect, useState } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Table from "../Table/Table";
import CourseService from "../../services/CourseService";

function DraftList() {
  const courseServ = new CourseService();
  const [draftList, setDraftList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
    searchTxt: "",
    searchField: "",
  });

  useEffect(() => {
    getDraftList();
  }, [search]);

  async function getDraftList() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: { searchText: search.searchTxt },
    };
    try {
      let response = await courseServ.draftList(activity);
      if (response.data) {
        setDraftList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  const deleteHandler = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await courseServ.deleteDraft(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...draftList];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          getDraftList();
        } else {
          toast.error("Something went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const activeToggleHandler = async (draft) => {
    try {
      let isActive = !draft.is_active;
      let obj = {
        is_active: isActive,
        _id: draft._id,
      };
      let response = await courseServ.activeToggleDraft(obj);
      if (response.message) {
        getDraftList();
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };

  const handlePaging = (e) => {
    if (e.target.text) {
      search.start = parseInt(e.target.text) * search.perPage - search.perPage;
      getDraftList();
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
        <Link to={`/create_course/${row.course_id}/${row._id}`}>
          <img
            src="assets/images/icons/Group_3431.svg"
            className="img-fluid mr-2"
          />
        </Link>
        <Link to="#" onClick={() => deleteHandler(row._id)}>
          <img src="assets/images/icons/Group_3496.svg" className="img-fluid" />
        </Link>
      </div>
    );
  };

  const activeButton = (data) => {
    return (
      <div className="updates_icon d-flex align-items-center">
        <label className="press me-2">
          <input
            type="checkbox"
            className="cbx hidden"
            checked={data?.is_active}
            onChange={() => activeToggleHandler(data)}
          />
          <span className="lbl"></span>
        </label>
        {data?.is_active ? <label>Active</label> : <label>Inactive</label>}
      </div>
    );
  };

  return (
    <div
      className="ljSectionData w-100 clearfix ljpPublishUpdate"
      id="ljpPublishUpdate"
    >
      <div className="custom_link">
        <div className="users_bottom_part">
          <div className="total_updates_top ActiveLinks">
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">Drafts</h5>
            </div>
            <div className="d-flex active_link_customs">
              <p className="m-0 pt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
          <Table
            thead={[
              "LAST EDITED",
              "COURSE TITLE",
              "AUTHOR",
              "USER COUNT",
              "REWARD (MAVE)",
              "STATUS",
              "ACTIONS",
            ]}
            tdata={
              draftList &&
              draftList.map((dft, i) => ({
                id: dft._id,
                items: [
                  moment(dft.updatedAt).format("DD/MM/YYYY"),
                  dft.course_name,
                  dft.createdBy && dft.createdBy.user_name,
                  dft.users_enrolled,
                  dft.rewards + " Coins",
                  activeButton(dft),
                  actionsButtons(dft),
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

export default DraftList;
