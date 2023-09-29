import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AddQuestions from "./AddQuestopn";
import GlobalContext from "../../context/GlobalContext";
import CourseService from "../../services/CourseService";

const Questions = () => {
  const params = useParams();
  const router = useNavigate();
  const courseServ = new CourseService();
  let initialQuestion = {
    question: "",
    option: ["", "", "", ""],
    correct_answers: [false, false, false, false],
  };
  const [currQueIdx, setCurrQueIdx] = useState(0);
  const [course, setCourse] = useState({
    questions: [{ ...initialQuestion }],
  });

  const ValidateSchema = Yup.object().shape({
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Required"),
        option: Yup.array().of(Yup.string().required("Required")),
        correct_answers: Yup.array().min(1, "Required").of(Yup.boolean()),
      })
    ),
  });

  useEffect(() => {
    if (params?.draftid && params?.id) {
      fetchDraftList();
    } else if (params?.id) {
      getCourseDetails();
    }
  }, []);

  async function getCourseDetails() {
    try{
      let response = await courseServ.getCourse(params?.id)
      if(response) {
        if(response.data.questions.length === 0) {
          response.data.questions.push({ ...initialQuestion });
        }
        setCourse(response.data);
      }
    } catch(err) {
      console.log(err);
    }
  }

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

  const addQuestion = () => {
    let ls = [...formik.values.questions];
    ls.push({ ...initialQuestion });
    setCurrQueIdx(formik.values.questions.length);
    formik.setValues({ ...formik.values, ...{ questions: ls } });
  };

  const onSubmit = (values) => {
    try {
      const formData = new FormData();
      formData.append("_id", course && course._id);
      formData.append("course_name", course && course.course_name);
      formData.append("course_desc", course && course.course_desc);
      formData.append("course_lesson", course && course.course_lesson);
      formData.append("createdBy", course && course.createdBy);
      formData.append("tags", JSON.stringify(course && course.tags));
      formData.append("course_video", course && course.course_video);
      formData.append("cover_image", course && course.cover_image);
      formData.append("read_time", JSON.stringify(course && course.read_time));
      formData.append("rewards", JSON.stringify(course && course.rewards));
      formData.append("total_coins", JSON.stringify(course && course.total_coins));
      formData.append(
        "users_enrolled",
        JSON.stringify(course && course.users_enrolled)
      );
      formData.append("what_you_learn", course && course.what_you_learn);

      if (course.lessons.length) {
        formData.append("lessons", JSON.stringify(course.lessons));
        for (let i = 0; i < course.lessons.length; i++) {
          formData.append(
            `lessons__${i}__file_one`,
            course.lessons[i].file_one
          );
          formData.append(
            `lessons__${i}__file_two`,
            course.lessons[i].file_two
          );
        }
      }
      if (values.questions.length) {
        formData.append("questions", JSON.stringify(values.questions));
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
            toast.success("Question updated successfully");
            window.scroll(0, 0);
            setTimeout(() => {
              if(params?.draftid) {
                router(`/course/review/${params?.id}/${params?.draftid}`);
              } else {
                router(`/course/review/${params?.id}`);
              }
            }, 1500);
          }
        });
    } catch(err) {
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
                  style={{ paddingLeft: "8px" }}
                />
              </Link>
            </div>
            <div className="walletAddressHead accountChangeHead ">
              <h5 className="m-0">
                Create a course -{" "}
                <span style={{ color: "#8a8a8a" }}>Test Section</span>
              </h5>
              <h5>Step 3</h5>
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
              {formik.values.questions.map((les, idx) => {
                return (
                  <li className="page-item" onClick={() => setCurrQueIdx(idx)}>
                    <Link
                      className={
                        "lesson-link " + (currQueIdx == idx ? "active" : "")
                      }
                      // to="/course/create_question"
                      to={
                        params.draftid
                          ? `/course/create_question/${params?.id}/${params.draftid}`
                          : `/course/create_question/${params?.id}`
                      }
                      // to={
                      //   id
                      //     ? `/build_courses/${formik.values._id}`
                      //     : `/build_courses`
                      // }
                    >
                      MCQ {idx + 1}
                    </Link>
                  </li>
                );
              })}
              <li className="page-item" onClick={addQuestion}>
                <Link
                  className="add-lesson-link"
                  to={
                    params.draftid
                      ? `/course/create_question/${params?.id}/${params.draftid}`
                      : `/course/create_question/${params?.id}`
                  }
                >
                  + Add Question
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className=" m-3">
          <div className="row">
            <form onSubmit={formik.handleSubmit}>
              <AddQuestions queIdx={currQueIdx} formik={formik} />
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Questions;
