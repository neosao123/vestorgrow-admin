import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AddLesson from "./AddLesson";
import CourseService from "../../services/CourseService";

const Lesson = () => {
  const params = useParams();
  const router = useNavigate();
  const courseServ = new CourseService();
  let initialLesson = {
    lesson: "",
    desc: "",
    file_one: "",
    file_two: "",
  };
  const [course, setCourse] = useState({
    lessons: [{ ...initialLesson }],
  });
  const [currLessonIdx, setCurrLessonIdx] = useState(0);

  useEffect(() => {
    if (params?.draftid && params?.id) {
      fetchDraftList();
    } else if (params?.id) {
      getCourseDetails();
    }
  }, []);

  async function fetchDraftList() {
    if (params?.draftid !== "") {
      let response = await courseServ.getDraftDetails(params?.draftid);
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

  async function getCourseDetails() {
    try {
      let response = await courseServ.getCourse(params?.id);
      if (response) {
        if (response.data.lessons.length === 0) {
          response.data.lessons.push({ ...initialLesson });
        }
        setCourse(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const ValidateSchema = Yup.object().shape({
    lessons: Yup.array().of(
      Yup.object().shape({
        lesson: Yup.string().required("Required"),
        desc: Yup.string().required("Required"),
        // file_one: Yup.string().required("Required"),
        // file_two: Yup.string().required("Required")
        // correct_answers: Yup.array().min(1, "Required").of(Yup.boolean()),
      })
    ),
  });

  const addLesson = () => {
    let ls = [...formik.values.lessons];
    ls.push({ ...initialLesson });
    setCurrLessonIdx(formik.values.lessons.length);
    formik.setValues({ ...formik.values, ...{ lessons: ls } });
  };

  const onSubmit = (values) => {
    try {
      if (params?.id) {
        const formData = new FormData();
        formData.append("_id", course && course._id);
        formData.append("course_name", course && course.course_name);
        formData.append("course_desc", course && course.course_desc);
        formData.append("course_lesson", course && course.course_lesson);
        formData.append("createdBy", course && course.createdBy);
        formData.append("tags", JSON.stringify(course && course.tags));
        formData.append("course_video", course && course.course_video);
        formData.append("cover_image", course && course.cover_image);
        formData.append(
          "read_time",
          JSON.stringify(course && course.read_time)
        );
        formData.append("rewards", JSON.stringify(course && course.rewards));
        formData.append(
          "total_coins",
          JSON.stringify(course && course.total_coins)
        );
        formData.append(
          "users_enrolled",
          JSON.stringify(course && course.users_enrolled)
        );
        formData.append("what_you_learn", course && course.what_you_learn);

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
            if (response.data) {
              toast.success("Lesson updated successfully");
              window.scroll(0, 0);
              setTimeout(() => {
                if (params?.draftid) {
                  router(`/course/create_question/${params?.id}/${params.draftid}`);
                } else {
                  router(`/course/create_question/${params?.id}`);
                }
              }, 1500);
            }
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: course,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });

  return (
    <div className="ljSectionData w-100 clearfix" id="ljSectionData">
      <div className="custom_link">
        <div className="users_bottom_part">
          <div className="total_updates_top ActiveLinks">
            <div className="custom-link_backbtn">
              <Link to="/course">
                <img
                  src="/assets/images/icons/leftarrow.svg"
                  alt="arrow"
                  className="ml-2"
                  style={{ paddingLeft: "10px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">
                Create a course -{" "}
                <span style={{ color: "#8a8a8a" }}>Content Section</span>
              </h5>
              <h5>Step 2</h5>
            </div>
            <div className="d-flex active_link_customs">
              <p className="m-0 pt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          <div className="numberNext m-3">
            <ul className="pagination">
              {formik.values.lessons.map((les, idx) => {
                return (
                  <li
                    className="page-item"
                    onClick={() => setCurrLessonIdx(idx)}
                  >
                    <Link
                      className={
                        "lesson-link " + (currLessonIdx == idx ? "active" : "")
                      }
                      to={`/course/create_lesson/${params?.id}`}
                    >
                      Lesson {idx + 1}
                    </Link>
                  </li>
                );
              })}
              <li className="page-item" onClick={addLesson}>
                <Link
                  className="lesson-link"
                  to={`/course/create_lesson/${params?.id}`}
                >
                  + Add Lesson
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className=" m-3">
          <div className="row">
            <form onSubmit={formik.handleSubmit}>
              <AddLesson lesnIdx={currLessonIdx} formik={formik} />
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Lesson;
