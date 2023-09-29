import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import LinkName from "../LinkName/LinkName";
import SearchBlock from "../SearchBlock/SearchBlock";
import Table from "../Table/Table";
import learningMatService from "../../services/LearningMaterialService";
import GlobalContext from "../../context/GlobalContext";

function LearningMaterial() {
  const sitectx = useContext(GlobalContext);
  const learningMatServ = new learningMatService();
  const [learningMaterial, setLearningMaterial] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
    searchTxt: "",
    searchField: "",
  });

  function searchLearningMaterial(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    getLearningMaterial();
  }

  useEffect(() => {
    getLearningMaterial();
  }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

  async function getLearningMaterial() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          sitectx.searchDtl && sitectx.searchDtl.type === "course"
            ? sitectx.searchDtl && sitectx.searchDtl.value
            : "",
      },
    };
    try {
      let response = await learningMatServ.listAll(activity);
      if (response.data) {
        setLearningMaterial(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  const deleteHandler = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await learningMatServ.deleteRecord(dataId);
        if (response) {
          toast.success(response.message);
          let dataTemp = [...learningMaterial];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          getLearningMaterial();
        } else {
          toast.error("Something went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const activeToggleHandler = async (course) => {
    try {
      let isActive = course.is_active;
      let obj = {
        is_active: isActive == 1 ? 2 : 1,
        _id: course._id,
      };
      let response = await learningMatServ.activeToggle(obj);
      if (response.message) {
        getLearningMaterial();
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };

  const handlePaging = (e) => {
    if (e.target.text) {
      search.start = parseInt(e.target.text) * search.perPage - search.perPage;
      getLearningMaterial();
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
        <Link to={`/create_learning_material/${row._id}`} className="editIconCustom fa-sharp me-1 fa-solid fa-pen-to-square" >
          {/* <img
            src="assets/images/icons/Group_3431.svg"
            className="img-fluid mr-2"
          /> */}
        </Link>
        <Link to="#" onClick={() => deleteHandler(row._id)} className="delIconCustom fa-sharp me-1 fa-solid fa-trash" >
          {/* <img src="assets/images/icons/Group_3496.svg" className="img-fluid" /> */}
        </Link>
        {/* <Link to={`/feedback/${row._id}`} className="fa-sharp me-1 fa-solid fa-info" style={{ width: "16px", color: "rgb(2 94 227)" }}>
          <img src="assets/images/icons/eye.svg" className="img-fluid" />
        </Link> */}
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
            checked={data?.is_active == 1}
            onChange={() => activeToggleHandler(data)}
          />
          <span className="lbl"></span>
        </label>
        {data?.is_active == 1 ? <label>Active</label> : <label>Inactive</label>}
      </div>
    );
  };

  return (
    <div
      className="ljSectionData w-100 clearfix ljpPublishUpdate"
      id="ljpPublishUpdate"
    >
      <LinkName
        heading="Publish/Manage - Learning Material"
        image="/assets/images/icons/publish.svg"
        span="Create Learning Material"
        link="/create_learning_material"
      />
      <div className="custom_link">
        <div className="users_bottom_part">
          <SearchBlock
            heading={`Learning Material`}
            count={totalCount}
            para="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            placeholder="Search updates"
            searchData={searchLearningMaterial}
          />
          <Table
            thead={[
              "PUBLISHED",
              "TITLE",
              "AUTHOR",
              "STATUS",
              "ACTIONS",
            ]}
            tdata={
              learningMaterial &&
              learningMaterial.map((crs, i) => ({
                id: crs._id,
                items: [
                  moment(crs.createdAt).format("DD/MM/YYYY"),
                  crs.title,
                  crs.createdBy && crs.createdBy.user_name,
                  activeButton(crs),
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

export default LearningMaterial;
