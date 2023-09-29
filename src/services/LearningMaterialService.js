import util from "../util/util";
export default class LearningMaterialService {
  addRecord(payload) {
    return util
      .sendApiRequest("/learningmaterial", "POST", true, payload)
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
        "/learningmaterial/list",
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
      .sendApiRequest("/learningmaterial/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  editRecord(payload) {
    return util.sendApiRequest("/learningmaterial", "PUT", true, payload).then(
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
      .sendApiRequest("/learningmaterial/" + dataId, "DELETE", true)
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
      .sendApiRequest("/learningmaterial/active", "PUT", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}
