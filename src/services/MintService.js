import util from "../util/util";

export default class MintService {
  toMintList(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util.sendApiRequest("/mint/list", "POST", true, activity).then(
      (response) => {
        return response;
      },
      (error) => {
        throw error;
      }
    );
  }

  deleteMintList(dataId) {
    return util.sendApiRequest("/mint/" + dataId, "DELETE", true).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  editMintData(id) {
    return util
      .sendApiRequest("/mint/" + id, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}
