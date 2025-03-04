import logo from "../../images/logo.svg";
// import search from "../../assets/images/search.png";
import arrowDown from "../../assets/images/arrow_down.png";
// import bell from "../../assets/images/bell.png";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { apiCall } from "../../api/login";
import default_profile_picture from "../../assets/default_profile_picture.png";
import { useProfileImageContext } from "../../context/ProfileImageContext";

console.log("Header component rendered");

const Header = (props) => {
  const { profileImage } = useProfileImageContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const { set_name, task_type, time, exam_id, user_id, status } = location.state || {};
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const handleLogout = () => {
    toast.success("You have been logged out successfully.");
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="shadow-md sticky top-0 z-[1] flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-5 py-1 shadow-2  2xl:px-11 w-full h-[4.146rem]">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 18L20 18"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${pathname.includes("practice") ? "block" : "hidden"
            } pr-5`}
        >
          <img src={logo} alt="logo" className="h-6 cursor-pointer" />
        </div>
        {/* <div
          className={`${
            pathname.includes("dashboard/tests") ? "block w-full" : "hidden"
          } `}
        >
          <div className="flex items-center bg-[#E1F2F8] rounded-lg px-2 py-1 w-1/2 ">
            <img
              src={search}
              className="w-5 h-5 text-gray-500 mr-2"
              alt="search"
            />

            <input
              type="text"
              placeholder="Search here....."
              className="outline-none text-sm bg-[#E1F2F8] w-full text-gray-700"
            />
          </div>
        </div> */}

        <div className="flex items-center gap-3 2xsm:gap-7 w-full  justify-between">
          <div className="flex w-full  justify-center items-center ">
            {pathname.includes('practice') && (
              <span className="hidden sm:inline font-semibold text-lg">{set_name}</span>
            )}
          </div>

          <div className="flex items-center space-x-4 mr-4">
            {/* <!-- User Area --> */}
            <div
              className="relative"
              onClick={() => {
                if (!pathname.includes("practice")) setMenuOpen(!menuOpen);
              }}
            >
              <div className="text-[#202020] text-sm flex items-center justify-center gap-3 cursor-pointer">
                {/* <div className="w-28 text-[#2A4563] text-1xl font-bold">
                  <span className="fw-bold">{user.plan_name}</span>
                </div> */}
                <img
                  className="inline-block w-8 h-8 rounded-full"
                  src={profileImage}
                  alt=""
                />
                <div className="text-left">
                  <p className="text-xs text-[#636363]">{user.name}</p>
                </div>
                <img src={arrowDown} alt="arrow down" className="w-4 h-4" />
              </div>
              <div
                className={`${menuOpen ? "absolute pt-[7px] -right-5" : "hidden"
                  }`}
              >
                <div className="text-[#202020] bg-white p-5 rounded-md shadow-lg text-sm w-max">
                  <div className="flex flex-row items-center gap-5 border-b-[1px] pb-4 border-b-[#ececec]">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src={profileImage}
                      alt=""
                    />
                    <div className="text-left">
                      <p className="text-xs text-[#636363] mb-1">{user.name}</p>
                      <p className="text-xs text-[#636363] mb-1">
                        {user.email}
                      </p>
                      <div className="w-28 text-[#2A4563] text-1xl font-bold">
                        <span className="fw-bold">{user.plan_name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-b-[1px] py-4 border-b-[#ececec] flex flex-col gap-2 text-[#636363]">
                    <div className="cursor-pointer">
                      <Link to="/dashboard/help">FAQ</Link>
                    </div>
                  </div>
                  <div className="pt-4 flex flex-col gap-2 text-[#0061EB]">
                    <div className="cursor-pointer">
                      <Link to="/dashboard/account">Account</Link>
                    </div>
                    <div className="cursor-pointer" onClick={handleLogout}>
                      Sign out
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="cursor-pointer flex  justify-center items-center w-8 h-8 rounded-lg text-gray-600 bg-[#E4F9FF] hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300">
            <img src={bell} alt="bell" className="w-4 h-4" />
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
