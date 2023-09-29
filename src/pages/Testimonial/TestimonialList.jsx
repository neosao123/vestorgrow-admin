import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import LinkName from "../LinkName/LinkName";
import { Link } from "react-router-dom";
import SearchBlock from "../SearchBlock/SearchBlock";
import Table from "../Table/Table";
import testimonialService from "../../services/TestimonialService";
import Pagination from "react-bootstrap/Pagination";
import GlobalContext from "../../context/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import util from "../../util/util";

const TestimonialList = () => {
  const sitectx = useContext(GlobalContext);
  const testimonialServ = new testimonialService();
  const [testimonials, setTestimonials] = useState([]);
  const [totalTestimonialCount, setTestimonialCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 12,
    searchTxt: "",
    searchField: "",
  });

  async function getTestimonials() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          sitectx.searchDtl && sitectx.searchDtl.type === "testimonials"
            ? sitectx.searchDtl && sitectx.searchDtl.value
            : "",
      },
    };

    try {
      let res = await testimonialServ.listAll(activity);
      if (res.data) {
        setTestimonials(res.data);
        setTestimonialCount(res.total);
      }
      // setTestimonials(res.data);
      // setTestimonialCount(res.total);
    } catch (err) {
      return err;
    }
  }

  function searchTestimonial(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    getTestimonials();
  }

  const deleteHandler = async (dataId) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await testimonialServ.deleteRecord(dataId);
        if (response) {
          toast.success("Testimonial Deleted Successfully");
          let dataTemp = [...testimonials];

          const remainingData = dataTemp.filter((v) => {
            return v._id !== dataId;
          });
          getTestimonials();
        } else {
          toast.error("Something went wrong!");
        }
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getTestimonials();
  }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

  const actionsButtons = (tsl) => {
    return (
      <div className="updates_icon p-0">
        <Link to={`/testimonial/${tsl._id}`} className="editIconCustom fa-sharp me-1 fa-solid fa-pen-to-square">
          {/* <img
            src="assets/images/icons/Group_3431.svg"
            className="img-fluid mr-2"
          /> */}
        </Link>
        <Link to="#" onClick={() => deleteHandler(tsl._id)} className="delIconCustom fa-sharp me-1 fa-solid fa-trash">
          {/* <img src="assets/images/icons/Group_3496.svg" className="img-fluid" /> */}
        </Link>
        {/* <Link to={`/feedback/${row._id}`} className="fa-sharp me-1 fa-solid fa-info" style={{ width: "16px", color: "rgb(2 94 227)" }}>
          <img src="assets/images/icons/eye.svg" className="img-fluid" />
        </Link> */}
      </div>
    );
  };
  const handlePaging = (e) => {
    if (e.target.text) {
      search.start = parseInt(e.target.text) * search.perPage - search.perPage;
      getTestimonials();
    }
  };

  let active = Math.ceil((search.start + 1) / search.perPage);
  let pages = Math.ceil(totalTestimonialCount / search.perPage);

  const items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item key={number} onClick={handlePaging} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="ljSectionData w-100 clearfix ljpPublishUpdate">
      <LinkName
        heading="Publish/Manage - Testimonial Section"
        image="/assets/images/icons/publish.svg"
        span="Create Testimonials"
        link="/add-testimonial"
      />
      <div className="custom_link">
        <div className="users_bottom_part">
          <SearchBlock
            heading={`Testimonials`}
            // count={totalCount}
            count={totalTestimonialCount}
            para="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            placeholder="Search Testimonial"
            searchData={searchTestimonial}
          />
          <Table
            thead={["PUBLISHED", "NAME", "DESIGNATION", "ACTIONS"]}
            tdata={
              testimonials &&
              testimonials.map((tml, i) => ({
                id: tml._id,
                items: [moment(tml.createdAt).format("DD/MM/YYYY"), tml.name, tml.designation, actionsButtons(tml)],
              }))
            }
            items={items}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TestimonialList;
