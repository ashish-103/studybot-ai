import "./../App.css";
import OtpModal from "../components/Otpmodal.jsx";
import { toast } from "react-toastify";

import Header from "./../page/Header";
import Footer from "./../page/Footer";
// import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import HeroSection from "../components/home/HeroSection";
import Features from "../components/home/Features";
// import AboutUs from "../components/home/AboutUs";
import Counter from "../components/home/Counter";
import Courses from "../components/home/Courses";
import ClientReviews from "../components/home/ClientReviews";
import WhyStudyBot from "../components/home/WhyStudyBot.jsx";
import Faqs from "../components/home/Faqs.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import SinupModal from "../components/SignUpModal.jsx";
import { SubscriptionPlans } from "../components/Plans/Plans.js";
import ContactUsModal from "../components/ContactUsMoodal.jsx";
import PrivacyPolicy from "./PrivacyPolicy.js";
import ForgotPasswordModal from "../components/ForgotPasswordModal.jsx";
import LoginModal from "../components/LoginModal.jsx";
import { useModal } from "../context/ModalProvider.jsx";

function Home() {
  const { activeModal, openModal, closeModal } = useModal();

  // const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [open, setOpen] = useState(false); // Initialize with false
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleSubmitModal = () => {
    setIsModalOpen2(!isModalOpen2);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    toast.success("You are successfully logged out");
  };

  const [isModalOpenContact, setIsModalOpenContact] = useState(false);

  return (
    <div className="App">
      <Header
        user={user}
        toggleModal={toggleModal}
        // openModal={openModal}
        closeMenu={closeMenu}
        // closeModal={closeModal}
        handleLogout={handleLogout}
      />
      <HeroSection
      />
      <Features />
      <Counter />
      <WhyStudyBot />
      <Courses />
      <ClientReviews />
      <SubscriptionPlans /* toggleModal={toggleModal} closeMenu={closeMenu} */ />
      <Faqs />
      <Footer />
      {/* {isModalOpenContact && (
        <ContactUs isOpen={isModalOpenContact} closeModal={closeModal} />
      )}
      {isModalOpen && (
        <OtpModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )}
      {isModalOpen2 && (
        <SignUpModal isOpen2={isModalOpen2} setIsOpen2={setIsModalOpen2} />
      )} */}

    </div>
  );
}

export default Home;
