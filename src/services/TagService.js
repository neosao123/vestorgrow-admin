import util from "../util/util";

export default class TagService {
    listAll() {

        return util.sendApiRequest("/tag/list", "POST", true).then(
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
            .sendApiRequest("/tag/" + dataId, "GET", true)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }
    addTag(payload) {
        let titles = []
        payload.map(item => {
            titles.push({ title: item })
        })
        let data = { titles: titles }
        return util.sendApiRequest("/tag", "POST", true, data).then(
            (response) => {
                return response;
            },
            (error) => {
                throw error;
            }
        );
    }
    deleteTag(dataId) {
        return util.sendApiRequest("/tag/" + dataId, "DELETE", true).then(
            (response) => {
                return response;
            },
            (error) => {
                throw new Error(error);
            }
        );
    }

}
