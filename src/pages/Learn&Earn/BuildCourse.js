import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import AddQuestions from "./AddQuestions";
import CourseService from "../../services/CourseService";
import { DropdownButton, Dropdown } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import AddLesson from "./AddLesson";
import TagsInput from "./TagsInput";

export default function BuildCourse() {
  let initialQuestion = {
    question: "",
    option: ["", "", "", ""],
    correct_answers: [false, false, false, false],
  };
  let initialLesson = {
    lesson: "",
    desc: "",
    file_one: "",
    file_two: "",
  };
  const [course, setCourse] = useState({
    _id: "",
    course_name: "",
    article: "",
    what_you_learn: "",
    file: "",
    is_publish: false,
    users_enrolled: 0,
    rewards: 0,
    total_coins: 0,
    author_name: "",
    tags: [],
    questions: [{ ...initialQuestion }],
    lessons: [{ ...initialLesson }],
  });
  const [fileChange, setFileChange] = useState("");
  const [currQueIdx, setCurrQueIdx] = useState(0);
  const [currLessonIdx, setCurrLessonIdx] = useState(0);
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    searchTxt: "",
    searchField: "",
  });

  const [draftList, setDraftList] = useState([]);
  const [courseTitle, setCourseTitle] = useState("View Drafts");
  const [draftId, setDraftId] = useState("");

  const coverImageInputRef = React.useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const courseServ = new CourseService();

  useEffect(() => {
    getCourseDetails();
  }, []);

  const getCourseDetails = async () => {
    try {
      if (id !== undefined) {
        let response = await courseServ.getCourse(id);
        if (response.data) {
          setCourse(response.data);
          setDraftList(response.draftDetails);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetch() {
      if (draftId !== "") {
        let response = await courseServ.getDraftDetails(draftId);
        if (response.data) {
          let courseObj = response.data;
          let draftObj = {
            ...courseObj,
            _id: response.data.course_id,
          };
          delete draftObj.course_id;
          setCourse(draftObj);
        }
      }
    }
    fetch();
  }, [draftId]);

  const handleChangeFile = (e) => {
    let uploadImage = e.target.files[0];
    setFileChange(uploadImage);
  };

  const addQuestion = () => {
    let qs = [...formik.values.questions];
    qs.push({ ...initialQuestion });
    setCurrQueIdx(formik.values.questions.length);
    formik.setValues({ ...formik.values, ...{ questions: qs } });
  };

  const addLesson = () => {
    let ls = [...formik.values.lessons];
    ls.push({ ...initialLesson });
    setCurrLessonIdx(formik.values.lessons.length);
    formik.setValues({ ...formik.values, ...{ lessons: ls } });
  };

  const handleNextQuestion = (qidx) => {
    if (formik.values.questions.length - 1 === qidx) {
      return;
    } else {
      let qi = qidx + 1;
      setCurrQueIdx(qi);
    }
  };

  const handlePrevQuestion = (qidx) => {
    let qi = qidx - 1;
    if (qi < 0) {
      qi = formik.values.questions.length - 1;
    } else {
      setCurrQueIdx(qi);
    }
  };

  const callBackTags = (tags) => {
    formik.setFieldValue("tags", tags);
  };

  const onSubmit = async (formValues) => {
    let values = { ...formValues };
    try {
      if (id || draftId !== "") {
        const formData = new FormData();
        formData.append("course_name", values.course_name);
        formData.append("article", values.article);
        formData.append("what_you_learn", values.what_you_learn);
        formData.append("author_name", values.author_name);
        formData.append("file", values.file);
        formData.append("tags", JSON.stringify(values.tags));
        formData.append("_id", values._id);
        if (values.questions.length) {
          formData.append("questions", JSON.stringify(values.questions));
        }

        if (values.lessons.length) {
          formData.append("lessons", JSON.stringify(values.lessons));
          for (let i = 0; i < values.lessons.length; i++) {
            formData.append(
              `lessons__${i}__file_one`,
              values.lessons[i].file_one
            );
            formData.append(
              `lessons__${i}__file_two`,
              values.lessons[i].file_two
            );
          }
        }

        const token = window.user ? window.user.token : "no-token";
        const config = {
          headers: {
            content: "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        axios
          .put(process.env.REACT_APP_API_BASEURL + "/course", formData, config)
          .then(async (response) => {
            if (response.data.message) {
              window.scroll(0, 0);
              toast.success("Course updated successfully");
              setTimeout(() => {
                navigate("/current_courses");
              }, 2000);
            }
          });
      } else {
        const formData = new FormData();
        formData.append("course_name", values.course_name);
        formData.append("article", values.article);
        formData.append("what_you_learn", values.what_you_learn);
        formData.append("author_name", values.author_name);
        formData.append("tags", JSON.stringify(values.tags));
        formData.append("file", values.file);
        if (values.questions.length) {
          formData.append("questions", JSON.stringify(values.questions));
        }

        if (values.lessons.length) {
          formData.append("lessons", JSON.stringify(values.lessons));
          for (let i = 0; i < values.lessons.length; i++) {
            formData.append(
              `lessons__${i}__file_one`,
              values.lessons[i].file_one
            );
            formData.append(
              `lessons__${i}__file_two`,
              values.lessons[i].file_two
            );
          }
        }

        const token = window.user ? window.user.token : "no-token";
        const config = {
          headers: {
            content: "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        };
        axios
          .post(process.env.REACT_APP_API_BASEURL + "/course", formData, config)
          .then(async (response) => {
            if (response.data) {
              window.scroll(0, 0);
              toast.success("Course added successfully");
              setTimeout(() => {
                navigate("/current_courses");
              }, 1500);
            }
          });
      }
    } catch (err) {
      console.log(err);
      throw err;
    }

    // try {
    //   if (id || draftId !== "") {
    //     let response = await courseServ.editCourse(values);
    //     if (response.result.data) {
    //       // Add draft
    //       let draftObj = {
    //         ...values,
    //         course_id: response.result.data._id,
    //       };
    //       delete draftObj._id;
    //       delete draftObj.createdAt;
    //       delete draftObj.updatedAt;
    //       let draftResponse = await courseServ.addDraft(draftObj);
    //       if (fileChange) {
    //         const formData = new FormData();
    //         formData.append("file", fileChange);
    //         formData.append("_id", course._id);

    //         const token = window.user ? window.user.token : "no-token";
    //         const config = {
    //           headers: {
    //             content: "multipart/form-data",
    //             Authorization: "Bearer " + token,
    //           },
    //         };
    //         axios
    //           .post(
    //             process.env.REACT_APP_API_BASEURL + "/admin/course/userimage",
    //             formData,
    //             config
    //           )
    //           .then(async (fileResp) => {
    //             if (fileResp.data.message) {
    //               let objDraft = {
    //                 ...draftResponse.data,
    //                 file: fileResp.data.result.data.file,
    //               };
    //               let messageResp = await courseServ.editDraft(objDraft);
    //             }
    //           });
    //       }
    //       window.scroll(0, 0);
    //       toast.success("Course updated successfully");
    //       setTimeout(() => {
    //         navigate("/current_courses");
    //       }, 2000);
    //     }
    //   } else {
    //     delete values._id;
    //     let response = await courseServ.addCourse(values);
    //     if (response.data) {
    //       let draftObj = {
    //         ...values,
    //         course_id: response.data._id,
    //       };

    //       let draftResp = await courseServ.addDraft(draftObj);

    //       const formData = new FormData();
    //       formData.append("file", fileChange);
    //       formData.append("_id", response.data._id);

    //       const token = window.user ? window.user.token : "no-token";
    //       const config = {
    //         headers: {
    //           content: "multipart/form-data",
    //           Authorization: "Bearer " + token,
    //         },
    //       };
    //       axios
    //         .post(
    //           process.env.REACT_APP_API_BASEURL + "/admin/course/userimage",
    //           formData,
    //           config
    //         )
    //         .then(async (res) => {
    //           if (res.data.message) {
    //             let objDraft = {
    //               ...draftResp.data,
    //               file: res.data.result.data.file
    //             }
    //             let messageResp = await courseServ.editDraft(objDraft);

    //             if(messageResp.message) {
    //               toast.success("Course added successfully");
    //               setTimeout(() => {
    //                 navigate("/current_courses");
    //               }, 1500);
    //             }
    //           }
    //         });
    //     } else {
    //       console.log(error);
    //     }
    //   }
    // } catch (err) {
    //   console.log(err, "Error");
    //   throw err;
    // }
  };

  const ValidateSchema = Yup.object().shape({
    course_name: Yup.string().required("Required"),
    article: Yup.string().required("Required"),
    what_you_learn: Yup.string().required("Required"),
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Required"),
        option: Yup.array().of(Yup.string().required("Required")),
        correct_answers: Yup.array().min(1, "Required").of(Yup.boolean()),
      })
    ),
    lessons: Yup.array().of(
      Yup.object().shape({
        lesson: Yup.string().required("Required"),
        // desc: Yup.array().of(Yup.string().required("Required")),
        // correct_answers: Yup.array().min(1, "Required").of(Yup.boolean()),
      })
    ),
  });

  const formik = useFormik({
    initialValues: course,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });

  function handleSelect(val, id) {
    setCourseTitle(moment(val).format("MMMM Do YYYY, hh:mm A"));
    setDraftId(id);
    // getDraftList();
  }

  let courseDraft = draftList.map((el) => {
    return (
      <Dropdown.Item
        key={"id" + el._id}
        onClick={(e) => handleSelect(el.createdAt, el._id)}
        eventKey={el.createdAt}
      >
        {moment(el.createdAt).format("MMMM Do YYYY, h:mm a")}
      </Dropdown.Item>
    );
  });

  return (
    <div
      className="ljSectionData w-100 clearfix buildACourses mb-4"
      id="buildACourses"
    >
      <div className="buildCourseSection">
        <div className="row">
          <div className="col-md-6 pr-3 pr-md-0">
            <div className="build_coursebox courses_box flex-wrap h-100">
              <div className="coursebox_left">
                <div className="course_heading">
                  <h4>
                    <img
                      src="/assets/images/icons/manage_reward_img.png"
                      className="me-2"
                      width="20px;"
                      height="20px;"
                    />
                    MANAGE REWARDS STORE
                  </h4>
                </div>
                <div className="course_para">
                  <p>
                    Lorem impsum smaple text will be placed here. Lorem impsum.
                  </p>
                </div>
              </div>
              <div className="coursebox_right">
                <Link to="/manage_reward_store">MANAGE</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 pl-3 pl-md-0 mt_30 mt-md-0">
            <div className="build_coursebox courses_box flex-wrap h-100">
              <div className="coursebox_left">
                <div className="course_heading">
                  <h4>
                    <img
                      src="/assets/images/icons/current_course_img.png"
                      className="me-2"
                      width="20px;"
                      height="20px;"
                    />
                    CURRENT COURSES
                  </h4>
                </div>
                <div className="course_para">
                  <p>
                    Lorem impsum smaple text will be placed here. Lorem impsum.
                  </p>
                </div>
              </div>
              <div className="coursebox_right">
                <Link to="/current_courses">VIEW</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="buildCourseArea">
          <div className="d-flex justify-content-between align-items-center publishMintOne">
            <div className="build">
              <span>BUILD A COURSE</span>
            </div>
            {/* <div className="viewDraft">
              <Link to="#" className="btn btn-outline-dark">
                View Drafts
              </Link>
            </div> */}

            <DropdownButton id="dropdown-basic-button" title={courseTitle}>
              {/* <Dropdown.Item eventKey="">Select</Dropdown.Item> */}
              <div className="cards">{courseDraft}</div>
            </DropdownButton>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="buildForm">
              <div className="w-100 profileInfo">
                <div className="d-flex justify-content-between profileGroup">
                  <div className="childGroupOne">
                    <div className="form-group">
                      <label htmlFor="coursename" className="form-label">
                        Course Name <span className="star">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="course_name"
                        placeholder="Enter course name"
                        name="course_name"
                        value={formik.values.course_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.course_name ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.course_name}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group mb-0">
                      <label htmlFor="article" className="form-label">
                        Article <span className="star">*</span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="article"
                        placeholder="Enter article"
                        name="article"
                        rows="14"
                        value={formik.values.article}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.article ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.article}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group mb-0">
                      <label htmlFor="article" className="form-label">
                        What you learn? <span className="star">*</span>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="what_you_learn"
                        placeholder="Enter what you learn"
                        name="what_you_learn"
                        rows="7"
                        value={formik.values.what_you_learn}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.what_you_learn ? (
                        <div className="formik-errors bg-error">
                          {formik.errors.what_you_learn}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="childGroupTwo">
                    <div className="uploadDiv">
                      <div className="uploadImg">
                        <img
                          src={formik.values.file}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "fill",
                          }}
                          alt=""
                          className="img-fulid"
                        />
                      </div>
                      <div className="uploadBtn text-center">
                        <Link
                          to={
                            id
                              ? `/build_courses/${formik.values._id}`
                              : `/build_courses`
                          }
                          className="btn"
                          onClick={() => {
                            coverImageInputRef.current.click();
                          }}
                        >
                          Upload Cover Image
                        </Link>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          id="file"
                          ref={coverImageInputRef}
                          name="file"
                          // onChange={handleChangeFile}
                          onChange={(event) => {
                            formik.setFieldValue(
                              "file",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="publishStatus">
                      <div className="publishButton">
                        <button
                          type="button"
                          className="btn"
                          data-bs-toggle="collapse"
                          data-bs-target="#publish"
                        >
                          <div className="d-flex justify-content-between">
                            <span className="">Publish</span>
                            <img src="/assets/images/icons/Polygon_2.svg" />
                          </div>
                        </button>
                        <div id="publish" className="collapse">
                          <div className="p-3 publishFormDiv">
                            {/* <form action="" method="" id=""> */}
                            <div className="d-flex publishStatusDiv mb-3">
                              <div className="me-3">
                                <span>Status : </span>
                              </div>
                              <div className="form-check me-3">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  id="draftradio"
                                  name="statusradio"
                                  value="Draft"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="draftradio"
                                >
                                  Draft
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  id="publishradio"
                                  name="statusradio"
                                  value="Publish"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="publishradio"
                                >
                                  Publish
                                </label>
                              </div>
                            </div>
                            <div className="d-flex publishTimeDiv">
                              <div className="">
                                <span>Time : </span>
                              </div>
                              <div className="form-check">
                                <input
                                  type="date"
                                  id="publishtime"
                                  name="publishtime"
                                />
                              </div>
                            </div>
                            {/* </form> */}
                          </div>
                        </div>
                      </div>
                      <div className="authorBtn">
                        <button
                          type="button"
                          className="btn"
                          data-bs-toggle="collapse"
                          data-bs-target="#author"
                        >
                          <div className="d-flex justify-content-between">
                            <span className="">Author</span>
                            <img src="/assets/images/icons/Polygon_2.svg" />
                          </div>
                        </button>
                        <div id="author" className="collapse">
                          <div className="p-3 autohrDiv">
                            {/* <span>Lorem ipsum dolor text....</span> */}
                            <input
                              type="text"
                              className="form-control"
                              id="author_name"
                              placeholder="Enter author name"
                              name="author_name"
                              value={formik.values.author_name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="levelBtn">
                        <button
                          type="button"
                          className="btn"
                          data-bs-toggle="collapse"
                          data-bs-target="#level"
                        >
                          <div className="d-flex justify-content-between">
                            <span className="">Tags</span>
                            <img src="/assets/images/icons/Polygon_2.svg" />
                          </div>
                        </button>
                        <div id="level" className="collapse">
                          <div className="p-3 levelDiv">
                            {/* <span>Lorem ipsum dolor text....</span> */}
                            <TagsInput
                              callBackTags={callBackTags}
                              tags={formik.values.tags}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="addQuestionsForm">
              <div className="d-flex justify-content-between align-items-center questionDiv">
                <div className="questionCourse">
                  <span>Add Lesson</span>
                </div>
                <div className="numberNext">
                  <ul className="pagination">
                    {formik.values.lessons.map((les, idx) => {
                      return (
                        <li
                          className="page-item"
                          onClick={() => setCurrLessonIdx(idx)}
                        >
                          <Link
                            className={
                              "page-link " +
                              (currLessonIdx == idx ? "active" : "")
                            }
                            // to="/build_courses"
                            to={
                              id
                                ? `/build_courses/${formik.values._id}`
                                : `/build_courses`
                            }
                          >
                            {idx + 1}
                          </Link>
                        </li>
                      );
                    })}
                    <li className="page-item" onClick={addLesson}>
                      <Link
                        className="page-link"
                        to={
                          id
                            ? `/build_courses/${formik.values._id}`
                            : `/build_courses`
                        }
                      >
                        +
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="questionsFormDiv">
                <div className="row">
                  <AddLesson lesnIdx={currLessonIdx} formik={formik} />
                </div>
              </div>
            </div>
            <div className="addQuestionsForm">
              <div className="d-flex justify-content-between align-items-center questionDiv">
                <div className="questionCourse">
                  <span>Add Questions to Course</span>
                </div>
                <div className="numberNext">
                  <ul className="pagination">
                    {formik.values.questions.map((qtn, idx) => {
                      return (
                        <li
                          className="page-item"
                          onClick={() => setCurrQueIdx(idx)}
                        >
                          <Link
                            className={
                              "page-link " + (currQueIdx == idx ? "active" : "")
                            }
                            // to="/build_courses"
                            to={
                              id
                                ? `/build_courses/${formik.values._id}`
                                : `/build_courses`
                            }
                          >
                            {idx + 1}
                          </Link>
                        </li>
                      );
                    })}
                    <li className="page-item" onClick={addQuestion}>
                      <Link
                        className="page-link"
                        to={
                          id
                            ? `/build_courses/${formik.values._id}`
                            : `/build_courses`
                        }
                      >
                        +
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Add question section */}
              <div className="questionsFormDiv">
                <div className="row">
                  <AddQuestions queIdx={currQueIdx} formik={formik} />

                  <div className="col-12">
                    <div className="prevNextDiv">
                      <ul className="pagination justify-content-end">
                        <li className="page-item">
                          <Link
                            className="page-link"
                            // to="/build_courses"
                            to={
                              id
                                ? `/build_courses/${formik.values._id}`
                                : `/build_courses`
                            }
                            onClick={() => handlePrevQuestion(currQueIdx)}
                          >
                            PREV
                          </Link>
                        </li>
                        <li className="page-item">
                          <Link
                            className="page-link"
                            // to="/build_courses"
                            to={
                              id
                                ? `/build_courses/${formik.values._id}`
                                : `/build_courses`
                            }
                            onClick={() => handleNextQuestion(currQueIdx)}
                          >
                            NEXT
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="buildPublishBtn">
              <div className="form-group my-0">
                <button type="submit" className="btn publishBtn">
                  PUBLISH
                </button>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
