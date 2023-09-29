import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PartnerService from "../../services/PartnerService";
import LinkName from "../LinkName/LinkName";
import List from "../List/List";

const columns = [
  { label: "NAME", key: "name", maxLength: 0 },
  { label: "CATEGORY", key: "category", maxLength: 0 },
  { label: "SOCIAL LINKS", key: "social_links", maxLength: 0 },
  { label: "STATUS", key: "STATUS", maxLength: 0 },
  { label: "ACTIONS", key: "ACTIONS", maxLength: 0 },
];

export default function Partners() {
  const partnerServ = new PartnerService();
  const navigate = useNavigate();

  async function getListData(search, contextSearch, setList, setTotalCount) {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          contextSearch.searchDtl && contextSearch.searchDtl.type === "partners"
            ? contextSearch.searchDtl && contextSearch.searchDtl.value
            : "",
      },
    };

    try {
      let response = await partnerServ.listAll(activity);
      if (response) {
        setList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  const deleteHandler = async (id, i) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await partnerServ.deleteRecord(id);
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
    navigate("/partners_form/" + id);
  };

  const activeToggleHandler = async (partnerObj) => {
    let obj = {
      _id: partnerObj._id,
      is_active: !partnerObj.is_active,
    };
    try {
      let response = await partnerServ.updateRecord(obj);
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
        heading="Publish/Manage - Partners"
        image="/assets/images/icons/publish.svg"
        span="Add a partner"
        link="/partners_form"
      />
      <List
        title="All  Contributors"
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
