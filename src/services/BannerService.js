import util from "../util/util";
export default class BannerService {
  addRecord(payload) {
    return util
      .sendApiRequest("/banner", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  listAll(data, start, length) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util
      .sendApiRequest(
        "/banner/list",
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
  getDetails(dataId) {
    return util
      .sendApiRequest("/banner/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  editRecord(payload) {
    return util.sendApiRequest("/banner", "PUT", true, payload).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }
  deleteRecord(dataId) {
    return util
      .sendApiRequest("/banner/" + dataId, "DELETE", true)
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw new Error(error);
        }
      );
  }
  activeToggle(payload) {
    return util
      .sendApiRequest("/banner/active", "PUT", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}
