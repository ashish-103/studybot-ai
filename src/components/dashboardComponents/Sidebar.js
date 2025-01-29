/* eslint-disable no-unused-vars */
import { Link, NavLink, useLocation } from "react-router-dom";
// import logo from "../../images/logo.svg";
// import logo from "../../images/Studybot-AI-Logo-White.png";
import logo from "../../images/Studybot-AI-Logo.png";
import { sidebarLinks } from "../../data/sidebarData";
import { useEffect, useRef, useState } from "react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/dashboard");

  const trigger = useRef();
  const sidebar = useRef();

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <>
      <aside
        ref={sidebar}
        className={` ${
          pathname.includes("practice") ? "hidden" : "absolute"
        } ab solute left-0 top-0 z-30 flex h-screen w-[240px] flex-col overflow-y-auto bg-[#001921] text-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-5 px-6 py-5 ">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* SIDEBAR LINKS */}
        <div className="flex flex-col flex-1 overflow-y-auto" id="style-2">
          <nav className="flex flex-col gap-7 px-5 my-5 text-[#f5fdff] text-opacity-75 ">
            {sidebarLinks.map((item, index) => (
              <div key={`sidebar-${index}`}>
                <div className="px-3 pb-4 font-light">{item.heading}</div>
                {item.subLinks.map((subLink, subIndex) => (
                  <div
                    className={`flex gap-4 items-center py-2 px-3  group hover:text-white hover:bg-[#D6F5FF] hover:bg-opacity-20 hover:rounded-lg  ${
                      splitLocation[1] === subLink.path
                        ? "bg-[#0AA6D7] text-white py-2 px-2 rounded-lg"
                        : ""
                    }`}
                    key={`sidebar-sublink-${item.heading}-${subIndex}`}
                  >
                    <img
                      src={subLink.icon}
                      alt={`${subLink.icon} icon`}
                      className={`w-6 h-6 p-0.5 group-hover:brightness-0 group-hover:invert ${
                        splitLocation[1] === subLink.path
                          ? "brightness-200"
                          : ""
                      }  `}
                    />
                    <Link
                      to={`/dashboard${subLink.path}`}
                      className={
                        splitLocation[1] === subLink.path
                          ? "   text-white"
                          : " "
                      }
                    >
                      {subLink.label}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
