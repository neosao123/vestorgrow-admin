import util from "../util/util";
export default class testimonialService {
  addRecord(payload) {
    return util
      .sendApiRequest("/testimonial", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  async listAll(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});
    return util.sendApiRequest("/testimonial/list", "POST", true, activity).then(
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
      .sendApiRequest("/testimonial/" + dataId, "GET", true)
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
    return util.sendApiRequest("/testimonial/" + dataId, "DELETE", true).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }
}
