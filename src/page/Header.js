/* eslint-disable no-unused-vars */
import "./../App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Button from "../components/ui/Button";
import logo from "./../images/Studybot-AI-Logo.png";
import { Link as RouteLink } from "react-scroll";
import ContactUsModal from "../components/ContactUsModal";
import { useModal } from "../context/ModalProvider";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import SignUpModal from "../components/SignUpModal";
import LoginModal from "../components/LoginModal";
import { MobileView } from "../components/MobileView";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const { user } = useSelector((state) => state.auth);

  const { openModal, activeModal, closeModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const profileName = localStorage.getItem("user");
  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.clear();
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    toast.success("You are successfully logged out");
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-[100] w-full shadow-lg text-white bg-primary-blue px-2 md:px-5 py-3 flex flex-row justify-between items-center">
        <div className="w-1/2 md:w-auto">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-52 h-auto" />
          </Link>
        </div>

        {/* mobile view */}
        <MobileView user={user} handleLogout={handleLogout} openModal={openModal} closeModal={closeModal} />
        {/* mobile view */}
        {/* Desktop View */}
        <div className="hidden md:block">
          <ul className="text-white flex gap-1 md:gap-5 border-0">
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
            {/* <li>
              <Link to="#" className="menu-link hover:text-primary-orange">
                Blogs
              </Link>
            </li> */}
            <li>
              <Link
                to="#"
                className="menu-link hover:text-primary-orange cursor-pointer"
                onClick={(e) => {
                  openModal('contactus');
                }}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="relative hidden md:block">
          {profileName?.name || user ? (
            <>
              <span
                className="menu-link cursor-pointer font-semibold hover:text-primary-orange"
                onClick={() => setOpen(!open)}
              >
                {profileName?.name || user?.name
                  ? profileName?.name || user?.name
                  : "user"}
              </span>
              {open && (
                <div className="absolute -right-[5px] mt-[17px] border bg-white text-black">
                  <div
                    className="px-3 py-1 cursor-pointer hover:bg-primary-blue hover:text-primary-orange"
                    onClick={() => {
                      navigate("/dashboard/tests");
                    }}
                  >
                    Dashboard
                  </div>
                  <div
                    className="px-3 py-1 cursor-pointer hover:bg-primary-blue hover:text-primary-orange"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
              <Menu>
                <MenuButton></MenuButton>
                <MenuItems
                  anchor="bottom"
                  className="bg-white flex flex-col gap-2 pt-[30px] pb-[5px] px-[5px]"
                >
                  <MenuItem>
                    <div
                      className="px-2 cursor-pointer"
                      onClick={() => {
                        navigate("/dashboard");
                      }}
                    >
                      Dashboard
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className="px-2 cursor-pointer" onClick={logoutUser}>
                      Logout
                    </div>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant={"orange"}
                text="Login"
                onClick={() => { openModal('login') }}
                style={{ marginRight: "10px", padding: " 3px 15px" }}
              />
              <Button
                variant={"orange"}
                text="SignUp"
                onClick={() => { openModal('signup') }}
                style={{ padding: " 3px 15px" }}
              />
            </>
          )}
        </div>
        {/* Desktop View */}
      </header>
      {activeModal === 'login' && (
        <LoginModal activeModal={activeModal} openModal={openModal} closeModal={closeModal} />
      )}
      {activeModal === 'signup' && (
        <SignUpModal activeModal={activeModal} openModal={openModal} closeModal={closeModal} />
      )}
      {activeModal === 'forgot_password' && (
        <ForgotPasswordModal activeModal={activeModal} closeModal={closeModal} />
      )}
      {activeModal === 'contactus' && (
        <ContactUsModal activeModal={activeModal} closeModal={closeModal} />
      )}
    </>
  );
}
