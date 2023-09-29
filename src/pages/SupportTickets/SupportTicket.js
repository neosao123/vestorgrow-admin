import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import SupportService from "../../services/SupportTicketService";
import GlobalContext from "../../context/GlobalContext";
import LinkName from "../LinkName/LinkName";
import SearchBlock from "../SearchBlock/SearchBlock";
import Pagination from "react-bootstrap/Pagination";
import Table from "../Table/Table";

function Support() {
    const sitectx = useContext(GlobalContext);
    const [searchBar, setSearchBar] = useState("");
    const supportServe = new SupportService();
    const [supportList, setSupportList] = useState([]);
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
            getSupportList();
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
        getSupportList();
    }

    async function getSupportList() {
        let activity = {
            start: search.start,
            length: search.perPage,
            filter: {
                searchText: search.searchTxt,
                searchId:
                    sitectx.searchDtl && sitectx.searchDtl.type === "tosupport"
                        ? sitectx.searchDtl && sitectx.searchDtl.value
                        : "",
            },
        };

        try {
            let response = await supportServe.supportTicketlist(activity);
            if (response) {
                setSupportList(response.data);
                setTotalCount(response.total);
            }
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        getSupportList();
    }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

    const deleteHandler = async (supportId, i) => {
        try {
            if (window.confirm("Are you sure you want to delete this record?")) {
                let response = await supportServe.deleteSupportTicketRecordApi(supportId);
                if (response) {
                    toast.success(response.message);
                    let supportListTemp = [...supportList];

                    const remainingSupportList = supportListTemp.filter((v) => {
                        return v._id !== supportId;
                    });
                    getSupportList();
                    // setSupportList(remainingSupportList);
                    // setTotalCount(totalCount - 1);
                } else {
                    toast.error("Something went wrong!");
                }
            }
        } catch (err) {
            throw err;
        }
    };


    const renderButtons = (row) => {
        return (
            <div className="updates_icon p-0">
                <Link to={`/supportTiket_form/${row._id}`}>
                    <img src="assets/images/icons/Edit.png" className="img-fluid mr-2" />
                </Link>
                {/* <Link to="#" >
          <img src="assets/images/icons/Eye.png" className="img-fluid" />
        </Link> */}
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
                heading="Support"
                image="/assets/images/icons/publish.svg"
                span="Add support"
                link="/supportTiket_form"
            />
            <div className="custom_link">
                <div className="users_bottom_part">
                    <SearchBlock
                        heading={`Support Ticket : ${totalCount}`}
                        para="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                        placeholder="Search support"
                        searchData={searchData}
                    />
                    <Table
                        thead={["Full Name", "Email Address", "Date & Time", "Message", "ACTIONS"]}
                        tdata={supportList?.map((v, i) => ({
                            id: v._id,
                            items: [v.full_name, v.email_address, v.updatedAt, v.message, renderButtons(v)],
                        }))}
                        items={items}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Support;
