import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CourseService from "../../services/CourseService";
import AddSubTopic from "./AddSubTopic";
const ValidateSchema = Yup.object().shape({
  topic_title: Yup.string().required("Required"),
});
const AddTopic = ({ topicIdx, course, setCourse, setTcourse, setCurrTopicIdx, originalCourse }) => {
  const courseServ = new CourseService();
  const [redBorder, setRedBorder] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      handleBorder()
    }, 500)
  }, [originalCourse, topicIdx])
  // const [initialTopic, setInitialTopic] = useState({
  //   topic_title: "",
  //   sub_topics: []
  // })
  // useEffect(() => {
  //   console.log(topicIdx, "===", course.topics[topicIdx]);
  //   // if (topicIdx < course.topics.length) {
  //   setInitialTopic(course.topics[topicIdx])
  //   // }
  // }, [topicIdx])
  const handleTopicDelete = async () => {
    let obj = {
      topicIdx,
      courseId: course._id,
    }
    try {
      let resp = await courseServ.deleteTopic(obj)
      if (resp.data) {
        setCurrTopicIdx(topicIdx - 1)
        setCourse(resp.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onSubmit = async (values) => {
    console.log(values);
    try {
      values.sub_topics = []
      if (course?._id) {
        let obj = {
          topic: values,
          courseId: course._id,
          topicIdx: topicIdx
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
  const handleBorder = (value) => {
    if (value) {
      if (originalCourse.topics[topicIdx].topic_title !== value) {
        setRedBorder(true)
      } else {
        setRedBorder(false)
      }

    } else {
      if (originalCourse.topics[topicIdx].topic_title !== course.topics[topicIdx].topic_title) {
        setRedBorder(true)
      } else {
        setRedBorder(false)
      }
    }
  }
  const formik = useFormik({
    initialValues: course.topics[topicIdx],
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });
  return (
    <>
      <div className="col-md-12 col-12">
        <div className="form-group mb-3">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="questionfirst" className="form-label">
              Topic Heading <span className="star">*</span>
            </label>
            <div className="col-md-12 col-12 d-flex">
              <div className="col-11 me-1">
                <input
                  type='text'
                  className={`form-control ${redBorder ? "redBorderCustom" : ""}`}
                  id="lesson"
                  placeholder="Enter a heading for this lesson"
                  name="topic_title"
                  onChange={(e) => {
                    formik.handleChange(e)
                    let tc = JSON.parse(JSON.stringify(course))
                    tc.topics[topicIdx].topic_title = e.target.value

                    tc.topics[topicIdx].sub_topics = tc.topics[topicIdx].sub_topics ? tc.topics[topicIdx].sub_topics : []
                    setTcourse(tc)
                    handleBorder(e.target.value)
                  }}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    onSubmit({ ...formik.values, topic_title: e.target.value })
                  }}
                  value={formik.values.topic_title}
                />
                {
                  formik.errors.topic_title ? (
                    <div className="formik-errors bg-error">
                      {formik.errors.topic_title}
                    </div>
                  ) : null}
              </div>
              <button type="submit" className="me-1 btn btnForm fa-sharp fa-solid fa-floppy-disk">
              </button>
              <button type="button" onClick={handleTopicDelete} className="btn btnForm btn-danger fa-sharp fa-solid fa-trash">
              </button>
            </div>
          </form>
        </div>
      </div>
      {course.topics.length > topicIdx &&
        (course.topics[topicIdx].sub_topics ?
          <AddSubTopic setCourse={setCourse} course={course} topicIdx={topicIdx} />
          :
          <div className="valid_feedbackMsg text-center">Please save Title first</div>
        )
      }
    </>
  );
};

export default AddTopic;
