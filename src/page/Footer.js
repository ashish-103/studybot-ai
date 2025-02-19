import "./../App.css";
import linkdin from "../assets/images/linkdin.svg";
import facebook from "./../images/facebook.png";
import instagram from "./../images/instagram.png";
import twitter from "./../images/twitter.png";
// import footerLogo from "./../images/footer-logo.png";
import { Link } from "react-router-dom";
import heroBg from "../images/hero-bg.png";
import { Link as RouteLink } from "react-scroll";
import { useModal } from "../context/ModalProvider";
import logo from "./../images/Studybot-AI-Logo.png";
import Button from "../components/ui/Button";

function Footer() {
  const { openModal } = useModal();
  return (
    <footer className="">
      <img
        src={heroBg}
        alt="hero-bg"
        className="w-full scale-y-[-1] translate-y-[1px]"
      />
      <div className="bg-primary-blue">
        {/* <h3 className="text-white text-center text-3xl pr-14">Stay Connected</h3> */}

        <div className="flex-col flex md:flex-row items-start justify-around pb-[10px]">
          <div className="text-white pb-5 self-center">
            {/* <a href="index.html">
              <span className="font-bold text-4xl">Studybot AI</span>
            </a> */}
            <Link to="/">
              <img src={logo} alt="Logo" className="w-[25rem] h-[7rem]" />
            </Link>

          </div>
          {/* <div className="gap-[30px] md:gap-0 md:w-[55%] flex items-start justify-around"> */}

          <div className="text-white">
            <h3 className="pb-1 text-lg md:text-base lg:text-2xl font-semibold">Quick Links</h3>
            <ul className="flex flex-col md:text-[14px]">
              <li>
                <RouteLink
                  to="section1"
                  smooth={true}
                  duration={500}
                  spy={true}
                  delay={50}
                  offset={-100}
                  style={{ cursor: "pointer" }}
                  className="menu-link hover:text-primary-orange"
                >
                  Home
                </RouteLink>
              </li>
              <li>
                <RouteLink
                  to="section2"
                  smooth={true}
                  duration={500}
                  spy={true}
                  delay={50}
                  offset={-50}
                  style={{ cursor: "pointer" }}
                  className="menu-link hover:text-primary-orange"
                >
                  Features
                </RouteLink>
              </li>
              <li>
                <RouteLink
                  to="section3"
                  smooth={true}
                  duration={500}
                  spy={true}
                  delay={50}
                  offset={-50}
                  style={{ cursor: "pointer" }}
                  className="menu-link hover:text-primary-orange"
                >
                  Pricing
                </RouteLink>
              </li>
              <li>
                <RouteLink
                  to="section4"
                  smooth={true}
                  duration={500}
                  spy={true}
                  delay={50}
                  offset={-20}
                  style={{ cursor: "pointer" }}
                  className="menu-link hover:text-primary-orange"
                >
                  Testimonials
                </RouteLink>
              </li>
              <li>
                <RouteLink
                  to=""
                  smooth={true}
                  duration={500}
                  spy={true}
                  delay={50}
                  offset={-20}
                  style={{ cursor: "pointer" }}
                  className="menu-link hover:text-primary-orange"
                >Blogs</RouteLink>
              </li>
              <li>
                <RouteLink
                  to="section5"
                  smooth={true}
                  duration={500}
                  spy={true}
                  delay={50}
                  offset={-20}
                  style={{ cursor: "pointer" }}
                  className="menu-link hover:text-primary-orange"
                >
                  FAQs
                </RouteLink>
              </li>
              <li>
                <button
                  className="menu-link hover:text-primary-orange"
                  onClick={() => { openModal('contactus') }}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div className="text-white">
            <h3 className="pb-1 text-lg md:text-base lg:text-2xl font-semibold">Terms and Services</h3>
            <ul className="flex flex-col md:text-[14px]">
              <li>
                <Link
                  to="/terms-conditions"
                  className="menu-link hover:text-primary-orange"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/user-policy"
                  className="menu-link hover:text-primary-orange"
                >
                  User Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="menu-link hover:text-primary-orange"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-white ">
            <h3 className="pb-4 text-lg md:text-base lg:text-2xl font-semibold">Social media</h3>
            <ul className="flex flex-col gap-2 justify-center items-start">
              <li className=" cursor-pointer">
                <Link to="#">
                  <img src={facebook} alt="fb" />
                </Link>
              </li>
              <li className=" cursor-pointer">
                <Link to={'https://www.instagram.com/studybotai?igsh=MWtpaHlsenZ2Z2p0eA=='}>
                  <img src={instagram}
                    className=" w-[1.2rem] md:w-[1.5rem]"
                    alt="insta" />
                </Link>
              </li>
              <li className="">
                <Link to="#">
                  <img src={twitter} alt="twi" />
                </Link>
              </li>
              <li>
                <Link to={"https://www.linkedin.com/company/studybot-ai/"}>
                  <img
                    src={linkdin}
                    alt="linkdin"
                    className=" w-[1.4rem] md:w-[1.8rem] cursor-pointer"
                  />
                </Link>
              </li>
            </ul>
          </div>
          {/* </div> */}
        </div>
      </div>

      <div className="text-xl bg-primary-orange w-screen h-[3rem] flex justify-between items-center gap-4 pl-[10rem] pr-[11rem]">
        <p>Get updates and tips delivered straight to your inbox.</p>
        <Button variant='blue' text="Subscribe" style={{ padding: "1px 10px" }} />
      </div>

      <div className="copyright">
        <p>
          &copy; All Right Reserved By <Link to="#">Studybot AI</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
