import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AddTopic from "./AddTopic";
import CourseService from "../../services/CourseService";

const Topic = ({ course, setCourse }) => {
  const [tcourse, setTcourse] = useState(course)
  const params = useParams();
  const router = useNavigate();
  const courseServ = new CourseService();

  const [currTopicIdx, setCurrTopicIdx] = useState(0);

  const addBlankTopic = async () => {
    try {
      if (course?._id) {
        let obj = {
          topic: { topic_title: "", sub_topics: [] },
          courseId: course._id,
          topicIdx: currTopicIdx
        }
        let resp = await courseServ.addTopic(obj)
        if (resp.data) {
          setCourse(resp.data)
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setTcourse(course)
    if (course.topics.length == 0) {
      addLesson()
    }
  }, [course])

  const addLesson = () => {
    let tc = JSON.parse(JSON.stringify(tcourse))
    // let ls = tc.topics
    tc.topics.push({
      topic_title: ""
    });
    setCurrTopicIdx(tc.topics.length - 1);
    setTcourse(tc);
    addBlankTopic()
  };

  return (
    <div>
      <div className="users_bottom_part">

        <div className="numberNext m-3">
          <ul className="pagination">
            {tcourse.topics.map((les, idx) => {
              return (
                <li
                  className="page-item"
                  onClick={() => setCurrTopicIdx(idx)}
                >
                  <Link
                    className={
                      "lesson-link " + (currTopicIdx == idx ? "active" : "")
                    }
                  // to={`/course/create_course/${params?.id}`}
                  >
                    Topic {idx + 1}
                  </Link>
                </li>
              );
            })}
            <li className="page-item" onClick={addLesson}>
              <Link
                className="lesson-link"
              // to={`/course/create_course/${params?.id}`}
              >
                + Add Topic
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className=" m-3">
        <div className="row">
          {tcourse.topics.length > currTopicIdx &&
            <AddTopic setCourse={setCourse} setTcourse={setTcourse} course={tcourse} topicIdx={currTopicIdx} setCurrTopicIdx={setCurrTopicIdx} originalCourse={course} />
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Topic;
