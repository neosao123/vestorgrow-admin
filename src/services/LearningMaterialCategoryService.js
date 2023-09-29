import util from "../util/util";
export default class LearningMaterialCategoryService {
  addCategoryRecord(payload) {
    return util
      .sendApiRequest("/learningmaterial_category", "POST", true, payload)
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
        "/learningmaterial_category/list",
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
      .sendApiRequest("/learningmaterial_category/" + dataId, "GET", true)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  editCategoryRecord(payload) {
    return util.sendApiRequest("/learningmaterial_category", "PUT", true, payload).then(
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
      .sendApiRequest("/learningmaterial_category/" + dataId, "DELETE", true)
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
