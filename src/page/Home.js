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
import ContactUsModal from "../components/ContactUsMoodal.jsx";
import PrivacyPolicy from "./PrivacyPolicy.js";
import ForgotPasswordModal from "../components/ForgotPasswordModal.jsx";
import LoginModal from "../components/LoginModal.jsx";
import { useModal } from "../context/ModalProvider.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
  const { activeModal, openModal, closeModal } = useModal();

  // const { user, setUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [open, setOpen] = useState(false); // Initialize with false
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
