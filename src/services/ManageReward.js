import util from "../util/util";
export default class ManageReward {
  listAllReward(data) {
    const activity = Object.keys(data).reduce((object, key) => {
      if (data[key] !== "") {
        object[key] = data[key];
      }
      return object;
    }, {});

    return util
      .sendApiRequest("/rewardstore/list", "POST", true, activity)
      .then(
        (response) => {
          return response;
        },
        (error) => {
          throw error;
        }
      );
  }

  addReward(payload) {
    return util
      .sendApiRequest("/rewardstore", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  editReward(payload) {
    return util
      .sendApiRequest("/rewardstore", "PUT", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  async getReward(rewardId) {
    try {
      return await util.sendApiRequest("/rewardstore/" + rewardId, "GET", true);
    } catch (err) {
      throw err;
    }
  }

  deleteReward(id) {
    return util.sendApiRequest("/rewardstore/" + id, "DELETE", true).then(
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
      .sendApiRequest("/rewardstore/active", "PUT", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}
