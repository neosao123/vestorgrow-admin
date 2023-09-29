import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import CourseService from "../../services/CourseService";

function Review() {
  const params = useParams();
  const courseServ = new CourseService();
  const router = useNavigate();
  const [course, setCourse] = useState({});

  useEffect(() => {
    getCourseDetails();
  }, []);

  async function getCourseDetails() {
    try {
      let response = await courseServ.getCourse(params?.id);
      if (response) {
        response.data.author_name =
          response.author && response.author.user_name;
        setCourse(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getFileName = (filename) => {
    let fileExt = filename.split(".").pop();
    return fileExt;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("_id", course._id);
      formData.append("course_name", course.course_name);
      formData.append("course_desc", course.course_desc);
      formData.append("course_lesson", course.course_lesson);
      formData.append("createdBy", course.createdBy);
      formData.append("tags", JSON.stringify(course.tags));
      formData.append("course_video", course.course_video);
      formData.append("cover_image", course.cover_image);
      formData.append("read_time", JSON.stringify(course.read_time));
      formData.append("rewards", JSON.stringify(course.rewards));
      formData.append("total_coins", JSON.stringify(course.total_coins));
      formData.append("users_enrolled", JSON.stringify(course.users_enrolled));
      formData.append("what_you_learn", course.what_you_learn);
      formData.append("is_publish", true);
      if (course.questions.length) {
        formData.append("questions", JSON.stringify(course.questions));
      }
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
            toast.success("Course updated successfully");
            window.scroll(0, 0);
            setTimeout(() => {
              router("/course");
            }, 1500);
          }
        });
    } catch (err) {
      throw err;
    }
  };

  let courseLesson;
  let crsLesson = course.course_lesson && course.course_lesson.split(".");
  courseLesson = Array.isArray(course.tags)
    ? "👉 " + crsLesson.join(" 👉 ")
    : crsLesson;

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
                <span style={{ color: "#8a8a8a" }}>Review</span>
              </h5>
              <h5>Step 4</h5>
            </div>
            <div className="d-flex active_link_customs">
              <p className="m-0 pt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="numberNext m-3">
              <div
                className="review_section"

              >
                <div className="total_updates_top" style={{ minHeight: "530px" }}>
                  <div className="row">
                    <div className="col-md-4 ">
                      <label className="form-label">Cover Image</label>
                      <div className="cover-image">
                        <img
                          width="100%"
                          height="100%"
                          className="img-fulid"
                          src={course.cover_image}
                          alt="img"
                          style={{ borderRadius: "7px" }}
                        />
                      </div>
                      <label className="form-label mt-3">Video: </label>
                      <div className="cover-video">
                        {course.course_video && (
                          <video
                            width="100%"
                            controls
                            style={{ borderRadius: "7px" }}
                          >
                            <source src={course.course_video} />
                          </video>
                        )}
                      </div>
                    </div>
                    <div className="col-md-8 mt-4">
                      <h6>Title: <span>{course.course_name}</span></h6>
                      <h6>
                        Tags:{" "}
                        <span>{Array.isArray(course.tags)
                          ? course.tags.join(", ")
                          : course.tags}</span>
                      </h6>
                      <h6>Reward: <span>{course.rewards}</span> </h6>
                      <h6>
                        Author: <span>{course.author_name ? course.author_name : ""}</span>
                      </h6>
                      <h6>Read Time: <span>{course.read_time}</span> </h6>
                      <h6>{course.article}</h6>
                      <p className="mt-4">
                        <b>Lessons:</b>
                        <span>{courseLesson}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="total_updates_top">
                  <div className="row">
                    {course &&
                      course.lessons &&
                      course.lessons.map((lesson, idx) => {
                        return (
                          <>
                            <div className="">
                              <label className="font-weight-bold">
                                <b>Lesson {idx + 1}</b>
                              </label>
                              <p className="font-weight-bold">
                                Lesson Heading: <br /> <span>{lesson.lesson}</span>
                              </p>
                              <p>
                                Lesson Body:
                                <span>{lesson.desc}</span>
                              </p>
                            </div>

                            {/* <div className="col-md-4">
                              {lesson.file_one &&
                                (getFileName(lesson.file_one) === "mp4" ? (
                                  <div className="cover-image">
                                    <video
                                      width="100%"
                                      controls
                                      style={{ borderRadius: "7px" }}
                                    >
                                      <source src={lesson.file_one} />
                                    </video>
                                  </div>
                                ) : (
                                  <div className="cover-image">
                                    <img
                                      style={{ borderRadius: "7px" }}
                                      width="100%"
                                      height="100%"
                                      className="img-fulid"
                                      src={lesson.file_one}
                                      alt="file one"
                                    />
                                  </div>
                                ))}

                              {lesson.file_two &&
                                (getFileName(lesson.file_two) === "mp4" ? (
                                  <div className="cover-image mt-3">
                                    <video
                                      width="100%"
                                      controls
                                      style={{ borderRadius: "7px" }}
                                    >
                                      <source src={lesson.file_two} />
                                    </video>
                                  </div>
                                ) : (
                                  <div className="cover-image mt-3">
                                    <img
                                      style={{ borderRadius: "7px" }}
                                      width="100%"
                                      height="100%"
                                      className="img-fulid"
                                      src={lesson.file_two}
                                      alt="file one"
                                    />
                                  </div>
                                ))}
                            </div> */}
                            {/* <div className="m-3 p-1"></div> */}
                          </>
                        );
                      })}
                  </div>
                </div>

                <div className="total_updates_top ">
                  <div className="row">
                    {course &&
                      course.questions &&
                      course.questions.map((qtn, idx) => {
                        return (
                          <div className="col-md-12 mb-4">
                            <h6>
                              <b>MCQ {idx + 1}</b>
                            </h6>
                            <h6>Question</h6>
                            <div>
                              {qtn.question}
                              <ul style={{ listStyleType: "none", padding: 0 }}>
                                {qtn.option.map((opt, i) => {
                                  return (
                                    <li>
                                      Option {i + 1}: <span>{opt}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="col-12 mt-4 pt-3 custom-submitbtn">
                <button type="submit" className="btn btnForm ">
                  Publish
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

export default Review;
