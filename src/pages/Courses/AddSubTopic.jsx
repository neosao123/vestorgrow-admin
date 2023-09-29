import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CourseService from "../../services/CourseService";
import AddLessons from "./AddLessons";
const ValidateSchema = Yup.object().shape({
  topic_title: Yup.string().required("Required"),
});
const AddSubTopic = ({ topicIdx, course, setCourse }) => {
  const [tcourse, setTcourse] = useState(course)
  const [redBorder, setRedBorder] = useState([])
  const [currSubTopicIdx, setCurrSubTopicIdx] = useState(0);
  const courseServ = new CourseService();
  const [subTitleIdx, setSubTitleIdx] = useState(-1)
  const [titleIdx, setTitleIdx] = useState(-1)
  // const [initialTopic, setInitialTopic] = useState({
  //   topic_title: "",
  //   sub_topics: [
  //     {
  //       sub_topic_title: "",
  //       lessons: [{
  //         lesson_title: "",
  //         desc: "",
  //         lesson_video: "",
  //         lesson_cover: "",
  //         watch_time: 0
  //       }]
  //     }
  //   ]
  // })
  useEffect(() => {
    setTcourse(course)
    setTimeout(() => {
      handleBorder()
    }, 500)
    // if (topicIdx < course.topics.length && course.topics[topicIdx].sub_topics && currSubTopicIdx < course.topics[topicIdx].sub_topics.length) {
    //   setInitialTopic(course.topics[topicIdx])
    // } else {
    //   setInitialTopic({
    //     topic_title: "",
    //     sub_topics: [
    //       {
    //         sub_topic_title: "",
    //         lessons: [{
    //           lesson_title: "",
    //           desc: "",
    //           lesson_video: "",
    //           lesson_cover: "",
    //           watch_time: 0
    //         }]
    //       }
    //     ]
    //   })
    // }
  }, [topicIdx, course])
  const addSubTopic = () => {
    let ls = [...tcourse.topics[topicIdx].sub_topics];
    ls.push({ sub_topic_title: "" });
    setCurrSubTopicIdx(tcourse.topics[topicIdx].sub_topics.length);
    let obj = tcourse
    obj.topics[topicIdx].sub_topics = ls
    setTcourse({ ...obj });
  };
  const onSubmit = async (values) => {
    try {
      if (course?._id) {
        let obj = {
          topic: values,
          courseId: course._id
        }
        let resp = await courseServ.addTopic(obj)
        if (resp.data) {
          setCourse(resp.data)
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handlesubTopicDelete = async (idx) => {
    let obj = {
      topicIdx,
      subTopicIdx: idx,
      courseId: course._id,
    }
    try {
      let resp = await courseServ.deleteSubTopic(obj)
      if (resp.data) {
        setCourse(resp.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const saveSub_topic = async (value, idx) => {
    try {
      if (course?._id) {
        let obj = {
          sub_topic_title: value,
          courseId: course._id,
          topicIdx: topicIdx,
          subTopicIdx: idx
        }
        // await setTimeout(async () => {
        let resp = await courseServ.addSubTopic(obj)
        if (resp.data) {
          setCourse(resp.data)
        }
        // }, 1000);
      }
    } catch (err) {
      console.log(err);
    }

  }
  const handleBorder = async (value, idx) => {
    if (value) {
      if (course.topics[topicIdx].sub_topics[idx].sub_topic_title !== value) {
        setRedBorder([...redBorder, idx])
      } else {
        setRedBorder(redBorder.filter(item => item !== idx))
      }

    }
    else {
      let border = []
      course.topics[topicIdx].sub_topics.map((item, subIdx) => {
        if (item.sub_topic_title !== formik.values.topics[topicIdx].sub_topics[subIdx].sub_topic_title) {
          border = [...border, subIdx]
        } else {
          border = border.filter(item => item !== subIdx)
        }
      })
      setRedBorder([...border])
    }
  }
  const formik = useFormik({
    initialValues: tcourse,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });
  return (
    <>
      <div className="col-md-12 col-12">
        <div className="form-group mb-3">
          {/* <form onSubmit={formik.handleSubmit}> */}
          {/* <div className="border rounded p-3"> */}

          <ul className="list-group">
            {course.topics[topicIdx].sub_topics && course.topics[topicIdx].sub_topics.map((les, idx) => {
              return (
                <li
                  className="page-item list-group-item"
                  onClick={() => setCurrSubTopicIdx(idx)}
                >
                  <Link
                    className={
                      " " + (currSubTopicIdx == idx ? "active" : "")
                    }
                  // to={`/course/create_course/${params?.id}`}
                  >
                    <div className="col-md-12 col-12 d-flex">
                      <label htmlFor="questionfirst" className="col-1 form-label" style={{ width: "140px" }}>
                        Sub-Topic {idx + 1}<span className="star">*</span>
                      </label>
                      <div className="col-9 me-1">
                        <input
                          type="text"
                          className={`form-control ${redBorder.includes(idx) ? "redBorderCustom" : ""}`}
                          id="lesson"
                          placeholder="Enter a heading for this sub-topic"
                          name={`topics.[${topicIdx}].sub_topics.[${idx}].sub_topic_title`}
                          onChange={(e) => { formik.handleChange(e); handleBorder(e.target.value, idx) }}
                          onBlur={formik.handleBlur}
                          // onBlur={(e) => saveSub_topic(e.target.value, idx)}
                          value={formik.values.topics[topicIdx].sub_topics[idx].sub_topic_title}
                        />
                        {/* {
                          formik.errors.topic_title ? (
                            <div className="formik-errors bg-error">
                              {formik.errors.topic_title}
                            </div>
                          ) : null} */}
                      </div>
                      <button type="button" onClick={() => saveSub_topic(formik.values.topics[topicIdx].sub_topics[idx].sub_topic_title, idx)} className="me-1 btn btnForm fa-sharp fa-solid fa-floppy-disk">
                      </button>
                      <button onClick={() => {
                        if (idx !== subTitleIdx) {
                          setSubTitleIdx(idx);
                        } else {
                          setSubTitleIdx(-1);
                        }
                        setTitleIdx(topicIdx)
                      }}
                        className="me-1 btn btnForm fa-sharp fa-solid fa-info">
                      </button>
                      <button type="button" onClick={() => handlesubTopicDelete(idx)} className="btn btnForm btn-danger fa-sharp fa-solid fa-trash">
                      </button>
                    </div>
                  </Link>
                  {topicIdx == titleIdx && subTitleIdx == idx &&
                    (tcourse.topics[topicIdx].sub_topics[idx].lessons ?
                      <AddLessons setCourse={setCourse} course={tcourse} topicIdx={topicIdx} subTopicIdx={idx} /> :
                      <div className="valid_feedbackMsg text-center">Please save sub-title first</div>)}
                </li>
              );
            })}
            <li className="page-item list-group-item" onClick={addSubTopic}>
              <Link
                className="btn btnForm"
              >
                + Add New Sub-Topic
              </Link>
            </li>
          </ul>
          {/* </form> */}
        </div>
      </div>
    </>
  );
};

export default AddSubTopic;
