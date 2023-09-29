import util from "../util/util";

export default class FaqService {
    addRecord(payload) {
        return util
            .sendApiRequest("/feedback", "POST", true, payload)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }
    listAll(data) {
        const activity = Object.keys(data).reduce((object, key) => {
            if (data[key] !== "") {
                object[key] = data[key];
            }
            return object;
        }, {});

        return util.sendApiRequest("/feedback/list", "POST", true, activity).then(
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
            .sendApiRequest("/feedback/" + dataId, "GET", true)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }
    editRecord(payload) {
        return util.sendApiRequest("/feedback", "PUT", true, payload).then(
            (response) => {
                return response;
            },
            (error) => {
                throw error;
            }
        );
    }
    deleteRecord(dataId) {
        return util.sendApiRequest("/feedback/" + dataId, "DELETE", true).then(
            (response) => {
                return response;
            },
            (error) => {
                throw new Error(error);
            }
        );
    }
}
