import util from "../util/util";

export default class NewsSubscriptionService {
  addrecord(payload) {
    return util
      .sendApiRequest("/newsletters", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  editrecord(payload) {
    return util.sendApiRequest("/newsletters", "PUT", true, payload).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
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
      .sendApiRequest("/newsletters/list", "POST", true, activity)
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw error;
        }
      );
  }

  deleteEmail(id) {
    return util.sendApiRequest("/newsletters/" + id, "DELETE", true).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }
  getNewsDetails(id) {
    return util.sendApiRequest("/newsletters/" + id, "Get", true).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
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
    return util
      .sendApiRequest("/newsletters/csvData", "POST", true, body)
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
