import util from "../util/util";

export default class AccountService {
  getUser(userId) {
    return util
      .sendApiRequest("/" + userId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  walletAddress(payload) {
    return util
      .sendApiRequest("/", "PUT", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}
