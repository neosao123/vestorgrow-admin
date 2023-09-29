import React from "react";
import { useNavigate } from "react-router-dom";
import NewsLetterService from "../../services/NewsLetterService";
import LinkName from "../LinkName/LinkName";
import List from "../List/List";

const columns = [
  { label: "TITLE", key: "name", maxLength: 0 },
  { label: "DESCRIPTION", key: "description", maxLength: 0 },
  { label: "STATUS", key: "STATUS", maxLength: 0 },
  { label: "ACTIONS", key: "ACTIONS", maxLength: 0 },
];

export default function Newsletters() {
  const newsletterServ = new NewsLetterService();
  const navigate = useNavigate();

  async function getListData(search, contextSearch, setList, setTotalCount) {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          contextSearch.searchDtl &&
          contextSearch.searchDtl.type === "newsletters"
            ? contextSearch.searchDtl && contextSearch.searchDtl.value
            : "",
      },
    };

    try {
      let response = await newsletterServ.listAllNewsletter(activity);
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
        let response = await newsletterServ.deleteRecord(id);
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
    navigate("/newsletter_form/" + id);
  };

  const activeToggleHandler = async (newsletterObj) => {
    let obj = {
      _id: newsletterObj._id,
      is_active: !newsletterObj.is_active,
    };
    try {
      let response = await newsletterServ.updateRecord(obj);
      if (response.data) {
        return response.data;
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
        heading="Publish/Manage - Newsletters"
        image="/assets/images/icons/publish.svg"
        span="Add an opening"
        link="/newsletter_form"
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
