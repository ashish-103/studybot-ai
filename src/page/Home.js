import "./../App.css";

import Header from "./../page/Header";
import Footer from "./../page/Footer";
import HeroSection from "../components/home/HeroSection";
import Features from "../components/home/Features";
import Counter from "../components/home/Counter";
import Courses from "../components/home/Courses";
import ClientReviews from "../components/home/ClientReviews";
import WhyStudyBot from "../components/home/WhyStudyBot.jsx";
import Faqs from "../components/home/Faqs.jsx";
import { SubscriptionPlans } from "../components/Plans/Plans.js";

function Home() {

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
