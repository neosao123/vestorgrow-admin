import React, { useState, useEffect } from "react";

import AdminZoneService from "../../services/AdminZoneService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

export default function AdminZone() {
  const [adminData, setAdminData] = useState({});
  const AdminServe = new AdminZoneService();

  useEffect(() => {
    getAdminZoneDetails();
  }, []);

  const getAdminZoneDetails = async () => {
    const adminId = "624fef098e1a801ffc17c3e8";
    try {
      let response = await AdminServe.getAdminZoneDetails(adminId);
      if (response) {
        setAdminData(response.data);
      } else {
        console.log(error);
      }
    } catch (err) {
      throw err;
    }
  };

  const onSubmit = (values) => {
    if (values._id) {
      AdminServe.editAdminZoneRecord(values).then((res) => {
        toast.success(res.message);
      });
    }
  };

  const ValidateSchema = Yup.object().shape({
    token_contract_address: Yup.string().required("Required"),
    token_coin_market_cap_link: Yup.string().required("Required"),
    google_analytics_tracking_code: Yup.string().required("Required"),
    google_analytics_view_ID: Yup.string().required("Required"),
    google_analytics_tracking_ID: Yup.string().required("Required"),
    twitter_username: Yup.string().required("Required"),
    wallet_address: Yup.string().required("Required"),
    discord_anity_URL: Yup.string().required("Required"),
    instagram_username: Yup.string().required("Required"),
    youtube_vanity_URL: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: adminData,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });

  return (
    <div className="ljSectionData w-100 clearfix" id="ljSectionData">
      <div className="publishMintArea w-100 mb-4">
        <div className="publishMintOne">
          <span>ADMIN ZONE</span>
        </div>
        <div className="publishMintTwo">
          <form
            action=""
            method=""
            className="publishMintTwoForm"
            onSubmit={formik.handleSubmit}
          >
            <div className="rowOne">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="tokenContractAddress">
                      $TOKEN Contract Address <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tokenContractAddress"
                      placeholder="Enter $TOKEN Contract Address"
                      name="token_contract_address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.token_contract_address}
                      // value={response.data.token_contract_address}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="tokenCoinMarketCap">
                      $TOKEN CoinMarketCap Link <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tokenCoinMarketCap"
                      placeholder="Enter $TOKEN CoinMarketCap Link"
                      name="token_coin_market_cap_link"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.token_coin_market_cap_link}
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="googleAnalyTrackingCode">
                      Google Analytics Tracking Code{" "}
                      <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="googleAnalyTrackingCode"
                      placeholder="Enter Google Analytics Tracking Code"
                      name="google_analytics_tracking_code"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.google_analytics_tracking_code}
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="googleAnalyticsView">
                      Google Analytics View ID <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="googleAnalyticsView"
                      placeholder="Enter Google Analytics View ID"
                      name="google_analytics_view_ID"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.google_analytics_view_ID}
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="googleAnalyticsTrackingId">
                      Google Analytics Tracking ID{" "}
                      <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="googleAnalyticsTrackingId"
                      placeholder="Enter Google Analytics Tracking ID"
                      name="google_analytics_tracking_ID"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.google_analytics_tracking_ID}
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="twitterUsername">
                      Twitter Username <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="twitterUsername"
                      placeholder="Enter Twitter Username"
                      name="twitter_username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.twitter_username}
                    />
                  </div>
                </div>
                <div className="col-xl-8 col-lg-6 col-md-8 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="ethWalletAddress">
                      LearnJPEG's ETH Wallet Address{" "}
                      <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ethWalletAddress"
                      placeholder="Enter LearnJPEG's ETH Wallet Address"
                      name="wallet_address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.wallet_address}
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="uname">
                      Discord Vanity URL <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="discordVanityUrl"
                      placeholder="Enter Discord Vanity URL"
                      name="discord_anity_URL"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.discord_anity_URL}
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="instagramUsername">
                      Instagram Username <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="instagramUsername"
                      placeholder="Enter Instagram Username"
                      name="instagram_username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.instagram_username}
                    />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="youtubeVanity">
                      Youtube Vanity URL <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="youtubeVanity"
                      placeholder="Enter Youtube Vanity URL"
                      name="youtube_vanity_URL"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.youtube_vanity_URL}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group m-0">
                    <button type="submit" className="btn publishBtn">
                      SAVE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
