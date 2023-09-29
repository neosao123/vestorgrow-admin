import React from "react";
import { useNavigate } from "react-router-dom";
import CareerService from "../../services/CareerService";
import LinkName from "../LinkName/LinkName";
import List from "../List/List";

const columns = [
  { label: "ROLE", key: "role", maxLength: 0 },
  { label: "LOCATION", key: "location", maxLength: 0 },
  { label: "AVAILABILITY", key: "availability", maxLength: 0 },
  { label: "APPLICANTS", key: "applicants", maxLength: 0 },
  { label: "POSTED BY", key: "posted_by", maxLength: 0 },
  { label: "STATUS", key: "STATUS", maxLength: 0 },
  { label: "ACTIONS", key: "ACTIONS", maxLength: 0 },
];

export default function Careers() {
  const careerServ = new CareerService();
  const navigate = useNavigate();

  async function getListData(search, contextSearch, setList, setTotalCount) {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          contextSearch.searchDtl && contextSearch.searchDtl.type === "careers"
            ? contextSearch.searchDtl && contextSearch.searchDtl.value
            : "",
      },
    };

    try {
      let response = await careerServ.listAllCareer(activity);
      response.data = response.data.map((rec) => {
        rec.posted_by = rec.posted_by?._id ? rec.posted_by.full_name : "";
        return rec;
      });
      if (response) {
        setList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  const deleteHandler = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await careerServ.deleteRecord(id);
        if (response) {
          return response;
        } else {
          return false;
        }
      }
    } catch (err) {
      return false;
    }
  };

  const editHandler = async (id) => {
    navigate("/careers_form/" + id);
  };

  const activeToggleHandler = async (careerObj) => {
    let obj = {
      _id: careerObj._id,
      is_active: !careerObj.is_active,
    };
    try {
      let response = await careerServ.updateRecord(obj);
      if (response) {
        return response;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  return (
    <div
      className="ljSectionData w-100 clearfix ljpPublishUpdate"
      id="ljpPublishUpdate"
    >
      <LinkName
        heading="Publish/Manage - Careers"
        image="/assets/images/icons/publish.svg"
        span="Add an opening"
        link="/careers_form"
      />
      <List
        title="All Open Positions"
        subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
        columns={columns}
        getListDataFunc={getListData}
        deleteHandlerFunc={deleteHandler}
        editHandlerFunc={editHandler}
        activeToggleHandlerFunc={activeToggleHandler}
      />
    </div>
  );
}
