import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FaqService from "../../services/FaqService";
import LinkName from "../LinkName/LinkName";
import List from "../List/List";

const columns = [
  { label: "QUESTION", key: "question", maxLength: 0 },
  { label: "ANSWER", key: "answer", maxLength: 0 },
  { label: "STATUS", key: "STATUS", maxLength: 0 },
  { label: "ACTIONS", key: "ACTIONS", maxLength: 0 },
];

export default function Faqs() {
  const faqServ = new FaqService();
  const navigate = useNavigate();

  async function getListData(search, contextSearch, setList, setTotalCount) {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          contextSearch.searchDtl && contextSearch.searchDtl.type === "faq"
            ? contextSearch.searchDtl && contextSearch.searchDtl.value
            : "",
      },
    };

    try {
      let response = await faqServ.listAll(activity);
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
        let response = await faqServ.deleteRecord(id);
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
    navigate("/faq_form/" + id);
  };

  const activeToggleHandler = async (careerObj) => {
    let obj = {
      _id: careerObj._id,
      is_active: !careerObj.is_active,
    };
    try {
      let response = await faqServ.editRecord(obj);
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
        heading="Publish/Manage - Faqs"
        image="/assets/images/icons/publish.svg"
        span="Add a faq"
        link="/faq_form"
      />
      <List
        title="All Faqs"
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
