import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import LinkName from "../LinkName/LinkName";
import UserService from "../../services/UserService";
import Pagination from "react-bootstrap/Pagination";
import Modal from "./Modal";
import { CSVLink, CSVDownload } from "react-csv";
import GlobalContext from "../../context/GlobalContext";

export default function Users() {
  const sitectx = useContext(GlobalContext);
  const userServe = new UserService();
  const [userList, setUserList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [csvResultList, setCsvResultList] = useState([]);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });

  const initialPerPage = 4;

  function searchProfileList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    getUserListApi();
  }

  async function getUserListApi() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          sitectx.searchDtl && sitectx.searchDtl.type === "user"
            ? sitectx.searchDtl && sitectx.searchDtl.value
            : "",
      },
    };

    try {
      let response = await userServe.userListApi(activity);
      if (response) {
        setUserList(response.data);
        setTotalCount(response.total);
      } else {
        totalCount();
        userList();
      }
    } catch (err) {
      throw err;
    }
  }

  const handlePaging = (e) => {
    if (e.target.text) {
      search.start = parseInt(e.target.text) * search.perPage - search.perPage;
      getUserListApi();
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

  useEffect(() => {
    getUserListApi();
    getCsvData();
  }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

  const getCsvData = async () => {
    try {
      let response = await userServe.getCsvData(0, 10000);
      if (response.data) {
        setCsvResultList(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUserRecord = async (userId, i) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await userServe.deleteUserRecordApi(userId);
        if (response.message) {
          toast.success(response.message);
          setTotalCount(totalCount - 1);
          let userListTem = [...userList];

          const user = userListTem.filter((v) => {
            return v._id !== userId;
          });
          setUserList(user);
        } else {
          toast.error("Record does not deleted ");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const modalHandler = async (user) => {
    const userId = user._id;
    const obj = {
      _id: user._id,
      full_name: user.full_name,
      user_name: user.user_name,
      wallet_address: user.wallet_address,
      email: user.email,
      createdAt: user.createdAt,
    };
    try {
      let response = await userServe.getUser(userId);
      if (response) {
        setUserList(userList.map((v) => (v._id === obj._id ? obj : v)));
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }

    setSelectedUser(user);
    setOpenModal(true);
  };
  const activeToggleHandler = async (course) => {
    try {
      let isActive = course.is_active;
      let obj = {
        is_active: !isActive,
        _id: course._id,
      };
      let response = await userServe.edit(obj);
      if (response.message) {
        getUserListApi();
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
  return (
    <div
      className="ljSectionData w-100 clearfix ljpUserTables pb-4 p-relative"
      id="ljpUserTables"
    >
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          data={selectedUser}
          items={userList}
          modalData={setUserList}
        />
      )}
      <LinkName
        heading="User Database"
        image="/assets/images/icons/user.png"
        link="/user_table"
      />
      <div className="user_part">
        {/* <div className="total_updates_top ljpTTPUpdates m-0">
          <div className="walletAddressHead accountChangeHead px-3 py-2">
            <div className="toupadetes_heading">
              <h4 className="mb-0">All Users</h4>
            </div>
          </div>
        </div> */}
        <div className="users_bottom_part">
          <div className="d-flex flex-wrap user_bottom_header align-items-center margintxt">
            <div className=" text-heading">
              <h4 className="mb-0">All Users</h4>
            </div>
          </div>
          <div className="para">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
          <div className="updates_search updatesearchbar" >
            <div className="input-group update_search_bar w-100">
              <button className="btn" type="button">
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
                onChange={(e) => {
                  searchProfileList(e);
                }}
              />
              <div className="input-group-append">
                <button className="btn search_btn" type="submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="users_table mt-3">
            <div className="current_courses_table table-responsive">
              <table className="main_table w-100">
                <thead>
                  <tr>
                    <th>USERNAME</th>
                    <th>Full Name</th>
                    <th className="course_id">Email</th>
                    <th>Gender</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="action_icons">ACTIONS</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user, i) => {
                    return (
                      <tr key={i}>
                        <td>{user.user_name}</td>
                        <td>{`${user.first_name} ${user.last_name}`}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>{user.role}</td>
                        <td>{activeButton(user)}</td>
                        {/* <td> {moment(user.createdAt).format("L")}</td> */}
                        <td>
                          <div className="updates_icon p-0">
                            {/* <Link to="#">
                              <img
                                src="assets/images/icons/Group_34312.svg"
                                className="img-fluid mr-2"
                              />
                            </Link> */}
                            {/* <Link to="#" onClick={() => modalHandler(user)}>
                              <img
                                src="assets/images/icons/Edit.png"
                                className="img-fluid mr-2 open-modal-btn"
                              />
                            </Link> */}
                            <Link to="#" onClick={() => { deleteUserRecord(user._id) }} className="delIconCustom fa-sharp me-1 fa-solid fa-trash"></Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="users_table_footer">
            <Pagination size="sm">{items}</Pagination>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}