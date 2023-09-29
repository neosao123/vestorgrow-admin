import util from "../util/util";
import axios from "axios"
export default class SupportTicketService {
  async addSupportTicketRecord(formData) {
    const token = window.user ? window.user.token : "no-token";
    const config = {
      headers: {
        content: "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASEURL + "/supportTicket",
        formData,
        config
      );
      if (response.err) {
        throw new Error(response.err);
      } else {
        return response;
      }
    } catch (err) {
      throw err;
    }
  }

  supportTicketlist(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util
      .sendApiRequest("/supportTicket/list", "POST", true, activity)
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw error;
        }
      );
  }

  supportTicketCount(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util
      .sendApiRequest("/count/list", "POST", true, activity)
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw error;
        }
      );
  }

  getSupportTicketDetails(dataId) {
    return util
      .sendApiRequest("/supportTicket/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  async editSupportTicketRecord(formData) {
    const token = window.user ? window.user.token : "no-token";
    const config = {
      headers: {
        content: "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.put(
        process.env.REACT_APP_API_BASEURL + "/supportTicket",
        formData,
        config
      );
      if (response.err) {
        throw new Error(response.err);
      } else {
        return response;
      }
    } catch (err) {
      throw err;
    }
  }

  deleteSupportTicketRecordApi(dataId) {
    return util.sendApiRequest("/supportTicket/" + dataId, "DELETE", true).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }
}
