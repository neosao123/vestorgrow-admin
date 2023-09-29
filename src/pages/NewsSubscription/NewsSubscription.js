import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import NewsSubscriptionService from "../../services/NewsSubscriptionService";
import GlobalContext from "../../context/GlobalContext";
import LinkName from "../LinkName/LinkName";
import SearchBlock from "../SearchBlock/SearchBlock";
import Pagination from "react-bootstrap/Pagination";
import Table from "../Table/Table";

function NewsSubscription() {
  const sitectx = useContext(GlobalContext);
  const [searchBar, setSearchBar] = useState("");
  const notifyServe = new NewsSubscriptionService();
  const [notificationList, setNotificationList] = useState([]);
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
      getNotificationList();
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
    getNotificationList();
  }

  async function getNotificationList() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          sitectx.searchDtl && sitectx.searchDtl.type === "toglossary"
            ? sitectx.searchDtl && sitectx.searchDtl.value
            : "",
      },
    };

    try {
      let response = await notifyServe.listAll(activity);
      if (response) {
        setNotificationList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    getNotificationList();
  }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

  const deleteHandler = async (glossaryId, i) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await notifyServe.deleteEmail(glossaryId);
        if (response) {
          toast.success(response.message);
          let notificationListTemp = [...notificationList];

          const remainingNotificationList = notificationListTemp.filter((v) => {
            return v._id !== glossaryId;
          });
          getNotificationList();
          // setNotificationList(remainingNotificationList);
          // setTotalCount(totalCount - 1);
        } else {
          toast.error("Something went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  // const loadMoreHandle = () => {
  //   let searchTemp = { ...search };
  //   searchTemp.perPage = searchTemp.perPage + initialPerPage;
  //   setSearch(searchTemp);
  // };

  const activeToggleHandler = async (notification) => {
    const obj = {
      _id: notification._id,
      name: notification.name,
      country: notification.country,
      email: notification.email,
      is_active: !notification.is_active,
    };
    try {
      const res = await notifyServe.editrecord(obj);
      if (res?.message?.includes("Successfully")) {
        setNotificationList(notificationList.map((v) => (v._id === obj._id ? obj : v)));
      } else {
        toast.error("something went wrong!");
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
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

  const renderButtons = (row) => {
    return (
      <div className="updates_icon p-0">
        <Link to={`/subscription_form/${row._id}`}>
          <img src="assets/images/icons/Edit.png" className="img-fluid mr-2" />
        </Link>
        <Link to="#" onClick={() => deleteHandler(row._id)}>
          <img src="assets/images/icons/Delete.png" className="img-fluid" />
        </Link>
      </div>
    );
  };

  return (
    <div
      className="ljSectionData w-100 clearfix ljpPublishUpdate"
      id="ljpPublishUpdate"
    >
      <LinkName
        heading="Newsletter Subscribers"
        image="/assets/images/icons/Group Message.png"
        span="Add a subscriber"
        link="/subscription_form"
      />
      <div className="custom_link">
        <div className="users_bottom_part">
          <SearchBlock
            heading={`All Subscribers `}
            para="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            placeholder="Search subscribers"
            searchData={searchData}
          />
          <Table
            thead={[
              "NAME",
              "EMAIL ADDRESS",
              "COUNTRY",
              "STATUS",
              "ACTIONS",
            ]}
            tdata={notificationList.map((v, i) => ({
              id: v._id,
              items: [
                v.name,
                v.email,
                v.country,
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

export default NewsSubscription;
