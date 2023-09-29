import util from "../util/util";
export default class CustomLinkService {
  addCustomLinkRecord(payload) {
    return util
      .sendApiRequest("/customlink", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  getCustomLinkDetails(dataId) {
    return util
      .sendApiRequest("/customlink/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  customLinkListApi(data, start, length) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest("/customlink/list", "POST", true, activity).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  editCustomLinkRecord(payload) {
    return util.sendApiRequest("/customlink", "PUT", true, payload).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  deleteCustomLinkRecordApi(dataId) {
    return util.sendApiRequest("/customlink/" + dataId, "DELETE", true).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }
}
