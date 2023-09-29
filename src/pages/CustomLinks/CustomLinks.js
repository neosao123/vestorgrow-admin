import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import CustomLinkService from "../../services/CustomLinkService";
import Pagination from "react-bootstrap/Pagination";
import LinkName from "../LinkName/LinkName";
import SearchBlock from "../../pages/SearchBlock/SearchBlock";
import Table from "../Table/Table";

export default function CustomLinks() {
  const router = useNavigate();
  const customServe = new CustomLinkService();
  const [activeList, setActiveList] = useState([]);
  const [expiredList, setExpiredList] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });
  const [value, setValue] = useState({
    title: "",
    for: "",
    duration: "",
  });

  function searchCustomLinkList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    getCustomActiveLinkListApi();
  }

  async function getCustomActiveLinkListApi() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: { searchText: search.searchTxt },
      type: 1,
    };

    try {
      let response = await customServe.customLinkListApi(
        activity,
        search.start,
        search.perPage
      );
      if (response) {
        setActiveList(response.data);
        setActiveCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  async function getCustomExpiredLinkListApi() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: { searchText: search.searchTxt },
      type: 0,
    };
    try {
      let response = await customServe.customLinkListApi(
        activity,
        search.start,
        search.perPage
      );
      if (response) {
        setExpiredList(response.data);
        setExpiredCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    getCustomActiveLinkListApi();
    getCustomExpiredLinkListApi();
  }, [search]);

  const handlePaging = (e) => {
    if (e.target.text) {
      search.start = parseInt(e.target.text) * search.perPage - search.perPage;
      getCustomActiveLinkListApi();
    }
  };

  let active = Math.ceil((search.start + 1) / search.perPage);
  let pages = Math.ceil(activeCount / search.perPage);

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

  const deleteActiveLink = async (customId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await customServe.deleteCustomLinkRecordApi(customId);
        if (response.message) {
          toast.success(response.message);
          getCustomActiveLinkListApi();
          // setTotalCount(totalCount - 1);
          let activeLinkTem = [...activeList];
          const custom = activeLinkTem.filter((v) => {
            return v._id !== customId;
          });
          // setActiveList(custom)
        } else {
          toast.error("Record does not deleted ");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteExpiredLink = async (expiredId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await customServe.deleteCustomLinkRecordApi(expiredId);
        if (response.message) {
          toast.success(response.message);
          getCustomExpiredLinkListApi();
          // setTotalCount(totalCount - 1);
          let expiredLinkTem = [...expiredList];
          const custom = expiredLinkTem.filter((v) => {
            return v._id !== expiredId;
          });
          setExpiredList(custom);
        } else {
          toast.error("Record does not deleted ");
        }
      }
    } catch (err) {
      throw err;
    }
  };
  const ValidateSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    for: Yup.string().required("Required"),
    duration: Yup.string().required("Required"),
  });

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


  const renderButtons = (row) => {
    return (
      <div className="updates_icon p-0">
        <Link to={`/custom_linkform/${row._id}`}>
          <img src="assets/images/icons/Edit.png" className="img-fluid mr-2" />
        </Link>
        <Link to="#" onClick={() => deleteActiveLink(row._id)}>
          <img src="assets/images/icons/Delete.png" className="img-fluid" />
        </Link>
      </div>
    );
  };

  return (
    <div className="ljSectionData w-100 clearfix" id="ljSectionData">
      <LinkName
        heading="Custom Links"
        image="/assets/images/icons/custom.png"
        span="Create a link"
        link="/custom_linkform"
      />
      <div className="custom_link">
        <div className="users_bottom_part">
          <SearchBlock
            heading={`Active Links`}
            para="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            placeholder="Search active links"
            onChange={(e) => {
              searchCustomLinkList(e);
            }}
            // searchHandle={searchCustomLinkList}
          />

          <Table
            thead={[
              "DATE",
              "FOR",
              "CREATED BY",
              "LINK",
              "DURATION",
              "CLICKS",
              "ACTIONS",
            ]}
            tdata={activeList.map((v) => ({
              id: v._id,
              items: [
                moment(v.createdAt).format("DD/MM/YY"),
                v.for,
                v.createdBy?.full_name || "",
                v.link,
                v.duration,
                v.clicks,
                renderButtons(v),
              ],
            }))}
            items={items}
          />
          {/* <div className="users_table_footer">
            <Pagination size="sm">{items}</Pagination>
          </div> */}
        </div>
        <hr style={{ border: "1px solid rgba(125, 129, 144, 0.15)" }} />

        <div className="users_bottom_part">
          <SearchBlock
            heading={`Expired Links`}
            para="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            placeholder="Search expired links"
            onChange={(e) => {
              searchCustomLinkList(e);
            }}
          />

          <Table
            thead={[
              "DATE",
              "FOR",
              "CREATED BY",
              "LINK",
              "DURATION",
              "CLICKS",
              "STATUS",
            ]}
            tdata={expiredList.map((v) => ({
              id: v._id,
              items: [
                moment(v.createdAt).format("DD/MM/YY"),
                v.for,
                v.createdBy?.full_name || "",
                v.link,
                v.duration,
                v.clicks,
                  activeButton(v),
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
