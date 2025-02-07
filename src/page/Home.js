/* eslint-disable no-unused-vars */
import "./../App.css";
import { toast } from "react-toastify";

import Header from "./../page/Header";
import Footer from "./../page/Footer";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { SubscriptionPlans } from "../components/Plans/Plans.js";
// import { useModal } from "../context/ModalProvider.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
  // const { activeModal, openModal, closeModal } = useModal();

  // const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [open, setOpen] = useState(false); // Initialize with false
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    toast.success("You are successfully logged out");
  };

  // const [isModalOpenContact, setIsModalOpenContact] = useState(false);


  useEffect(() => {
    if (user) {
      navigate("/dashboard/tests"); // Redirect logged-in users to the dashboard
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <Header
        user={user}
        toggleModal={toggleModal}
        closeMenu={closeMenu}
        handleLogout={handleLogout}
      />
      <HeroSection
      />
      <Features />
      <Counter />
      <WhyStudyBot />
      <Courses />
      <ClientReviews />
      <SubscriptionPlans />
      <Faqs />
      <Footer />


    </div>
  );
}

export default Home;
