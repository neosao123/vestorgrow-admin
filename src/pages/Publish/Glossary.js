import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import GlossaryService from "../../services/GlossaryService";
import GlobalContext from "../../context/GlobalContext";
import LinkName from "../LinkName/LinkName";
import SearchBlock from "../SearchBlock/SearchBlock";
import Pagination from "react-bootstrap/Pagination";
import Table from "../Table/Table";

function Glossary() {
  const sitectx = useContext(GlobalContext);
  const [searchBar, setSearchBar] = useState("");
  const glossaryServe = new GlossaryService();
  const [glossaryList, setGlossaryList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
    searchTxt: "",
    searchField: "",
    hasCreatedBy: false
  });

  const handlePaging = (e) => {
    if (e.target.text) {
      search.start = parseInt(e.target.text) * search.perPage - search.perPage;
      getGlossaryList();
    }
  };

  let active = Math.ceil((search.start + 1) / search.perPage);
  let pages = Math.ceil(totalCount / search.perPage);

  let items = [];
  let start = active > 5 ? active - 5 : 1
  for (let number = start; number <= (pages < start + 10 ? pages : start + 10); number++) {
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
    getGlossaryList();
  }

  async function getGlossaryList() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        hasCreatedBy: search.hasCreatedBy,
        searchText: search.searchTxt,
        searchId:
          sitectx.searchDtl && sitectx.searchDtl.type === "toglossary"
            ? sitectx.searchDtl && sitectx.searchDtl.value
            : "",
      },
    };
    try {
      let response = await glossaryServe.listAllGlossary(activity);
      if (response) {
        setGlossaryList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    getGlossaryList();
  }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

  const deleteHandler = async (glossaryId, i) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await glossaryServe.deleteGlossaryRecord(glossaryId);
        if (response) {
          toast.success(response.message);
          let glossaryListTemp = [...glossaryList];

          const remainingGlossaryList = glossaryListTemp.filter((v) => {
            return v._id !== glossaryId;
          });
          getGlossaryList();
          // setGlossaryList(remainingGlossaryList);
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

  const activeToggleHandler = async (glossary) => {
    const obj = {
      _id: glossary._id,
      word: glossary.word,
      definition: glossary.definition,
      is_active: !glossary.is_active,
    };
    try {
      const res = await glossaryServe.editGlossaryRecord(obj);
      if (res?.message?.includes("Successfully")) {
        setGlossaryList(glossaryList.map((v) => (v._id === obj._id ? obj : v)));
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
        <Link to={`/glossary_form/${row._id}`}>
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
      <div className="updates_icon d-flex align-items-center created-by-filter-custom">
        <label className="created-by-filter-custom-label">From Website</label>
        <label className="press me-2">
          <input
            type="checkbox"
            className="cbx hidden"
            checked={search.hasCreatedBy}
            onChange={() => setSearch({ ...search, hasCreatedBy: !search.hasCreatedBy })}
          />
          <span className="lbl"></span>
        </label>
      </div>
      <LinkName
        heading="Publish/Manage - Glossary"
        image="/assets/images/icons/publish.svg"
        span="Add a word"
        link="/glossary_form"
      />
      <div className="custom_link">
        <div className="users_bottom_part">
          <SearchBlock
            heading={`All Glossary Words `}
            para="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            placeholder="Search glossary"
            searchData={searchData}
          />
          <Table
            thead={["WORD", "DEFINITION", "STATUS", "ACTIONS"]}
            tdata={glossaryList.map((v, i) => ({
              id: v._id,
              items: [v.word, v.definition, activeButton(v), renderButtons(v)],
            }))}
            items={items}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Glossary;
