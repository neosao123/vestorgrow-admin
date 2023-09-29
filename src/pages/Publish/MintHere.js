import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Formik } from "formik";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import MintService from "../../services/MintService";
import GlobalContext from "../../context/GlobalContext";

function MintHere(props) {
  const sitectx = useContext(GlobalContext);
  const mintServe = new MintService();
  const bannerImageInputRef = React.useRef();
  const profileImageInputRef = React.useRef();
  const [mintList, setMintList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 15,
    searchTxt: "",
    searchField: "",
  });

  const [value, setValue] = useState({
    name: "",
    contract_addess: "",
    mint_price: "",
    twitter_username: "",
    whitepaper_URL: "",
    banner_image: "",
    desc: "",
    discord_URL: "",
    collection_size: "",
    website_URL: "",
    opensea_URL: "",
    profile_picture: "",
  });
  const initialPerPage = 15;

  function searchMintList(e) {
    search.searchTxt = e.target.value;
    search.start = 0;
    getMintList();
  }

  async function getMintList() {
    let activity = {
      start: search.start,
      length: search.perPage,
      filter: {
        searchText: search.searchTxt,
        searchId:
          sitectx.searchDtl && sitectx.searchDtl.type === "tomint"
            ? sitectx.searchDtl && sitectx.searchDtl.value
            : "",
      },
    };

    try {
      let response = await mintServe.toMintList(activity);
      if (response) {
        setMintList(response.data);
        setTotalCount(response.total);
      }
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    getMintList();
  }, [search, sitectx.searchDtl && sitectx.searchDtl.value]);

  const mintEditHandler = async (mintId) => {
    try {
      let response = await mintServe.editMintData(mintId);
      if (response) {
        window.scroll(0, 0);
        setValue({
          _id: response.data._id,
          name: response.data.name,
          contract_addess: response.data.contract_addess,
          mint_price: response.data.mint_price,
          whitepaper_URL: response.data.whitepaper_URL,
          twitter_username: response.data.twitter_username,
          collection_size: response.data.collection_size,
          discord_URL: response.data.discord_URL,
          desc: response.data.desc,
          opensea_URL: response.data.opensea_URL,
          website_URL: response.data.website_URL,
          banner_image: response.data.banner_image,
          profile_picture: response.data.profile_picture,
        });
      } else {
        toast.error(response?.error);
      }
    } catch (err) {
      throw err;
    }
  };

  const ValidateSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    contract_addess: Yup.string().required(
      "Contract Address is a required field"
    ),
    mint_price: Yup.string().required("Mint Price is a required field"),
    twitter_username: Yup.string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(40)
      .required("Required"),
    whitepaper_URL: Yup.string().required("Whitepaper URL is a required field"),
    desc: Yup.string().required("description is a required field"),
    discord_URL: Yup.string().required("Discord URL is a required field"),
    collection_size: Yup.string().required(
      "Collection Size is a required field"
    ),
    website_URL: Yup.string().required("Website URL is a required field"),
    opensea_URL: Yup.string().required("Opensea URL is a required field"),
    profile_picture: Yup.string().required(
      "Profile picture is a required field"
    ),
    banner_image: Yup.string().required("Banner image is a required field"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    if (values._id) {
      formData.set("_id", values._id);
    }
    formData.set("name", values.name);
    formData.set("contract_addess", values.contract_addess);
    formData.set("mint_price", values.mint_price);
    formData.set("twitter_username", values.twitter_username);
    formData.set("whitepaper_URL", values.whitepaper_URL);
    formData.set("banner_image", values.banner_image);
    formData.set("desc", values.desc);
    formData.set("discord_URL", values.discord_URL);
    formData.set("collection_size", values.collection_size);
    formData.set("website_URL", values.website_URL);
    formData.set("opensea_URL", values.opensea_URL);
    formData.set("profile_picture", values.profile_picture);

    const token = window.user ? window.user.token : "no-token";
    const config = {
      headers: {
        content: "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };
    if (values._id) {
      try {
        const response = await axios.put(
          process.env.REACT_APP_API_BASEURL + "/mint",
          formData,
          config
        );
        if (response.status === 200) {
          setValue({
            name: "",
            contract_addess: "",
            mint_price: "",
            twitter_username: "",
            whitepaper_URL: "",
            banner_image: "",
            desc: "",
            discord_URL: "",
            collection_size: "",
            website_URL: "",
            opensea_URL: "",
            profile_picture: "",
          });
          resetForm();
          toast.success("Record update successfully");
          setMintList(mintList.map((v) => (v._id === values._id ? values : v)));
        } else {
          toast.err("error");
        }
      } catch (err) {
        throw err;
      }
    } else {
      axios
        .post(process.env.REACT_APP_API_BASEURL + "/mint", formData, config)
        .then((res) => {
          toast.success("Record added successfully.");
          setTotalCount(totalCount + 1);
          resetForm();
          bannerImageInputRef.current.value = "";
          profileImageInputRef.current.value = "";
          setValue({
            name: "",
            contract_addess: "",
            mint_price: "",
            twitter_username: "",
            whitepaper_URL: "",
            banner_image: "",
            desc: "",
            discord_URL: "",
            collection_size: "",
            website_URL: "",
            opensea_URL: "",
            profile_picture: "",
          });
          if (res?.data?.data) {
            const temp = [res?.data?.data, ...mintList];
            setMintList(temp);
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const formik = useFormik({
    initialValues: value,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });

  const deletehandler = async (mintId, i) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        let response = await mintServe.deleteMintList(mintId);
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success("Record deleted successfully");
          let mintListTemp = [...mintList];

          const mint = mintListTemp.splice(i, 1);
          setMintList(mintListTemp);
          setTotalCount(totalCount - 1);
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const loadMoreHandle = () => {
    let searchTemp = { ...search };
    searchTemp.perPage = searchTemp.perPage + initialPerPage;
    setSearch(searchTemp);
  };

  const activeToggleHandler = async (mint) => {
    const formData = new FormData();
    formData.set("_id", mint._id);
    formData.set("name", mint.name);
    formData.set("desc", mint.desc);
    formData.set("banner_image", mint.banner_image);
    formData.set("contract_addess", mint.contract_addess);
    formData.set("mint_price", mint.mint_price);
    formData.set("twitter_username", mint.twitter_username);
    formData.set("discord_URL", mint.discord_URL);
    formData.set("collection_size", mint.collection_size);
    formData.set("profile_picture", mint.profile_picture);
    formData.set("is_active", !mint.is_active);
    let obj = {
      _id: mint._id,
      name: mint.name,
      desc: mint.desc,
      banner_image: mint.banner_image,
      contract_addess: mint.contract_addess,
      mint_price: mint.mint_price,
      twitter_username: mint.twitter_username,
      discord_URL: mint.discord_URL,
      collection_size: mint.collection_size,
      profile_picture: mint.profile_picture,
      is_active: !mint.is_active,
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
        process.env.REACT_APP_API_BASEURL + "/mint",
        formData,
        config
      );
      if (res?.status == 200) {
        setMintList(mintList.map((v) => (v._id === obj._id ? obj : v)));
      }
    } catch (err) {
      toast.error("something went wrong!");
      throw err;
    }
  };
  return (
    <div
      className="ljSectionData w-100 clearfix ljpPublishMint"
      id="ljpPublishMint"
    >
      <div className="publishMintArea w-100 mb-4">
        <div className="publishMintOne">
          <span>PUBLISH TO MINT HERE</span>
        </div>

        <div className="publishMintTwo">
          <form
            // onSubmit={props.handleSubmit}
            onSubmit={formik.handleSubmit}
            action=""
            method=""
            className="publishMintTwoForm"
          >
            <div className="row mbBtm">
              <div className="col-md-4 col-12">
                <div className="row">
                  <div className="col-md-12 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="uname">
                        Name <span className="star">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="uname"
                        placeholder="Please enter Name"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.name}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="cadd">
                        Contract Addess <span className="star">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cadd"
                        placeholder="Please enter Contract Addess"
                        name="contract_addess"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contract_addess}
                      />
                      {formik.touched.contract_addess &&
                      formik.errors.contract_addess ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.contract_addess}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="mintprice">
                        Mint Price <span className="star">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="mintprice"
                        placeholder="Please enter Mint Price"
                        name="mint_price"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.mint_price}
                      />
                      {formik.touched.mint_price && formik.errors.mint_price ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.mint_price}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-12">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="description">
                        Description <span className="star">*</span>
                      </label>
                      <Editor
                        apiKey={window.tinyAPIKEY}
                        init={{
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help",
                        }}
                        value={formik.values.desc}
                        onEditorChange={(e) =>
                          formik.handleChange({
                            target: { name: "desc", value: e },
                          })
                        }
                      />
                      {formik.touched.desc && formik.errors.desc ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.desc}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="twiteruser">
                    Twitter Username <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="twiteruser"
                    placeholder="Please enter Twitter Username"
                    name="twitter_username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.twitter_username}
                  />
                  {formik.touched.twitter_username &&
                  formik.errors.twitter_username ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.twitter_username}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="discordurl">
                    Discord URL <span className="star">*</span>
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="discordurl"
                    placeholder="Please enter Discord URL"
                    name="discord_URL"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.discord_URL}
                  />
                  {formik.touched.discord_URL && formik.errors.discord_URL ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.discord_URL}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="openurl">
                    Opensea URL <span className="star">*</span>
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="openurl"
                    placeholder="Please enter Opensea URL"
                    name="opensea_URL"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.opensea_URL}
                  />
                  {formik.touched.opensea_URL && formik.errors.opensea_URL ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.opensea_URL}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="whiteurl">
                    Whitepaper URL <span className="star">*</span>
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="whiteurl"
                    placeholder="Please enter Whitepaper URL"
                    name="whitepaper_URL"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.whitepaper_URL}
                  />
                  {formik.touched.whitepaper_URL &&
                  formik.errors.whitepaper_URL ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.whitepaper_URL}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="collectionsize">
                    Collection Size <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="collectionsize"
                    placeholder="Please enter Collection Size"
                    name="collection_size"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.collection_size}
                  />
                  {formik.touched.collection_size &&
                  formik.errors.collection_size ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.collection_size}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label htmlFor="profilepic">
                    Profile Picture <span className="star">*</span>
                  </label>

                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Upload Profile Picture (Size - 500x500px)"
                      id="profilepic"
                      name="profile_picture"
                      ref={profileImageInputRef}
                      onChange={(event) => {
                        formik.setFieldValue(
                          "profile_picture",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                    <div className="input-group-append">
                      <Link to="#">
                        <span className="input-group-text">
                          {value?.profile_picture ? (
                            <img
                              src={value?.profile_picture}
                              alt="profile_picture"
                              className="img-fluid"
                              width="30px"
                              height="30px"
                            />
                          ) : (
                            <img
                              src="assets/images/icons/upload-to-cloud.svg"
                              alt="upload-to-cloud"
                              className="img-fluid"
                            />
                          )}
                        </span>
                      </Link>
                    </div>
                  </div>
                  {formik.touched.profile_picture &&
                  formik.errors.profile_picture ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.profile_picture}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="bannerimg">
                    Banner Image <span className="star">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Upload Banner Image (Size - 1128x140px)"
                      id="bannerimg"
                      name="banner_image"
                      ref={bannerImageInputRef}
                      onChange={(event) => {
                        formik.setFieldValue(
                          "banner_image",
                          event.currentTarget.files[0]
                        );
                      }}
                      multiple="multiple"
                    />
                    <div className="input-group-append">
                      <Link to="#">
                        <span className="input-group-text">
                          {value?.banner_image ? (
                            <img
                              src={value?.banner_image}
                              alt="banner_image"
                              className="img-fluid"
                              width="30px"
                              height="30px"
                            />
                          ) : (
                            <img
                              src="assets/images/icons/upload-to-cloud.svg"
                              alt="upload-to-cloud"
                              className="img-fluid"
                            />
                          )}
                        </span>
                      </Link>
                    </div>
                  </div>
                  {formik.touched.banner_image && formik.errors.banner_image ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.banner_image}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="form-group">
                  <label htmlFor="weburl">
                    Website URL <span className="star">*</span>
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="weburl"
                    placeholder="Please enter Website URL"
                    name="website_URL"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.website_URL}
                  />
                  {formik.touched.website_URL && formik.errors.website_URL ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.website_URL}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-group">
                  <label style={{ opacity: 0 }}>Submit</label>
                  <button type="submit" className="btn publishBtn">
                    PUBLISH
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="publishMintThree">
          <div>
            <div className="total_updates_top">
              <div className="walletAddressHead accountChangeHead mb-3">
                <h5 className="m-0">
                  Currently Live : <span>{totalCount}</span>
                </h5>
                <div className="updates_search">
                  <div className="input-group update_search_bar">
                    <button className="btn" type="button" style={{ zIndex: 1 }}>
                      <img
                        src="assets/images/icons/search.png"
                        alt="logo"
                        className="img-fluid"
                      />
                    </button>
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="Search Here"
                      onChange={(e) => searchMintList(e)}
                    />
                    <div className="input-group-append">
                      <button className="btn search_btn" type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex publishMintCardArea row pt-3">
              {mintList.map((mint, i) => {
                return (
                  <div
                    className="columnCard col-xl-3 col-lg-4 col-sm-6 pb-md-4 pb-3"
                    key={i}
                  >
                    <div className="publishMintCard">
                      <div
                        className="childMintCardOne position-relative"
                        style={{
                          backgroundImage: `url('${mint.banner_image}')`,
                        }}
                      >
                        <div className="mintCardOneImg">
                          <img
                            src={mint.profile_picture}
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="childMintCardTwo">
                        <h5>{mint.name}</h5>
                        <p dangerouslySetInnerHTML={{ __html: mint.desc }}></p>
                      </div>
                      <div className="updates_icon d-flex align-items-center">
                        <Link to="#" onClick={() => mintEditHandler(mint._id)}>
                          <img
                            src="assets/images/icons/Group_3431.svg"
                            className="img-fluid me-2"
                          />
                        </Link>
                        <label className="press me-2">
                          <input
                            type="checkbox"
                            className="cbx hidden"
                            checked={mint?.is_active}
                            onChange={() => activeToggleHandler(mint)}
                          />
                          <span className="lbl"></span>
                        </label>
                        <Link to="#" onClick={() => deletehandler(mint._id, i)}>
                          <img
                            src="assets/images/icons/Group_3496.svg"
                            className="img-fluid me-3"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="lean_more_btn">
              <Link to="#" className="btn" onClick={loadMoreHandle}>
                <span>LOAD MORE</span>
              </Link>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MintHere;
