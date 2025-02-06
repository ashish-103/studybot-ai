import React, { useCallback, useContext, useEffect, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import course from "../../assets/images/ielts.jpg";
import CourseCard from "../../components/ui/CourseCard";
import Pagination from "../../components/ui/Pagination";
import { UserContext } from "../../context/userContext";
import WelcomeEmail from "../../components/WelcomeEmail/WelcomeEmail";
import { useFetchExams } from "../../hooks/useFetchExams";
import Search from "../../components/Search";

export default function ExploreTests() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(UserContext);
  // console.log('Explore Test rendered!')

  const { data, displayData, currentData, currentPage, totalPages, itemsPerPage, difficulty, setDisplayData, setTotalPages, setCurrentPage, setDifficulty } = useFetchExams();


  const handleSearch = useCallback((e) => {
    let query = e.target.value;
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
  }, [data, itemsPerPage, setCurrentPage, setDisplayData, setTotalPages]);

  useEffect(() => {
    // console.log("xplore Test rendered! from useEffect 1 ")
    const urlParams = new URLSearchParams(window.location.search);
    const messageParam = urlParams.get("message");
    // console.log(messageParam);
    if (messageParam) {
      setMessage(messageParam);
    }
  }, []);

  useEffect(() => {
    if (message === "Welcome email is being sent") {
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

        <Search onchange={handleSearch} value={searchTerm} />

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
