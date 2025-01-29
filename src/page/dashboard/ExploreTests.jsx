import React, { useContext, useEffect, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import course from "../../assets/images/ielts.jpg";
import { apiCall } from "../../api/login";
import CourseCard from "../../components/ui/CourseCard";
import Pagination from "../../components/ui/Pagination";
import { UserContext } from "../../context/userContext";
import search from "../../assets/images/search.png";
import WelcomeEmail from "../../components/WelcomeEmail/WelcomeEmail";

export default function ExploreTests() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [difficulty, setDifficulty] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useContext(UserContext);
  const user_id = localStorage.getItem("user");
  const userID = JSON.parse(user_id);

  const itemsPerPage = 8;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = (
          await apiCall.get(`get_exam_sets?user_id=${userID.userid}`)
        ).data;
        const users = Array.from({ length: response.length }, (_, index) => ({
          name: `Exam ${index + 1}`,
          image:
            index % 2 === 0
              ? `https://randomuser.me/api/portraits/women/${index + 1}.jpg`
              : `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
        }));
        const dummyArr = response.map((item, index) => ({
          courseImage: { course },
          authorImage: users[index % users.length].image,
          authorName: users[index % users.length].name,
          authorRole: "Teacher",
          courseDescription: item.set_name,
          rating: item.rating,
          timing: item.time,
          set_name: item.set_name,
          task_type: item.task_type,
          exam_id: item.exam_id,
          status: item.status,
        }));
        setData(dummyArr);
        setDisplayData(dummyArr);
        const firstPage = dummyArr.filter((_i, index) => index < 8);
        setCurrentData(firstPage);
        const _totalpages = Math.ceil(dummyArr.length / itemsPerPage);
        setTotalPages(_totalpages);
      } catch (error) {
        console.log("error fetching question: ", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const _totalpages = Math.ceil(displayData.length / itemsPerPage);
    setTotalPages(_totalpages);
  }, [displayData]);

  useEffect(() => {
    if (difficulty !== "All") {
      const newData = data.filter((item) => item.set_name.includes(difficulty));
      setDisplayData(newData);
    } else {
      setDisplayData(data);
    }
  }, [data, difficulty]);

  useEffect(() => {
    const currentItems = displayData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setCurrentData(currentItems);
  }, [currentPage, data, displayData]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (e.key === "Enter") {
      query = query.split("").join(" ");
    }
    setSearchTerm(query);
    const filteredData = data.filter((item) => {
      const normalizedAuthorName = item.authorName
        .toLowerCase()
        .replace(/\s+/g, "");
      const normalizedSetName = item.set_name.toLowerCase().replace(/\s+/g, "");

      const normalizedQuery = query.replace(/\s+/g, "");

      return (
        normalizedAuthorName.includes(normalizedQuery) ||
        normalizedSetName.includes(normalizedQuery)
      );
    });
    // const filteredData = data.filter((item) => {
    //   const authorName = item.authorName.toLowerCase().replace(/\s+/g, "");
    //   const normalizedQuery = query.replace(/\s+/g, ""); // Remove spaces from query for comparison
    //   return authorName.includes(normalizedQuery);
    // });

    setDisplayData(filteredData);
    setCurrentPage(1);

    const _totalpages = Math.ceil(filteredData.length / itemsPerPage);
    setTotalPages(_totalpages);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const messageParam = urlParams.get("message");
    if (messageParam) {
      setMessage(messageParam);
    }
  }, []);

  useEffect(() => {
    if (message == "Welcome email is being sent") {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  return (
    <>
      {isOpen && <WelcomeEmail />}
      <section className="md:px-5 pb-10 mt-0">
        <div className="flex items-center bg-[#E1F2F8] rounded-lg px-2 py-1 fixed top-[18px] left-[57px] md:top-[1.125rem] lg:left-[18.25rem] z-10 ">
          <img
            src={search}
            className="w-5 h-5 text-gray-500 mr-2"
            alt="search"
          />
          <input
            type="text"
            placeholder="Search here....."
            className="hidden sm:block outline-none text-sm bg-[#E1F2F8] w-full text-gray-700 "
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="text-[#2A4563] text-2xl font-bold pb-5">
          Explore tests
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="relative text-[#2A4563] text-base font-semibold pb-5 flex justify-start items-center gap-2">
            <span>Difficulty: </span>
            <span
              onClick={() => setMenuOpen(!menuOpen)}
              className=" cursor-pointer bg-primary-blue text-white rounded-md px-3 flex items-center py-1 gap-2"
            >
              {difficulty}
              {/* <img src={arrowDown} alt="arrow down" className="w-4 h-4 " /> */}
              {menuOpen ? (
                <ChevronUpIcon className="w-4 h-4 text-white" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-white" />
              )}
            </span>

            <div className={`${menuOpen ? "absolute top-[30px] " : "hidden"}`}>
              <div className=" bg-white p-2 rounded-md shadow-lg text-sm w-max flex flex-col gap-2 text-[#636363]">
                <div
                  className="cursor-pointer pl-2 pr-4 py-0.5 hover:bg-primary-blue rounded-md hover:bg-opacity-10"
                  onClick={() => {
                    setDifficulty("All");
                    setMenuOpen(!menuOpen);
                  }}
                >
                  All
                </div>
                <div
                  className="cursor-pointer pl-2 pr-4 py-0.5 hover:bg-primary-blue rounded-md hover:bg-opacity-10"
                  onClick={() => {
                    setDifficulty("Easy");
                    setMenuOpen(!menuOpen);
                  }}
                >
                  Easy
                </div>
                <div
                  className="cursor-pointer pl-2 pr-4 py-0.5 hover:bg-primary-blue rounded-md hover:bg-opacity-10"
                  onClick={() => {
                    setDifficulty("Medium");
                    setMenuOpen(!menuOpen);
                  }}
                >
                  Medium
                </div>
                <div
                  className="cursor-pointer pl-2 pr-4 py-0.5 hover:bg-primary-blue rounded-md hover:bg-opacity-10"
                  onClick={() => {
                    setDifficulty("Hard");
                    setMenuOpen(!menuOpen);
                  }}
                >
                  Hard
                </div>
              </div>
            </div>
          </div>
          {totalPages > 0 &&
            Array.isArray(displayData) &&
            displayData.length > 0 && (
              <Pagination
                totalPages={totalPages}
                data={displayData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
        </div>
        <div className="md:bg-white md:py-4 md:px-4 md:shadow-md rounded-md flex flex-wrap">
          {Array.isArray(currentData) &&
            currentData.length > 0 &&
            currentData.map((item, index) => (
              <div key={index} className="md:w-1/4 h-full">
                <CourseCard
                  section="exploretests"
                  courseImage={course}
                  authorImage={item.authorImage}
                  authorName={item.authorName}
                  authorRole={item.authorRole}
                  courseDescription={item.courseDescription}
                  rating={item.rating}
                  timing={item.timing}
                  set_name={item.set_name}
                  task_type={item.task_type}
                  exam_id={item.exam_id}
                  userId={user && user.id ? user.id : ""}
                  status={item.status}
                />
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
