import util from "../util/util";
export default class AuthorService {
    addCategoryRecord(payload) {
        return util
            .sendApiRequest("/author", "POST", true, payload)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }
    listAllCategory(data, start, length) {
        const activity = Object.keys(data).reduce((object, key) => {
            if (data[key] !== "") {
                object[key] = data[key];
            }
            return object;
        }, {});

        return util
            .sendApiRequest(
                "/author/list",
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
    getCategoryDetails(dataId) {
        return util
            .sendApiRequest("/author/" + dataId, "GET", true)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }
    editCategoryRecord(payload) {
        return util.sendApiRequest("/author", "PUT", true, payload).then(
            (response) => {
                return response;
            },
            (error) => {
                throw error;
            }
        );
    }
    deleteCategoryRecord(dataId) {
        return util
            .sendApiRequest("/author/" + dataId, "DELETE", true)
            .then(
                (response) => {
                    return response;
                },
                (error) => {
                    throw new Error(error);
                }
            );
    }

    userList(data) {
        const activity = Object.keys(data).reduce((object, key) => {
            if (data[key] !== "") {
                object[key] = data[key];
            }
            return object;
        }, {});

        return util.sendApiRequest("/author/listauthor", "POST", true, activity).then(
            (response) => {
                return response;
            },
            (error) => {
                throw error;
            }
        );
    }
}