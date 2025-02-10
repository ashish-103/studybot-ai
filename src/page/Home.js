/* eslint-disable no-unused-vars */
import "./../App.css";

import Header from "./../page/Header";
import Footer from "./../page/Footer";
import { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import Features from "../components/home/Features";
import Counter from "../components/home/Counter";
import Courses from "../components/home/Courses";
import ClientReviews from "../components/home/ClientReviews";
import WhyStudyBot from "../components/home/WhyStudyBot.jsx";
import Faqs from "../components/home/Faqs.jsx";
import { useSelector } from "react-redux";
import { SubscriptionPlans } from "../components/Plans/Plans.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard/tests"); // Redirect logged-in users to the dashboard
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <Header />
      <HeroSection />
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
