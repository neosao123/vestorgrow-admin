import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/Home/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Updates from "../pages/Publish/Updates";
import MintHere from "../pages/Publish/MintHere";
import Profiles from "../pages/Publish/Profiles";
import ProfileForm from "../pages/Publish/ProfileForm";
import Glossary from "../pages/Publish/Glossary";
import NewsLetter from "../pages/Publish/NewsLetter";
import Analytics from "../pages/Analytics/Analytics";
import DefaultLayout from "../containers/DefaultLayout";
import CurrentCourses from "../pages/Learn&Earn/CurrentCourses";
import ManageRewards from "../pages/Learn&Earn/ManageRewards";
import BuildCourse from "../pages/Learn&Earn/BuildCourse";
import Account from "../pages/Account/Account";
import Users from "../pages/Users/Users";
import CustomLinks from "../pages/CustomLinks/CustomLinks";
import SupportTicket from "../pages/SupportTickets/SupportTicket";
import SupportTicketform from "../pages/SupportTickets/SupportTicketForm";
import AdminZone from "../pages/AdminZone/AdminZone";
import ResetPassword from "../pages/Login/ForgotPassword";
import UpdatePassword from "../pages/Login/ResetPassword";
import Faq from "../pages/Faq/Faq";
import FaqForm from "../pages/Faq/FaqForm";
import Blogs from "../pages/Blogs/Blogs";
import BlogForm from "../pages/Blogs/BlogForm";
import NewsSubscription from "../pages/NewsSubscription/NewsSubscription";
import NewsSubscriptionForm from "../pages/NewsSubscription/NewsSubscriptionForm";
import Careers from "../pages/Careers/Careers";
import CareerForm from "../pages/Careers/CareerForm";
import Contributers from "../pages/Contributers/Contributers";
import ContributerForm from "../pages/Contributers/ContributerForm";
import Partners from "../pages/Partners/Partners";
import PartnersForm from "../pages/Partners/PartnersForm";
import { GlobalProvider } from "../context/GlobalContext";
import CustomLinkForm from "../pages/CustomLinks/CustomLinkForm";
import Project from "../pages/Project/Project";
import Calendar from "../pages/Calendar/Calendar";
import Task from "../pages/Task/Task";
import Notepad from "../pages/Notepad/Notepad";
import FilesDrive from "../pages/FilesDrive/FilesDrive";
import FinanceDept from "../pages/FinanceDept/FinanceDept";
import Employees from "../pages/Employees/Employees";
import UpdateForm from "../pages/Publish/UpdateForm";
import GlossaryForm from "../pages/Publish/GlossaryForm";
import NewsletterForm from "../pages/Publish/NewsletterForm";
import CourseList from "../pages/Courses/CourseList";
import MainCourse from "../pages/Courses/MainCourse";
import Lesson from "../pages/Courses/Lesson";
import Questions from "../pages/Courses/Questions";
import Review from "../pages/Courses/Review";
import DraftList from "../pages/Courses/DraftList";
import FeedbackList from "../pages/Feedback/FeedbackList";
import Category from "../pages/Category/Category";
import CategoryForm from "../pages/Category/CategoryForm";
import LearningMaterial from "../pages/LearningMaterial/LearningMaterial";
import LearningMaterialForm from "../pages/LearningMaterial/LearningMaterialForm";
import Webinar from "../pages/Webinar/Webinar";
import WebinarForm from "../pages/Webinar/WebinarForm";
import WebinarCategory from "../pages/WebinarCategory/WebinarCategory";
import WebinarCategoryForm from "../pages/WebinarCategory/WebinarCategoryForm";
import LearningMaterialCategory from "../pages/LearningMaterialCategory/LearningMaterialCategory";
import LearningMaterialCategoryForm from "../pages/LearningMaterialCategory/LearningMaterialCategoryForm";
import Banner from "../pages/Banner/Banner";
import BannerForm from "../pages/Banner/BannerForm";
import News from "../pages/News/News";
import NewsForm from "../pages/News/NewsForm";
import TestimonialList from "../pages/Testimonial/TestimonialList";
import TestimonialForm from "../pages/Testimonial/TestimonialForm";
import NewsCategory from "../pages/NewsCategory/NewsCategory";
import NewsAuthor from "../pages/NewsAuthor/NewsAuthor";
import NewsAuthorForm from "../pages/NewsAuthor/NewsAuthorForm";
import NewsCategoryForm from "../pages/NewsCategory/NewsCategoryForm";
function AllRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(window.user ? true : false);

  useEffect(() => {
    getUser();
  }, [isAuthenticated]);

  const getUser = () => {
    if (window.user) {
      setIsAuthenticated(true);
    }
  };

  return isAuthenticated && window.user ? (
    <GlobalProvider>
      <DefaultLayout handleAuthState={setIsAuthenticated}>
        <Routes>
          <Route exact path="/testimonial" element={<TestimonialList />} />
          <Route exact path="/add-testimonial" element={<TestimonialForm />} />
          <Route exact path="/testimonial/:id" element={<TestimonialForm />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/course" element={<CourseList />} />
          <Route exact path="/create_course" element={<MainCourse />} />
          <Route exact path="/create_course/:id" element={<MainCourse />} />
          <Route exact path="/course/create_lesson/:id" element={<Lesson />} />
          <Route exact path="/course/create_question/:id" element={<Questions />} />
          <Route exact path="/course/review/:id" element={<Review />} />
          {/* <Route
            exact
            path="/create_course/:id/:draftid"
            element={<AddCourse />}
          /> */}
          <Route exact path="/course/create_lesson/:id/:draftid" element={<Lesson />} />
          <Route exact path="/course/create_question/:id/:draftid" element={<Questions />} />
          <Route exact path="/course/review/:id/:draftid" element={<Review />} />
          <Route exact path="/category" element={<Category />} />
          <Route exact path="/create_category/:id" element={<CategoryForm />} />
          <Route exact path="/create_category" element={<CategoryForm />} />
          <Route exact path="/webinar_category" element={<WebinarCategory />} />
          <Route exact path="/webinar_create_category/:id" element={<WebinarCategoryForm />} />
          <Route exact path="/webinar_create_category" element={<WebinarCategoryForm />} />
          <Route exact path="/learning_material_category" element={<LearningMaterialCategory />} />
          <Route exact path="/learning_material_create_category/:id" element={<LearningMaterialCategoryForm />} />
          <Route exact path="/learning_material_create_category" element={<LearningMaterialCategoryForm />} />

          <Route exact path="/learning_material" element={<LearningMaterial />} />
          <Route exact path="/create_learning_material/:id" element={<LearningMaterialForm />} />
          <Route exact path="/create_learning_material" element={<LearningMaterialForm />} />
          <Route exact path="/webinar" element={<Webinar />} />
          <Route exact path="/create_webinar/:id" element={<WebinarForm />} />
          <Route exact path="/create_webinar" element={<WebinarForm />} />
          <Route exact path="/banner" element={<Banner />} />
          <Route exact path="/create_banner/:id" element={<BannerForm />} />
          <Route exact path="/create_banner" element={<BannerForm />} />
          <Route exact path="/news" element={<News />} />
          <Route exact path="/create_news/:id" element={<NewsForm />} />
          <Route exact path="/create_news" element={<NewsForm />} />
          <Route exact path="/user" element={<Users />} />

          <Route exact path="/newsauthor" element={<NewsAuthor />} />
          <Route exact path="/create_newsauthor" element={<NewsAuthorForm />} />
          <Route exact path="/newscategory" element={<NewsCategory />} />
          <Route exact path="/create_newscategory" element={<NewsCategoryForm />} />
          <Route exact path="/create_newscategory/:id" element={<NewsCategoryForm />} />
          <Route exact path="/create_newsauthor/:id" element={<NewsAuthorForm />} />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </DefaultLayout>
    </GlobalProvider>
  ) : (
    <Routes>
      <Route exact path="/login" element={<LoginPage handleAuthState={setIsAuthenticated} />} />
      <Route exact path="/forgot_password" element={<ResetPassword />} />
      <Route exact path="/reset/:token" element={<UpdatePassword />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AllRoutes;
