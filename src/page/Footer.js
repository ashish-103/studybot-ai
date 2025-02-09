import "./../App.css";
import linkdin from "../assets/images/linkdin.svg";
// import facebook from "./../images/facebook.png";
import instagram from "./../images/instagram.png";
// import twitter from "./../images/twitter.png";
// import footerLogo from "./../images/footer-logo.png";
import { Link } from "react-router-dom";
import heroBg from "../images/hero-bg.png";
import { Link as RouteLink } from "react-scroll";
import { useModal } from "../context/ModalProvider";
import logo from "./../images/Studybot-AI-Logo.png";

function Footer() {
  const { openModal } = useModal();
  return (
    <footer>
      <img
        src={heroBg}
        alt="hero-bg"
        className="w-full scale-y-[-1] translate-y-[1px]"
      />
      <div className="bg-primary-blue">
        <div className="flex-col flex md:flex-row items-start justify-around p-web">
          <div className="text-white pb-5 ">
            {/* <a href="index.html">
              <span className="font-bold text-4xl">Studybot AI</span>
            </a> */}
            <Link to="/">
              <img src={logo} alt="Logo" className="w-80 h-auto" />
            </Link>
          </div>
          <div className="gap-[30px] md:gap-0 md:w-[55%] flex items-start justify-around">
            <div className="text-white">
              <h3 className="pb-4 text-lg md:text-2xl font-semibold">Company</h3>
              <ul className="flex flex-col gap-2 md:text-lg">
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
                {/* <li> */}
                {/* <Link to="/" className="menu-link hover:text-primary-orange">
                    Pricing
                  </Link>
                  {/* <RouteLink
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
                  </RouteLink> */}
                {/* </li> */}
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
              <h3 className="pb-4 text-lg md:text-2xl font-semibold">Terms and Services</h3>
              <ul className="flex flex-col gap-2 md:text-lg">
                {/* <li>
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
                </li> */}

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
                {/* <li>
                  <Link to="/" className="menu-link hover:text-primary-orange">
                    Contact Us
                  </Link>
                </li> */}
                {/* <li>
                  <button
                    className="menu-link hover:text-primary-orange"
                    onClick={() => { openModal('contactus') }}
                  >
                    Contact Us
                  </button>
                </li> */}
              </ul>
            </div>
            <div className="text-white ">
              <h3 className="pb-4 text-lg md:text-2xl font-semibold">Social media</h3>
              <ul className="flex gap-4 justify-center items-center">
                {/* <li className=" cursor-pointer">
                  <Link to="#">
                    <img src={facebook} alt="fb" />
                  </Link>
                </li> */}
                <li className=" cursor-pointer">
                  <Link to={'https://www.instagram.com/studybotai?igsh=MWtpaHlsenZ2Z2p0eA=='}>
                    <img src={instagram}
                      className=" w-[1.2rem] md:w-[1.5rem]"
                      alt="insta" />
                  </Link>
                </li>
                {/* <li className="">
                  <Link to="#">
                    <img src={twitter} alt="twi" />
                  </Link>
                </li> */}
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
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>
          &copy; All Right Reserved By <Link to="#">Studybot AI</Link>
        </p>
      </div>
    </footer>
  );
}
//   <div className="footer-block social">
//     <h3 className="footer-title">We Are on Social</h3>
//     <ul>
//       <li>
//         <Link to="#">
//           <img src={facebook} alt="fb" />
//         </Link>
//       </li>
//       <li>
//         <Link to="#">
//           <img src={instagram} alt="insta" />
//         </Link>
//       </li>
//       <li>
//         <Link to="#">
//           <img src={twitter} alt="twi" />
//         </Link>
//       </li>
//     </ul>
//   </div>

export default Footer;
