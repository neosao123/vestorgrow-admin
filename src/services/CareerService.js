import util from "../util/util";
export default class CareerService {
  getDetails(dataId) {
    return util
      .sendApiRequest("/careers/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  addrecord(payload) {
    return util
      .sendApiRequest("/careers", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  updateRecord(payload) {
    return util.sendApiRequest("/careers", "PUT", true, payload).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  editCareerData(id) {
    return util
      .sendApiRequest("/careers/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteRecord(dataId) {
    return util.sendApiRequest("/careers/" + dataId, "DELETE", true).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  listAllCareer(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest("/careers/list", "POST", true, activity).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }
}
