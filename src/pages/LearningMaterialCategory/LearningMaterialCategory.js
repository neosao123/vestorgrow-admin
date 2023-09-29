import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CategoryService from "../../services/LearningMaterialCategoryService";
import GlobalContext from "../../context/GlobalContext";
import LinkName from "../LinkName/LinkName";
import SearchBlock from "../SearchBlock/SearchBlock";
import Pagination from "react-bootstrap/Pagination";
import Table from "../Table/Table";

function LearningMaterialCategory() {
  const sitectx = useContext(GlobalContext);
  const [searchBar, setSearchBar] = useState("");
  const categoryServ = new CategoryService();
  const [categoryList, setCategoryList] = useState([]);
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
      getCategoryList();
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
    getCategoryList();
  }

  async function getCategoryList() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        hasCreatedBy: search.hasCreatedBy,
        searchText: search.searchTxt,
        searchId:
          sitectx.searchDtl && sitectx.searchDtl.type === "tocategory"
            ? sitectx.searchDtl && sitectx.searchDtl.value
            : "",
      },
    };
    try {
      let response = await categoryServ.listAllCategory(activity);
      if (response) {
        setCategoryList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    getCategoryList();
  }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

  const deleteHandler = async (categoryId, i) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await categoryServ.deleteCategoryRecord(categoryId);
        if (response) {
          toast.success(response.message);
          let categoryListTemp = [...categoryList];

          const remainingCategoryList = categoryListTemp.filter((v) => {
            return v._id !== categoryId;
          });
          getCategoryList();
          // setCategoryList(remainingCategoryList);
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

  const activeToggleHandler = async (category) => {
    let isActive = category.is_active
    const obj = {
      _id: category._id,
      name: category.name,
      is_active: isActive == 1 ? 2 : 1,
    };
    try {
      const res = await categoryServ.editCategoryRecord(obj);
      if (res?.message?.includes("Successfully")) {
        setCategoryList(categoryList.map((v) => (v._id === obj._id ? obj : v)));
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
            checked={data?.is_active == 1}
            onChange={() => activeToggleHandler(data)}
          />
          <span className="lbl"></span>
        </label>
        {data?.is_active == 1 ? <label>Active</label> : <label>Inactive</label>}
      </div>
    );
  };

  const renderButtons = (row) => {
    return (
      <div className="updates_icon p-0">
        <Link to={`/learning_material_create_category/${row._id}`} className="editIconCustom fa-sharp me-1 fa-solid fa-pen-to-square" >

        </Link>
        <Link to="#" onClick={() => deleteHandler(row._id)} className="delIconCustom fa-sharp me-1 fa-solid fa-trash" >
        </Link>
      </div>
    );
  };

  return (
    <div
      className="ljSectionData w-100 clearfix ljpPublishUpdate"
      id="ljpPublishUpdate"
    >
      {/* <div className="updates_icon d-flex align-items-center created-by-filter-custom">
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
      </div> */}
      <LinkName
        heading="Publish/Manage - Learning Material Category"
        image="/assets/images/icons/publish.svg"
        span="Add Category"
        link="/learning_material_create_category"
      />
      <div className="custom_link">
        <div className="users_bottom_part">
          <SearchBlock
            heading={`All Category`}
            para="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            placeholder="Search category"
            searchData={searchData}
          />
          <Table
            thead={["NAME", "STATUS", "ACTIONS"]}
            tdata={categoryList.map((v, i) => ({
              id: v._id,
              items: [v.name, activeButton(v), renderButtons(v)],
            }))}
            items={items}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LearningMaterialCategory;
