import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import CourseService from "../../services/CourseService";
import AddCourse from "./AddCourse";
import Topic from "./Topic";
export default function MainCourse() {
    const params = useParams();
    const router = useNavigate();
    const courseServ = new CourseService();

    let initialLesson = {
        lesson_title: "",
        desc: "",
        lesson_video: "",
        lesson_cover: "",
        watch_time: 0
    };

    const [step, setStep] = useState(1)
    const [course, setCourse] = useState({
        _id: "",
        course_name: "",
        course_desc: "",
        is_publish: false,
        users_enrolled: 0,
        createdBy: "",
        watch_time: 0,
        cover_image: "",
        banner_image: "",
        categoryId: "",
        topics: [{
            topic_title: "",
            sub_topics: [
                {
                    sub_topic_title: "",
                    lessons: [{ ...initialLesson }]
                }
            ]
        }],
    });


    useEffect(() => {
        if (params?.id) {
            onLoadCourseData();
        }
    }, []);
    const onLoadCourseData = async () => {
        try {
            let response = await courseServ.getCourse(params?.id);
            if (response.data) {
                response.data.createdBy = response.data.createdBy._id
                setCourse(response.data);
            } else {
                toast.error(response?.error);
            }
        } catch (err) {
            throw err;
        }
    };
    const handleChange = (obj) => {
        setCourse(obj)
    }
    const handleStepChange = (value) => {
        setStep(value)
    }
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
                                Create a course
                                <span
                                    className="accountChangeHeadPartialHead"
                                    style={{ color: "#8a8a8a" }}
                                >
                                    {" "}
                                    - Information Section
                                </span>
                            </h5>
                            <h5>Step {step}</h5>
                        </div>
                        <div className="d-flex active_link_customs">
                            <p className="m-0 pt-2">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry.
                            </p>
                        </div>
                    </div>

                    {step == 1 ? <AddCourse course={course} setCourse={handleChange} changeStep={handleStepChange} /> :
                        <Topic course={course} setCourse={handleChange} changeStep={handleStepChange} />}
                </div>
            </div>
            <ToastContainer />
        </div>
    )

}