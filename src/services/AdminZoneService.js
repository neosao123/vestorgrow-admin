import util from '../util/util'
export default class AdminZoneService{
    getAdminZoneDetails(dataId) {
        return util
          .sendApiRequest("/adminzone/" + dataId, "GET", true)
          .then((response) => {
            return response;
          })
          .catch((err) => {
            throw err;
          });
      }
      editAdminZoneRecord(payload) {
        return util.sendApiRequest("/adminzone", "PUT", true, payload).then(
          (response) => {
            return response;
          },
          (error) => {
            throw error;
          }
        );
      }
}