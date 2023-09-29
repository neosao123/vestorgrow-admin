import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"
import CourseService from "../../services/CourseService";
const ValidateSchema = Yup.object().shape({
    topic_title: Yup.string()
});
const AddLessons = ({ topicIdx, subTopicIdx, course, setCourse }) => {
    const [tcourse, setTcourse] = useState(course)
    const [redBorder, setRedBorder] = useState([])
    const [currLessonIdx, setCurrLessonIdx] = useState(0);
    const courseServ = new CourseService();
    // const [initialTopic, setInitialTopic] = useState({
    //     topic_title: "",
    //     sub_topics: [
    //         {
    //             sub_topic_title: "",
    //             lessons: [{
    //                 lesson_title: "",
    //                 desc: "",
    //                 lesson_video: "",
    //                 lesson_cover: "",
    //                 watch_time: 0
    //             }]
    //         }
    //     ]
    // })
    useEffect(() => {
        setTcourse(course)
        setTimeout(() => {
            handleBorder()
        }, 500)
        // if (topicIdx < course.topics.length && course.topics[topicIdx].sub_topics && currLessonIdx < course.topics[topicIdx].sub_topics.length) {
        //     setInitialTopic(course.topics[topicIdx])
        // } else {
        //     setInitialTopic({
        //         topic_title: "",
        //         sub_topics: [
        //             {
        //                 sub_topic_title: "",
        //                 lessons: [{
        //                     lesson_title: "",
        //                     desc: "",
        //                     lesson_video: "",
        //                     lesson_cover: "",
        //                     watch_time: 0
        //                 }]
        //             }
        //         ]
        //     })
        // }
    }, [topicIdx, course])
    const addSubTopic = async () => {
        let ls = [...tcourse.topics[topicIdx].sub_topics[subTopicIdx].lessons];
        ls.push({
            lesson_title: "",
            desc: "",
            lesson_video: "",
            lesson_cover: ""
        });
        setCurrLessonIdx(tcourse.topics[topicIdx].sub_topics[subTopicIdx].lessons.length);
        let obj = tcourse
        obj.topics[topicIdx].sub_topics[subTopicIdx].lessons = ls
        setTcourse({ ...obj });
    };
    const onSubmit = async (values) => {
        try {
            if (course?._id) {
                const formData = new FormData();
                formData.append("lesson_title", values.topics[topicIdx].sub_topics[subTopicIdx].lessons[currLessonIdx].lesson_title);
                formData.append("desc", values.topics[topicIdx]?.sub_topics[subTopicIdx]?.lessons[currLessonIdx].desc);
                formData.append("lessonIdx", currLessonIdx);
                formData.append("subTopicIdx", subTopicIdx);
                formData.append("topicIdx", topicIdx);
                formData.append("courseId", values._id);
                formData.append("lesson_video", values.topics[topicIdx]?.sub_topics[subTopicIdx]?.lessons[currLessonIdx].lesson_video);
                formData.append("lesson_cover", values.topics[topicIdx]?.sub_topics[subTopicIdx]?.lessons[currLessonIdx].lesson_cover);
                const token = window.user ? window.user.token : "no-token";
                const config = {
                    headers: {
                        content: "multipart/form-data",
                        Authorization: "Bearer " + token,
                    },
                };
                axios
                    .post(process.env.REACT_APP_API_BASEURL + "/course/lesson", formData, config)
                    .then(async (response) => {
                        if (response.data) {
                            setCourse(response.data.data)
                            // toast.success("Course added successfully");
                        }
                    });
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleLsnDelete = async (idx) => {
        let obj = {
            topicIdx,
            subTopicIdx,
            courseId: course._id,
            lessonIdx: idx
        }
        try {
            let resp = await courseServ.deleteLesson(obj)
            if (resp.data) {
                setCourse(resp.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleBorder = async (value, type, idx) => {
        if (value) {
            let item = course.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx]
            if (type == "title" && item.lesson_title !== value || type == "desc" && item.desc !== value) {
                setRedBorder([...redBorder, idx])
            } else {
                setRedBorder(redBorder.filter(item => item !== idx))
            }

        }
        else {
            let border = []
            course.topics[topicIdx].sub_topics[subTopicIdx].lessons.map((item, lsnIdx) => {
                let formikItem = formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[lsnIdx]
                if (item.lesson_title !== formikItem.lesson_title || item.desc !== formikItem.desc) {
                    border = [...border, lsnIdx]
                } else {
                    border = border.filter(item => item !== lsnIdx)
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
            <div className="col-md-12 col-12 mt-2">
                <div className="form-group mb-3">
                    {/* <div className="border rounded p-3"> */}

                    <form onSubmit={formik.handleSubmit}>
                        <ul className="list-group">
                            {formik.values.topics[topicIdx]?.sub_topics[subTopicIdx]?.lessons.length > 0 && formik.values.topics[topicIdx]?.sub_topics[subTopicIdx]?.lessons.map((les, idx) => {
                                return (
                                    <li
                                        className={`page-item list-group-item ${redBorder.includes(idx) ? "redBorderCustom" : ""}`}
                                        onClick={() => setCurrLessonIdx(idx)}
                                        key={idx}
                                        style={{ borderTopWidth: "1px" }}
                                    >
                                        <div
                                            className={
                                                " " + (currLessonIdx == idx ? "active" : "")
                                            }
                                        >
                                            <label htmlFor="questionfirst" className="col-2 form-label">
                                                Lesson {idx + 1}<span className="star">*</span>
                                            </label>
                                            <div className="row col-md-12 gx-1 col-12 d-flex">
                                                <div className="col-5">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter a heading for this sub-topic"
                                                        name={`topics.[${topicIdx}].sub_topics.[${subTopicIdx}].lessons.[${idx}].lesson_title`}
                                                        onChange={(e) => {
                                                            formik.handleChange(e);
                                                            handleBorder(e.target.value, "title", idx)
                                                            // handleBorder(formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx], idx)
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx].lesson_title}
                                                    />
                                                    {/* {
                                                        formik.errors.topics[topicIdx]?.sub_topics[subTopicIdx]?.lessons[idx].lesson_title ? (
                                                            <div className="formik-errors bg-error">
                                                                {formik.errors.topics[topicIdx]?.sub_topics[subTopicIdx]?.lessons[idx].lesson_title}
                                                            </div>
                                                        ) : null} */}
                                                </div>
                                                <div className="col-7">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter a discription for this lesson"
                                                        name={`topics.[${topicIdx}].sub_topics.[${subTopicIdx}].lessons.[${idx}].desc`}
                                                        onChange={(e) => {
                                                            formik.handleChange(e);
                                                            handleBorder(e.target.value, "desc", idx)
                                                            // handleBorder(formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx], idx)
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.topics[topicIdx]?.sub_topics[subTopicIdx]?.lessons[idx].desc}
                                                    />
                                                    {/* {
                                                        formik.errors.topics[topicIdx]?.sub_topics[subTopicIdx]?.lessons[idx].desc ? (
                                                            <div className="formik-errors bg-error">
                                                                {formik.errors.topics[topicIdx]?.sub_topics[subTopicIdx]?.lessons[idx].desc}
                                                            </div>
                                                        ) : null} */}
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-12 d-flex mt-2">
                                                <div className="col-5 me-2">
                                                    <div className="d-flex">
                                                        <label className="me-2">Cover Image<span className="star">*</span></label>
                                                        {typeof formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx].lesson_cover == "string" ?
                                                            formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx].lesson_cover !== "" ?
                                                                <a href={formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx].lesson_cover} target="blank">view image</a>
                                                                : ""
                                                            :
                                                            <a href={URL.createObjectURL(formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx].lesson_cover)} target="blank">view image</a>
                                                        }
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        id="cover_image"
                                                        name={`topics.[${topicIdx}].sub_topics.[${subTopicIdx}].lessons.[${idx}].lesson_cover`}
                                                        // onChange={formik.handleChange}
                                                        onChange={(event) => {
                                                            formik.setFieldValue(
                                                                `topics.[${topicIdx}].sub_topics.[${subTopicIdx}].lessons.[${idx}].lesson_cover`,
                                                                event.currentTarget.files[0]
                                                            )
                                                            // handleBorder(formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx], idx)
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                    // value={formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx].lesson_cover}
                                                    />
                                                </div>
                                                <div className="col-5 me-2">
                                                    <div className="d-flex">
                                                        <label className="me-2">Video<span className="star">*</span></label>
                                                        {typeof formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx].lesson_video == "string" ?
                                                            formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx].lesson_video !== "" ?
                                                                <a href={formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx].lesson_video} target="blank">view video</a>
                                                                : ""
                                                            :
                                                            <a href={URL.createObjectURL(formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx].lesson_video)} target="blank">view video</a>
                                                        }
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        id="cover_video"
                                                        name={`topics.[${topicIdx}].sub_topics.[${subTopicIdx}].lessons.[${idx}].lesson_video`}
                                                        onChange={(event) => {
                                                            formik.setFieldValue(
                                                                `topics.[${topicIdx}].sub_topics.[${subTopicIdx}].lessons.[${idx}].lesson_video`,
                                                                event.currentTarget.files[0]
                                                            )
                                                            // handleBorder(formik.values.topics[topicIdx].sub_topics[subTopicIdx].lessons[idx], idx)
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                </div>
                                                <div className=" col-1 mt-4 d-flex">
                                                    <button type="submit" className="me-1 btn btnForm fa-sharp fa-solid fa-floppy-disk">
                                                    </button>
                                                    <button type="button" onClick={() => handleLsnDelete(idx)} className="btn btnForm btn-danger fa-sharp fa-solid fa-trash">
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                );
                            })}
                            <li className="page-item list-group-item" onClick={addSubTopic}>
                                <Link
                                    className="btn btnForm"
                                >
                                    + Add New Lessons
                                </Link>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddLessons;
