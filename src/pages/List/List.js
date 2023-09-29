import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import CareerService from "../../services/CareerService";
import GlobalContext from "../../context/GlobalContext";
import LinkName from "../LinkName/LinkName";
import SearchBlock from "../SearchBlock/SearchBlock";
import Pagination from "react-bootstrap/Pagination";
import Table from "../Table/Table";

export default function List({
  title,
  subtitle,
  columns,
  getListDataFunc,
  deleteHandlerFunc,
  editHandlerFunc,
  activeToggleHandlerFunc,
}) {
  const sitectx = useContext(GlobalContext);
  const [searchBar, setSearchBar] = useState("");
  const careerServ = new CareerService();
  const [list, setList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
    searchTxt: "",
    searchField: "",
  });

  const handlePaging = (e) => {
    if (e.target.text) {
      search.start = parseInt(e.target.text) * search.perPage - search.perPage;
      getListDataFunc(search, sitectx, setList, setTotalCount);
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

  function searchData(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    getListDataFunc(search, sitectx, setList, setTotalCount);
  }

  useEffect(() => {
    getListDataFunc(search, sitectx, setList, setTotalCount);
  }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

  const deleteHandler = async (id) => {
    let deleted = await deleteHandlerFunc(id);
    if (deleted) {
      toast.success(deleted.message);
      getListDataFunc(search, sitectx, setList, setTotalCount);
    } else {
      toast.error("Something went wrong!");
    }
  };
  const activeToggleHandler = async (obj, index) => {
    let changed = await activeToggleHandlerFunc(obj);
    if (changed) {
      toast.success(changed.message);
      let records = [...list];
      records[index].is_active = changed.result.data.is_active;
      setList(records);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const activeButton = (data, i) => {
    return (
      <div className="updates_icon d-flex align-items-center">
        <label className="press me-2">
          <input
            type="checkbox"
            className="cbx hidden"
            checked={data?.is_active}
            onChange={() => activeToggleHandler(data, i)}
          />
          <span className="lbl"></span>
        </label>
        {data?.is_active ? <label>Active</label> : <label>Inactive</label>}
      </div>
    );
  };

  const socialLinkButton = (row) => {
    return (
      <div className="updates_icon p-0">
        {row.social_links?.twitter && (
          <a target="_blank" href={row.social_links.twitter}>
            <img
              src="/assets/images/admin_icon/Twitter.png"
              className="img-fluid mr-2"
            />
          </a>
        )}
        {row.social_links?.facebook && (
          <a target="_blank" href={row.social_links.facebook}>
            <img
              src="/assets/images/admin_icon/Facebook.png"
              className="img-fluid mr-2"
            />
          </a>
        )}
        {row.social_links?.instagram && (
          <a target="_blank" href={row.social_links.instagram}>
            <img
              src="/assets/images/admin_icon/Instagram.png"
              className="img-fluid mr-2"
            />
          </a>
        )}
        {row.social_links?.website && (
          <a target="_blank" href={row.social_links.website}>
            <img
              src="/assets/images/admin_icon/Website.png"
              className="img-fluid mr-2"
            />
          </a>
        )}
      </div>
    );
  };

  const renderButtons = (row) => {
    return (
      <div className="updates_icon p-0">
        {editHandlerFunc && (
          <span onClick={() => editHandlerFunc(row._id)}>
            <img
              src="/assets/images/icons/Edit.png"
              className="img-fluid mr-2"
            />
          </span>
        )}
        {deleteHandlerFunc && (
          <span onClick={() => deleteHandler(row._id)}>
            <img src="/assets/images/icons/Delete.png" className="img-fluid" />
          </span>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="custom_link">
        <div className="users_bottom_part">
          <SearchBlock
            heading={title}
            para={subtitle}
            placeholder="Search careers"
            searchData={searchData}
          />
          <Table
            thead={columns.map((col) => col.label)}
            tdata={list.map((v, i) => ({
              id: v._id,
              items: [
                ...columns.map((col) => {
                  if (col.key == "social_links") {
                    return socialLinkButton(v);
                  } else if (col.key == "STATUS") {
                    return activeButton(v, i);
                  } else if (col.key == "ACTIONS") {
                    return renderButtons(v);
                  } else {
                    return col.maxLength > 0
                      ? v[col.key].substring(0, col.maxLength)
                      : v[col.key];
                  }
                }),
              ],
            }))}
            items={items}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
