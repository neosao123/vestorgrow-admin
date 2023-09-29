import util from "../util/util";
export default class GlossaryService {
  addGlossaryRecord(payload) {
    return util
      .sendApiRequest("/glossary", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  listAllGlossary(data, start, length) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util
      .sendApiRequest(
        // "/glossary/list/" + start + "/" + length,
        "/glossary/list",
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
  getGlossaryDetails(dataId) {
    return util
      .sendApiRequest("/glossary/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  editGlossaryRecord(payload) {
    return util.sendApiRequest("/glossary", "PUT", true, payload).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }
  deleteGlossaryRecord(dataId) {
    return util
      .sendApiRequest("/glossary/" + dataId, "DELETE", true)
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
