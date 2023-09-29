import util from "../util/util";
import axios from "axios";
export default class ContributerService {
  getDetails(dataId) {
    return util
      .sendApiRequest("/contributer/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  async addrecord(formData) {
    const token = window.user ? window.user.token : "no-token";
    const config = {
      headers: {
        content: "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASEURL + "/contributer",
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

  async updateRecord(formData) {
    const token = window.user ? window.user.token : "no-token";
    const config = {
      headers: {
        content: "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };

    try {
      const response = await axios.put(
        process.env.REACT_APP_API_BASEURL + "/contributer",
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

  editContributerData(id) {
    return util
      .sendApiRequest("/contributer/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteRecord(dataId) {
    return util.sendApiRequest("/contributer/" + dataId, "DELETE", true).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  listAll(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util
      .sendApiRequest("/contributer/list", "POST", true, activity)
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw error;
        }
      );
  }
}
