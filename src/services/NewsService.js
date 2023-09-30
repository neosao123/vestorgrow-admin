import util from "../util/util";
import axios from "axios"

export default class NewsService {
  // addNewsRecord(payload) {
  //   return util
  //     .sendApiRequest("/news", "POST", true, payload)
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }


  async addNewsRecord(data) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token || "";
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios
        .post(process.env.REACT_APP_API_BASEURL + "/news", data, config)
        .then(async (response) => {
          return response
        });
    } catch (err) {
      throw err;
    }
  }


  listAllNews(data, start, length) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util
      .sendApiRequest(
        "/news/list",
        "POST",
        true,
        activity
      )
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw error;
        }
      );
  }
  getNewsDetails(dataId) {
    return util
      .sendApiRequest("/news/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  // editNewsRecord(payload) {
  // return util.sendApiRequest("/news", "PUT", true, payload).then(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     throw error;
  //   }
  // );
  // }


  async editNewsRecord(payload) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token || "";
    const config = {
      headers: {
        content: "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };
    try {
      const response = await axios.put(process.env.REACT_APP_API_BASEURL + "/news", payload, config);
      if (response.err) {
        throw new Error(response.err);
      } else {
        // localStorage.setItem("user", JSON.stringify(response.data.result));
        // localStorage.setItem("token", response.data.token);
        return response;
      }
    } catch (err) {
      throw err;
    }
  }

  deleteNewsRecord(dataId) {
    return util
      .sendApiRequest("/news/" + dataId, "DELETE", true)
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw new Error(error);
        }
      );
  }
}
