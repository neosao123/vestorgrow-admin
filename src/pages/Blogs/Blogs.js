import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlogService from "../../services/blogService";
import LinkName from "../LinkName/LinkName";
import List from "../List/List";

const columns = [
  { label: "TITLE", key: "blog_title", maxLength: 0 },
  { label: "CONTENT", key: "content", maxLength: 0 },
  { label: "AUTHOR", key: "author", maxLength: 0 },
  { label: "DURATION", key: "read_duration", maxLength: 0 },
  { label: "CATEGORY", key: "category_id", maxLength: 0 },
  { label: "STATUS", key: "STATUS", maxLength: 0 },
  { label: "ACTIONS", key: "ACTIONS", maxLength: 0 },
];

export default function Blogs() {
  const blogServ = new BlogService();
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
      let response = await blogServ.listAll(activity);
      response.data = response.data.map((rec) => {
        rec.category_id = rec.category_id?._id ? rec.category_id.name : "";
        return rec;
      });
      response.data = response.data.map((rec) => {
        rec.author = rec.author?._id ? rec.author.user_name : "";
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
        let response = await blogServ.deleteRecord(id);
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
    navigate("/blogs_form/" + id);
  };

  const activeToggleHandler = async (careerObj) => {
    let obj = {
      _id: careerObj._id,
      is_active: !careerObj.is_active,
    };
    try {
      let response = await blogServ.updateRecord(obj);
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
        heading="Publish/Manage - Blog"
        image="/assets/images/icons/publish.svg"
        span="Add a blog"
        link="/blogs_form"
      />
      <List
        title="All Blogs"
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
