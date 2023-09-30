import util from "../util/util";
export default class NewsCategoryService {
    addCategoryRecord(payload) {
        return util
            .sendApiRequest("/newscategory", "POST", true, payload)
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
                "/newscategory/list",
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
            .sendApiRequest("/newscategory/" + dataId, "GET", true)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    }
    editCategoryRecord(payload) {
        return util.sendApiRequest("/newscategory", "PUT", true, payload).then(
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
            .sendApiRequest("/newscategory/" + dataId, "DELETE", true)
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