import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContributerService from "../../services/ContributerService";
import LinkName from "../LinkName/LinkName";
import List from "../List/List";

const columns = [
  { label: "NAME", key: "name", maxLength: 0 },
  { label: "JOB ROLE", key: "job_role", maxLength: 0 },
  { label: "SOCIAL LINKS", key: "social_links", maxLength: 0 },
  { label: "STATUS", key: "STATUS", maxLength: 0 },
  { label: "ACTIONS", key: "ACTIONS", maxLength: 0 },
];

export default function Contributers() {
  const contributerServ = new ContributerService();
  const navigate = useNavigate();

  async function getListData(search, contextSearch, setList, setTotalCount) {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          contextSearch.searchDtl &&
          contextSearch.searchDtl.type === "contributers"
            ? contextSearch.searchDtl && contextSearch.searchDtl.value
            : "",
      },
    };

    try {
      let response = await contributerServ.listAll(activity);
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
        let response = await contributerServ.deleteRecord(id);
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
    navigate("/contributers_form/" + id);
  };

  const activeToggleHandler = async (contribObj) => {
    let obj = {
      _id: contribObj._id,
      is_active: !contribObj.is_active,
    };
    try {
      let response = await contributerServ.updateRecord(obj);
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
        heading="Publish/Manage - Contributors"
        image="/assets/images/icons/publish.svg"
        span="Add a contributor"
        link="/contributers_form"
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
