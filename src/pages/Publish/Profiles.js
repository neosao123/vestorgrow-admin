import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import ProfilesService from "../../services/ProfilesService";
import GlobalContext from "../../context/GlobalContext";
import LinkName from "../LinkName/LinkName";
import SearchBlock from "../SearchBlock/SearchBlock";
import Pagination from "react-bootstrap/Pagination";
import Table from "../Table/Table";

const SUPPORTED_FORMAT = ["application/pdf"];

export default function NewsLetter() {
  const sitectx = useContext(GlobalContext);
  const [searchBar, setSearchBar] = useState("");
  const newsletterServe = new ProfilesService();
  const [list, setList] = useState([]);
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
      getListData();
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
    getListData();
  }

  async function getListData() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          sitectx.searchDtl && sitectx.searchDtl.type === "tonewsletter"
            ? sitectx.searchDtl && sitectx.searchDtl.value
            : "",
      },
    };

    try {
      let response = await newsletterServe.listAllNewsletter(activity);
      if (response) {
        setList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    getListData();
  }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

  const deleteHandler = async (id, i) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await newsletterServe.deleteNewsRecord(id);
        if (response) {
          toast.success(response.message);
          let ListTemp = [...list];

          const remainingList = ListTemp.filter((v) => {
            return v._id !== id;
          });
          getListData();
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

  const activeToggleHandler = async (news) => {
    const formData = new FormData();
    formData.set("_id", news._id);
    formData.set("name", news.name);
    formData.set("description", news.description);
    formData.set("banner_image", news.banner_image);
    formData.set("newsletter_pdf", news.newsletter_pdf);
    formData.set("online_view_link", news.online_view_link);
    formData.set("is_active", !news.is_active);
    let obj = {
      _id: news._id,
      name: news.name,
      description: news.description,
      banner_image: news.banner_image,
      newsletter_pdf: news.newsletter_pdf,
      online_view_link: news.online_view_link,
      is_active: !news.is_active,
    };
    const token = window.user ? window.user.token : "no-token";
    const config = {
      headers: {
        content: "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };
    try {
      let res = await axios.put(
        process.env.REACT_APP_API_BASEURL + "/newsletter",
        formData,
        config
      );
      if (res?.status == 200) {
        setList(list.map((v) => (v._id === obj._id ? obj : v)));
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
        <Link to={`/newsletter_form/${row?._id}`}>
          <img src="assets/images/icons/Edit.png" className="img-fluid mr-2" />
        </Link>
        <Link to="#">
          <img src="assets/images/icons/Eye.png" className="img-fluid" />
        </Link>
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
        heading="Publish/Manage - Profiles"
        image="/assets/images/icons/publish.svg"
        span="Add a Profiles"
        link="/profiles_form"
      />
      <div className="custom_link">
        <div className="users_bottom_part">
          <SearchBlock
            heading={`All Profiles `}
            para="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            placeholder="Search Profiles"
            searchData={searchData}
          />
          <Table
            thead={[
              "#",
              "NAME",
              "DESCRIPTION",
              "CONTRACT ADDRESS",
              "DURATION",
              "CATEGORY",
            ]}
            tdata={list.map((v, i) => ({
              id: v._id,
              items: [
                `#${i + 1}`,
                v.name,
                v.description.substring(0, 40),
                activeButton(v),
                renderButtons(v),
              ],
            }))}
            items={items}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import { Editor } from "@tinymce/tinymce-react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { Formik } from "formik";
// import { toast, ToastContainer } from "react-toastify";

// import ProfileService from "../../services/ProfilesService";
// import GlobalContext from "../../context/GlobalContext";

// function Profiles() {
//   const sitectx = useContext(GlobalContext)
//   const profileServe = new ProfileService();
//   const bannerImageInputRef = React.useRef();
//   const profileImageInputRef = React.useRef();
//   const [profileList, setProfileList] = useState([]);
//   const [profileCategoryList, setProfileCategoryList] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [search, setSearch] = useState({
//     start: 0,
//     perPage: 15,
//     searchTxt: "",
//     searchField: "",
//   });
//   const [value, setValue] = useState({
//     name: "",
//     contract_addess: "",
//     instagram_username: "",
//     twitter_username: "",
//     whitepaper_url: "",
//     banner_image: "",
//     desc: "",
//     discord_url: "",
//     collection_size: "",
//     website_url: "",
//     opensea_url: "",
//     profile_picture: "",
//     category_id: "",
//     twitter_followers: "",
//     discord_followers: "",
//     instagram_followers: "",
//   });

//   const initialPerPage = 15;

//   function searchProfileList(e) {
//     search.searchTxt = e.target.value;
//     search.start = 0;
//     getProfileList();
//   }

//   async function getProfileList() {
//     let activity = {
//       start: search.start,
//       length: search.perPage,
//       filter: {
//         searchText: search.searchTxt,
//         searchId:
//           sitectx.searchDtl && sitectx.searchDtl.type === "toprofile"
//             ? sitectx.searchDtl && sitectx.searchDtl.value
//             : "",
//       },
//     };

//     try {
//       let response = await profileServe.toProfileList(activity);
//       if (response) {
//         setProfileList(response.data);
//         setTotalCount(response.total);
//       }
//     } catch (err) {
//       throw err;
//     }
//   }

//   useEffect(() => {
//     getProfileList();
//   }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

//   async function getProfileCategoryList() {
//     let activity = {
//       start: search.start,
//       length: search.perPage,
//       filter: { searchText: search.searchTxt },
//     };
//     try {
//       let response = await profileServe.toProfileCategoryList(activity);
//       if (response.data) {
//         setProfileCategoryList(response.data);
//       }
//     } catch (err) {
//       throw err;
//     }
//   }

//   useEffect(() => {
//     getProfileCategoryList();
//   }, []);

//   const profileEditHandler = async (profileId) => {
//     try {
//       let response = await profileServe.editProfileData(profileId);
//       if (response) {
//         window.scroll(0, 0);
//         setValue({
//           _id: response.data._id,
//           name: response.data.name,
//           contract_addess: response.data.contract_addess,
//           instagram_username: response.data.instagram_username,
//           whitepaper_url: response.data.whitepaper_url,
//           twitter_username: response.data.twitter_username,
//           collection_size: response.data.collection_size,
//           discord_url: response.data.discord_url,
//           desc: response.data.desc,
//           opensea_url: response.data.opensea_url,
//           website_url: response.data.website_url,
//           banner_image: response.data.banner_image,
//           profile_picture: response.data.profile_picture,
//           category_id: response.data.category_id,
//           instagram_followers: response.data.instagram_followers,
//           twitter_followers: response.data.twitter_followers,
//           discord_followers: response.data.discord_followers,
//         });
//       } else {
//         toast.error(response?.error);
//       }
//     } catch (err) {
//       throw err;
//     }
//   };

//   const ValidateSchema = Yup.object().shape({
//     name: Yup.string().max(60).required(),
//     contract_addess: Yup.string().required("Required"),
//     instagram_username: Yup.string().required("Required"),
//     twitter_username: Yup.string()
//       .matches(/^[A-Za-z ]*$/, "Please enter valid twitter_username")
//       .max(40)
//       .required(),
//     whitepaper_url: Yup.string().required("Required"),
//     desc: Yup.string().required("Required"),
//     discord_url: Yup.string().required("Required"),
//     collection_size: Yup.string().required("Required"),
//     website_url: Yup.string().required("Required"),
//     opensea_url: Yup.string().required("Required"),
//     profile_picture: Yup.string().required("Required"),
//     banner_image: Yup.string().required("Required"),
//     instagram_followers: Yup.string().required("Required"),
//     twitter_followers: Yup.string().required("Required"),
//     discord_followers: Yup.string().required("Required"),
//     category_id: Yup.string().required("Required"),
//   });

//   const onSubmit = async (values, { resetForm }) => {
//     const formData = new FormData();
//     if (values._id) {
//       formData.set("_id", values._id);
//     }
//     formData.set("name", values.name);
//     formData.set("contract_addess", values.contract_addess);
//     formData.set("instagram_username", values.instagram_username);
//     formData.set("twitter_username", values.twitter_username);
//     formData.set("whitepaper_url", values.whitepaper_url);
//     formData.set("banner_image", values.banner_image);
//     formData.set("desc", values.desc);
//     formData.set("discord_url", values.discord_url);
//     formData.set("collection_size", values.collection_size);
//     formData.set("website_url", values.website_url);
//     formData.set("opensea_url", values.opensea_url);
//     formData.set("profile_picture", values.profile_picture);
//     formData.set("category_id", values.category_id);
//     formData.set("discord_followers", values.discord_followers);
//     formData.set("instagram_followers", values.instagram_followers);
//     formData.set("twitter_followers", values.twitter_followers);

//     const token = window.user ? window.user.token : "no-token";
//     const config = {
//       headers: {
//         content: "multipart/form-data",
//         Authorization: "Bearer " + token,
//       },
//     };
//     if (values._id) {
//       try {
//         const response = await axios.put(
//           process.env.REACT_APP_API_BASEURL + "/profile",
//           formData,
//           config
//         );
//         if (response?.status === 200) {
//           setValue({
//             name: "",
//             contract_addess: "",
//             instagram_username: "",
//             twitter_username: "",
//             whitepaper_url: "",
//             banner_image: "",
//             desc: "",
//             discord_url: "",
//             collection_size: "",
//             website_url: "",
//             opensea_url: "",
//             profile_picture: "",
//             category_id: "",
//             instagram_followers: "",
//             twitter_followers: "",
//             discord_followers: "",
//           });
//           resetForm();
//           bannerImageInputRef.current.value = "";
//           profileImageInputRef.current.value = "";
//           toast.success(response?.data?.message);
//           setProfileList(
//             profileList.map((v) => (v._id === values._id ? values : v))
//           );
//         } else {
//           toast.err("error");
//         }
//       } catch (err) {
//         throw err;
//       }
//     } else {
//       axios
//         .post(process.env.REACT_APP_API_BASEURL + "/profile", formData, config)

//         .then((res) => {
//           toast.success("Record added successfully.");
//           setTotalCount(totalCount + 1);
//           resetForm();
//           bannerImageInputRef.current.value = "";
//           profileImageInputRef.current.value = "";
//           setValue({
//             name: "",
//             contract_addess: "",
//             instagram_username: "",
//             twitter_username: "",
//             whitepaper_url: "",
//             banner_image: "",
//             desc: "",
//             discord_url: "",
//             collection_size: "",
//             website_url: "",
//             opensea_url: "",
//             profile_picture: "",
//             category_id: "",
//             instagram_followers: "",
//             twitter_followers: "",
//             discord_followers: "",
//           });
//           if (res?.data?.data) {
//             const temp = [res?.data?.data, ...mintList];
//             setProfileList(temp);
//           }
//         })
//         .catch((err) => {
//           throw err;
//         });
//     }
//   };
//   const formik = useFormik({
//     initialValues: value,
//     validateOnBlur: true,
//     onSubmit,
//     validationSchema: ValidateSchema,
//     enableReinitialize: true,
//   });

//   const profileDeleteHandler = async (profileId, i) => {
//     try {
//       if (window.confirm("Are you sure you want to delete this record?")) {
//         let response = await profileServe.deleteProfileList(profileId);
//         if (response.error) {
//           toast.error(response.error);
//         } else {
//           toast.success("Record deleted successfully");
//           let profileListTemp = [...profileList];

//           const profile = profileListTemp.splice(i, 1);
//           setProfileList(profileListTemp);
//           setTotalCount(totalCount - 1);
//         }
//       }
//     } catch (err) {
//       throw err;
//     }
//   };

//   const loadMoreHandle = () => {
//     let searchTemp = { ...search };
//     searchTemp.perPage = searchTemp.perPage + initialPerPage;
//     setSearch(searchTemp);
//   };

//   const activeToggleHandler = async (profile) => {
//     const formData = new FormData();
//     formData.set("_id", profile._id);
//     formData.set("name", profile.name);
//     formData.set("desc", profile.desc);
//     formData.set("banner_image", profile.banner_image);
//     formData.set("contract_addess", profile.contract_addess);
//     formData.set("website_url", profile.website_url);
//     formData.set("opensea_url", profile.opensea_url);
//     formData.set("twitter_username", profile.twitter_username);
//     formData.set("discord_URL", profile.discord_url);
//     formData.set("collection_size", profile.collection_size);
//     formData.set("profile_picture", profile.profile_picture);
//     formData.set("instagram_username", profile.instagram_username);
//     formData.set("is_active", !profile.is_active);
//     formData.set("category_id", profile.category_id._id);

//     let obj = {
//       _id: profile._id,
//       name: profile.name,
//       desc: profile.desc,
//       banner_image: profile.banner_image,
//       contract_addess: profile.contract_addess,
//       website_url: profile.website_url,
//       twitter_username: profile.twitter_username,
//       discord_URL: profile.discord_url,
//       collection_size: profile.collection_size,
//       opensea_url: profile.opensea_url,
//       instagram_username: profile.instagram_username,
//       profile_picture: profile.profile_picture,
//       is_active: !profile.is_active,
//       category_id: profile.category_id,
//     };
//     const token = window.user ? window.user.token : "no-token";
//     const config = {
//       headers: {
//         content: "multipart/form-data",
//         Authorization: "Bearer " + token,
//       },
//     };
//     try {
//       let res = await axios.put(
//         process.env.REACT_APP_API_BASEURL + "/profile",
//         formData,
//         config
//       );
//       if (res?.status == 200) {
//         setProfileList(profileList.map((v) => (v._id === obj._id ? obj : v)));
//       }
//     } catch (err) {
//       toast.error("something went wrong!");
//       throw err;
//     }
//   };
//   return (
//     <div
//       className="ljSectionData w-100 clearfix ljpPublishProfile"
//       id="ljpPublishProfile"
//     >
//       <div className="publishMintArea w-100 mb-4">
//         <div className="publishMintOne">
//           <span>PUBLISH TO PROFILES</span>
//         </div>
//         <div className="publishMintTwo">
//           {/* <Formik initialValues={value} onSubmit={onSubmit} enableReinitialize={true}>
//           {props=>( */}
//           <form
//             action=""
//             method=""
//             className="publishMintTwoForm"
//             onSubmit={formik.handleSubmit}
//           >
//             <div className="row mbBtm">
//               <div className="col-md-4 col-12">
//                 <div className="row">
//                   <div className="col-md-12 col-sm-6">
//                     <div className="form-group">
//                       <label htmlFor="uname">
//                         Name <span className="star">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="name"
//                         placeholder="Please enter Name"
//                         name="name"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.name}
//                       />
//                       {formik.touched.name && formik.errors.name ? (
//                         <div className="formik-errors bg-error">
//                           {formik.errors.name}
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                   <div className="col-md-12 col-sm-6">
//                     <div className="form-group">
//                       <label htmlFor="cadd">
//                         Contract Addess <span className="star">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="cadd"
//                         placeholder="Please enter Contract Addess"
//                         name="contract_addess"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.contract_addess}
//                       />
//                       {formik.touched.contract_addess &&
//                       formik.errors.contract_addess ? (
//                         <div className="formik-errors bg-error">
//                           {formik.errors.contract_addess}
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                   <div className="col-md-12">
//                     <div className="form-group">
//                       <label htmlFor="">
//                         Website URL <span className="star">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id=""
//                         placeholder="Please enter Website URL"
//                         name="website_url"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.website_url}
//                       />
//                       {formik.touched.website_url &&
//                       formik.errors.website_url ? (
//                         <div className="formik-errors bg-error">
//                           {formik.errors.website_url}
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-8 col-12">
//                 <div className="row">
//                   <div className="col-12">
//                     <div className="form-group">
//                       <label htmlFor="description">
//                         Description <span className="star">*</span>
//                       </label>
//                       <Editor
//                         textareaName="content"
//                         apiKey={window.tinyAPIKEY}
//                         init={{
//                           plugins: [
//                             "advlist autolink lists link image charmap print preview anchor",
//                             "searchreplace visualblocks code fullscreen",
//                             "insertdatetime media table paste code help wordcount",
//                           ],
//                           toolbar:
//                             "undo redo | formatselect | bold italic backcolor | \
//                            alignleft aligncenter alignright alignjustify | \
//                            bullist numlist outdent indent | removeformat | help",
//                         }}
//                         value={formik.values.desc}
//                         onEditorChange={(e) =>
//                           formik.handleChange({
//                             target: { name: "desc", value: e },
//                           })
//                         }
//                       />
//                       {formik.touched.desc && formik.errors.desc ? (
//                         <div className="formik-errors bg-error">
//                           {formik.errors.desc}
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-sm-6 col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="twiteruser">
//                     Twitter Username <span className="star">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="twiteruser"
//                     placeholder="Please enter Twitter Username"
//                     name="twitter_username"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.twitter_username}
//                   />
//                   {formik.touched.twitter_username &&
//                   formik.errors.twitter_username ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.twitter_username}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="col-sm-6 col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="Instagram">
//                     Instagram Username <span className="star">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="Instagram"
//                     placeholder="Please enter Instagram Username"
//                     name="instagram_username"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.instagram_username}
//                   />
//                   {formik.touched.instagram_username &&
//                   formik.errors.instagram_username ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.instagram_username}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="col-sm-6 col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="discordurl">
//                     Discord URL <span className="star">*</span>
//                   </label>
//                   <input
//                     type="url"
//                     className="form-control"
//                     id="discordurl"
//                     placeholder="Please enter Discord URL"
//                     name="discord_url"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.discord_url}
//                   />
//                   {formik.touched.discord_url && formik.errors.discord_url ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.discord_url}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="col-sm-6 col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="openurl">
//                     Opensea URL <span className="star">*</span>
//                   </label>
//                   <input
//                     type="url"
//                     className="form-control"
//                     id="openurl"
//                     placeholder="Please enter Opensea URL"
//                     name="opensea_url"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.opensea_url}
//                   />
//                   {formik.touched.opensea_url && formik.errors.opensea_url ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.opensea_url}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="col-sm-6 col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="whiteurl">
//                     Whitepaper URL <span className="star">*</span>
//                   </label>
//                   <input
//                     type="url"
//                     className="form-control"
//                     id="whiteurl"
//                     placeholder="Please enter Whitepaper URL"
//                     name="whitepaper_url"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.whitepaper_url}
//                   />
//                   {formik.touched.whitepaper_url &&
//                   formik.errors.whitepaper_url ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.whitepaper_url}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="col-sm-6 col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="collectionsize">
//                     Collection Size <span className="star">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="collectionsize"
//                     placeholder="Please enter Collection Size"
//                     name="collection_size"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.collection_size}
//                   />
//                   {formik.touched.collection_size &&
//                   formik.errors.collection_size ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.collection_size}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="col-12 col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="profilepic">
//                     Profile Picture <span className="star">*</span>
//                   </label>
//                   <div className="input-group">
//                     <input
//                       type="file"
//                       className="form-control"
//                       placeholder="Upload Profile Picture (Size - 500x500px)"
//                       id="profilepic"
//                       name="profile_picture"
//                       ref={profileImageInputRef}
//                       onChange={(event) => {
//                         formik.setFieldValue(
//                           "profile_picture",
//                           event.currentTarget.files[0]
//                         );
//                       }}
//                     />
//                     <div className="input-group-append">
//                       <Link to="#">
//                         <span className="input-group-text">
//                           {value?.profile_picture ? (
//                             <img
//                               src={value?.profile_picture}
//                               alt="profile_picture"
//                               className="img-fluid"
//                               width="30px"
//                               height="30px"
//                             />
//                           ) : (
//                             <img
//                               src="assets/images/icons/upload-to-cloud.svg"
//                               alt="upload-to-cloud"
//                               className="img-fluid"
//                             />
//                           )}
//                         </span>
//                       </Link>
//                     </div>
//                   </div>
//                   {formik.touched.profile_picture &&
//                   formik.errors.profile_picture ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.profile_picture}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="col-sm-6 col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="bannerimg">
//                     Banner Image <span className="star">*</span>
//                   </label>
//                   <div className="input-group">
//                     <input
//                       type="file"
//                       className="form-control"
//                       placeholder="Upload Banner Image (Size - 1128x140px)"
//                       id="bannerimg"
//                       name="banner_image"
//                       ref={bannerImageInputRef}
//                       onChange={(event) => {
//                         formik.setFieldValue(
//                           "banner_image",
//                           event.currentTarget.files[0]
//                         );
//                       }}
//                       multiple="multiple"
//                     />
//                     <div className="input-group-append">
//                       <Link to="#">
//                         <span className="input-group-text">
//                           {value?.banner_image ? (
//                             <img
//                               src={value?.banner_image}
//                               alt="banner_image"
//                               className="img-fluid"
//                               width="30px"
//                               height="30px"
//                             />
//                           ) : (
//                             <img
//                               src="assets/images/icons/upload-to-cloud.svg"
//                               alt="upload-to-cloud"
//                               className="img-fluid"
//                             />
//                           )}
//                         </span>
//                       </Link>
//                     </div>
//                   </div>
//                   {formik.touched.banner_image && formik.errors.banner_image ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.banner_image}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="col-sm-6 col-md-4">
//                 <div className="form-group">
//                   <label htmlFor="bannerimg">
//                     Profile Category <span className="star">*</span>
//                   </label>
//                   <div className="input-group">
//                     <select
//                       className="form-control"
//                       name="category_id"
//                       onChange={formik.handleChange}
//                       value={formik.values.category_id}
//                     >
//                       <option>Please select category</option>
//                       {profileCategoryList.map((cat, idx) => {
//                         return (
//                           <option value={cat._id} key={idx}>
//                             {cat.name}
//                           </option>
//                         );
//                       })}
//                     </select>
//                   </div>
//                   {formik.touched.category_id && formik.errors.category_id ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.category_id}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="col-md-4 col-sm-6">
//                 <div className="form-group">
//                   <label htmlFor="uname">
//                     Twitter Followers <span className="star">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="twitter_followers"
//                     placeholder="Please enter Name"
//                     name="twitter_followers"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.twitter_followers}
//                   />
//                   {formik.touched.twitter_followers &&
//                   formik.errors.twitter_followers ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.twitter_followers}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="col-md-4 col-sm-6">
//                 <div className="form-group">
//                   <label htmlFor="discord_followers">
//                     Discord Members <span className="star">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="discord_followers"
//                     name="discord_followers"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.discord_followers}
//                   />
//                   {formik.touched.discord_followers &&
//                   formik.errors.discord_followers ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.discord_followers}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="col-md-4 col-sm-6">
//                 <div className="form-group">
//                   <label htmlFor="instagram_followers">
//                     Instagram Followers <span className="star">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="instagram_followers"
//                     name="instagram_followers"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.instagram_followers}
//                   />
//                   {formik.touched.instagram_followers &&
//                   formik.errors.instagram_followers ? (
//                     <div className="formik-errors bg-error">
//                       {formik.errors.instagram_followers}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="col-12 col-md-12">
//                 <div className="form-group">
//                   <label style={{ opacity: 0 }}>Submit</label>
//                   <button type="submit" className="btn publishBtn">
//                     PUBLISH
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//           {/* )}

//           </Formik> */}
//         </div>
//         <div className="publishMintThree">
//           <div className="total_updates_top">
//             <div className="walletAddressHead accountChangeHead mb-3">
//               <h5 className="m-0">
//                 Profiles Count : <span>{totalCount}</span>
//               </h5>
//               <div className="updates_search">
//                 <div className="input-group update_search_bar">
//                   <button className="btn" type="button" style={{ zIndex: 1 }}>
//                     <img
//                       src="assets/images/icons/search.png"
//                       alt="logo"
//                       className="img-fluid"
//                     />
//                   </button>
//                   <input
//                     type="text"
//                     className="form-control border-0"
//                     placeholder="Search Here"
//                     onChange={(e) => searchProfileList(e)}
//                   />
//                   <div className="input-group-append">
//                     <button className="btn search_btn" type="submit">
//                       <i className="fa fa-search" aria-hidden="true"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="d-flex publishMintCardArea row pt-3">
//             {profileList.map((profile, i) => {
//               return (
//                 <div
//                   className="columnCard col-xl-3 col-lg-4 col-sm-6 pb-md-4 pb-3"
//                   key={i}
//                 >
//                   <div className="publishMintCard">
//                     <div
//                       className="childMintCardOne position-relative"
//                       style={{
//                         backgroundImage: `url('${profile.banner_image}')`,
//                       }}
//                     >
//                       <div className="mintCardOneImg">
//                         <img
//                           src={profile.profile_picture}
//                           className="img-fluid"
//                         />
//                       </div>
//                     </div>
//                     <div className="childMintCardTwo">
//                       <h5>{profile.name}</h5>
//                       <p
//                         dangerouslySetInnerHTML={{ __html: profile.desc }}
//                         style={{ wordRrap: "break-word" }}
//                       />
//                     </div>
//                     <div className="updates_icon d-flex align-items-center">
//                       <Link to="#">
//                         <img
//                           src="assets/images/icons/Group_34312.svg"
//                           className="img-fluid me-2"
//                         />
//                       </Link>
//                       <Link
//                         to="#"
//                         onClick={() => profileEditHandler(profile._id)}
//                       >
//                         <img
//                           src="assets/images/icons/Group_3431.svg"
//                           className="img-fluid me-2"
//                         />
//                       </Link>
//                       <label className="press me-2">
//                         <input
//                           type="checkbox"
//                           className="cbx hidden"
//                           checked={profile.is_active}
//                           onChange={() => activeToggleHandler(profile)}
//                         />
//                         <span className="lbl"></span>
//                       </label>
//                       <Link
//                         to="#"
//                         onClick={() => {
//                           profileDeleteHandler(profile._id, i);
//                         }}
//                       >
//                         <img
//                           src="assets/images/icons/Group_3496.svg"
//                           className="img-fluid me-3"
//                         />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="lean_more_btn">
//             <Link to="#" className="btn" onClick={loadMoreHandle}>
//               <span>LOAD MORE</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Profiles;
