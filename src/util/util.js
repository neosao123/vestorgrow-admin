import moment from "moment";
export default {
  async sendApiRequest(url, method, setauth, body) {
    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    };
    if (method === "DELETE") {
      delete requestOptions.body;
    }
    if (method === "GET") {
      delete requestOptions.body;
    }

    if (setauth === true) {
      let token = window.user ? window.user.token : "no-token";
      requestOptions.headers["Authorization"] = "Bearer " + token;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASEURL + url,
        requestOptions
      );
      let body = await response.text();
      if (response.status != 200) {
        throw body;
      }
      const data = body.includes("{") ? JSON.parse(body) : body;
      return data;
    } catch (e) {
      throw (e);
    }
  },
  getCurrentTime(endDate) {
    const startDate = moment(new Date());

    if (startDate.diff(moment(endDate), "months") > 0) {
      return startDate.diff(moment(endDate), "months") + " months ago";
    }
    if (startDate.diff(moment(endDate), "weeks") > 0) {
      return startDate.diff(moment(endDate), "weeks") + " weeks ago";
    }
    if (startDate.diff(moment(endDate), "days") > 0) {
      return startDate.diff(moment(endDate), "days") + " days ago";
    }
    if (startDate.diff(moment(endDate), "hours") > 0) {
      return startDate.diff(moment(endDate), "hours") + " hours ago";
    }
    if (startDate.diff(moment(endDate), "minutes") > 0) {
      return startDate.diff(moment(endDate), "minutes") + " minutes ago";
    }
    return "just now";
  },
};
