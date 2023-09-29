import util from "../util/util";
export default class UserService {
  login(loginObj) {
    return util
      .sendApiRequest("/user/login", "POST", true, loginObj)
      .then(
        (response) => {
          if (!response.error) {
            localStorage.setItem("user", JSON.stringify(response));
            window.user = response;
            return window.user;
          } else {
            return response;
          }
        },
        (error) => {
          throw new Error(error);
        }
      )
      .catch((e) => {
        throw e;
      });
  }

  logout() {
    localStorage.clear();
    window.user = null;
  }

  async forgotPassword(forgotpassword) {
    try {
      return await util.sendApiRequest("/forgot", "POST", true, forgotpassword);
    } catch (err) {
      throw err;
    }
  }

  resetPassword(payload, token) {
    return util
      .sendApiRequest("/reset/" + token, "POST", true, payload, token)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  changePassword(payload) {
    return util
      .sendApiRequest("/changepassword", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((e) => {
        throw e;
      });
  }

  userListApi(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest("/user/list", "POST", true, activity).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  deleteUserRecordApi(dataId) {
    return util.sendApiRequest("/user/" + dataId, "DELETE", true).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  getUser(dataId) {
    return util
      .sendApiRequest("/user/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  edit(payload) {
    return util.sendApiRequest("/user/", "PUT", true, payload).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  // Get csvdata
  getCsvData(searchObj) {
    const body = Object.keys(searchObj).reduce((object, key) => {
      if (searchObj[key] !== "") {
        object[key] = searchObj[key];
      }
      return object;
    }, {});
    return util.sendApiRequest("/csvData", "POST", true, body).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  listAllSearchData(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest("/getsearchdata", "POST", true, activity).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  userList(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest("/user/list", "POST", true, activity).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }
}
