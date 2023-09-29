import { useFormik } from "formik";
import React, { useEffect, useState, useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import PublishService from "../../services/PublishService";
import util from "../../util/util";
import LinkName from "../LinkName/LinkName";
import SearchBlock from "../SearchBlock/SearchBlock";
import Table from "../Table/Table";
import Pagination from "react-bootstrap/Pagination";
import GlobalContext from "../../context/GlobalContext";

function Updates() {
  const sitectx = useContext(GlobalContext);
  const [datas, setDatas] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
    searchTxt: "",
    searchField: "",
  });

  const publishserv = new PublishService();

  function searchUpdateList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    getUpdateList();
  }
  async function getUpdateList() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          sitectx.searchDtl && sitectx.searchDtl.type === "toupdate"
            ? sitectx.searchDtl && sitectx.searchDtl.value
            : "",
      },
    };
    try {
      let response = await publishserv.listAllUpdate(activity);
      if (response) {
        setDatas(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    getUpdateList();
  }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

  const deleteHandler = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await publishserv.deleteRecord(dataId);
        if (response) {
          console.log(response);
          toast.success(response.message);
          let dataTemp = [...datas];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          getUpdateList();
          // setDatas(remainingData);
          // setTotalCount(totalCount - 1);
        } else {
          toast.error("Something went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const activeToggleHandler = async (data) => {
    const obj = {
      _id: data._id,
      word: data.word,
      update: data.update,
      is_active: !data.is_active,
    };
    try {
      const res = await publishserv.editrecord(obj);
      if (res?.message?.includes("Successfully")) {
        setDatas(datas.map((v) => (v._id === obj._id ? obj : v)));
      } else {
        toast.error("something went wrong!");
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };

  const handlePaging = (e) => {
    if (e.target.text) {
      search.start = parseInt(e.target.text) * search.perPage - search.perPage;
      getUpdateList();
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

  const renderButtons = (row) => {
    return (
      <div className="updates_icon p-0">
        <Link to={`/update_form/${row._id}`}>
          <img src="assets/images/icons/Edit.png" className="img-fluid mr-2" />
        </Link>
        <Link to="#" onClick={() => deleteHandler(row._id)}>
          <img src="assets/images/icons/Delete.png" className="img-fluid" />
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
      <LinkName
        heading="Publish/Manage - Updates"
        image="/assets/images/icons/publish.svg"
        span="Add an update"
        link="/update_form"
      />
      <div className="custom_link">
        <div className="users_bottom_part">
          <SearchBlock
            heading={`All Updates `}
            para="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            placeholder="Search updates"
            searchData={searchUpdateList}
          />
          {console.log(datas)}
          <Table
            thead={["#", "HEADING", "BODY", "STATUS", "ACTIONS"]}
            tdata={datas.map((v, i) => ({
              id: v._id,
              items: [
                `#${i + 1}`,
                v.word,
                v.update.substring(0, 50),
                activeButton(v),
                renderButtons(v),
              ],
            }))}
            items={items}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Updates;
