import util from "../util/util";

export default class CourseService {
  addCourse(payload) {
    return util
      .sendApiRequest("/course", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  editCourse(payload) {
    return util
      .sendApiRequest("/course", "PUT", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  addTopic(payload) {
    return util
      .sendApiRequest("/course/topic", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  addSubTopic(payload) {
    return util
      .sendApiRequest("/course/subtopic", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  deleteLesson(payload) {
    return util
      .sendApiRequest("/course/lesson/delete", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  deleteSubTopic(payload) {
    return util
      .sendApiRequest("/course/subtopic/delete", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  deleteTopic(payload) {
    return util
      .sendApiRequest("/course/topic/delete", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
  addUserImage(payload) {
    return util
      .sendApiRequest("/course/userimage", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  async courseList(data) {
    try {
      const course = Object.keys(data).reduce((object, key) => {
        if (data[key] !== "") {
          object[key] = data[key];
        }
        return object;
      }, {});
      return await util.sendApiRequest("/course/list", "POST", true, course);
    } catch (err) {
      throw err;
    }
  }

  async getCourse(courseId) {
    try {
      return await util.sendApiRequest("/course/" + courseId, "GET", true);
    } catch (err) {
      throw err;
    }
  }

  deleteCourse(id) {
    return util.sendApiRequest("/course/" + id, "DELETE", true).then(
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
      .sendApiRequest("/course/active", "PUT", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  addDraft(payload) {
    return util
      .sendApiRequest("/course/draft", "POST", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  editDraft(payload) {
    return util
      .sendApiRequest("/course/draft", "PUT", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }

  async draftList(data) {
    try {
      const course = Object.keys(data).reduce((object, key) => {
        if (data[key] !== "") {
          object[key] = data[key];
        }
        return object;
      }, {});
      return await util.sendApiRequest(
        "/course/draft/list",
        "POST",
        true,
        course
      );
    } catch (err) {
      throw err;
    }
  }

  async getDraftDetails(id) {
    try {
      return await util.sendApiRequest("/course/draft/" + id, "GET", true);
    } catch (err) {
      throw err;
    }
  }

  deleteDraft(dataId) {
    return util.sendApiRequest("/course/draft/" + dataId, "DELETE", true).then(
      (response) => {
        return response;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  activeToggleDraft(payload) {
    return util
      .sendApiRequest("/course/draft/active", "PUT", true, payload)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  }
}
