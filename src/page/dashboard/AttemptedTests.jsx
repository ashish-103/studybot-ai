import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { apiCall } from "../../api/login";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Rating from "react-rating";

import yellowStar from "../../assets/images/starYellow.png";
import grayStar from "../../assets/images/starGray.png";
// import arrowDown from "../../assets/images/arrow_down.png";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function AttemptedTests() {
  const [data, setData] = useState([]);
  const [attemptedTests, setAttemptedTests] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userId, setUserId] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserId(user.userid);
    }
  }, [user]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = (
          await apiCall.get(`get_evaluation_and_set_names?user_id=${userId}`)
        ).data;

        setData(response.evaluation_details);
      } catch (error) {
        console.log("error fetching question: ", error);
      }
    };
    if (userId) {
      getData();
    }
  }, [userId]);

  useEffect(() => {
    if (!data) return;

    // Sort and group data by date
    const sortedData = data.sort((a, b) => {
      if (a.evaluation_time === "N/A") return 1;
      if (b.evaluation_time === "N/A") return -1;
      return new Date(b.evaluation_time) - new Date(a.evaluation_time);
    });

    const groupedByDate = sortedData.reduce((acc, item) => {
      const date = item.evaluation_time;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    const formattedData = Object.keys(groupedByDate).map((date) => ({
      date,
      tests: groupedByDate[date],
    }));

    setAllTests(formattedData);
  }, [data]);

  useEffect(() => {
    if (allTests) {
      if (selectedDate) {
        const data = allTests.filter((item) => item.date === selectedDate);
        console.log("attempted tests on date: ", selectedDate, data);
        setAttemptedTests(data);
      } else {
        setAttemptedTests(allTests);
      }
    }
  }, [allTests, selectedDate]);

  return (
    <>
      <section className="px-5 pb-10">
        <div className="text-[#2A4563] uppercase text-2xl font-bold pb-5">
          Your attempted tests
        </div>

        <div className="flex justify-between items-center mb-5 px-10">
          <div className="flex w-full items-center justify-end gap-3 ">
            <p>Date: </p>
            {/* <img src={arrowDown} alt="arrow down" className="w-4 h-4" /> */}
            <p
              className="cursor-pointer bg-primary-blue text-white px-2 rounded-md"
              onClick={() => setSelectedDate(null)}
            >
              All
            </p>
            <DatePicker
              selected={selectedDate}
              className="w-[110px] border-[1px] border-gray-200 rounded-md"
              dateFormat="yyyy-MM-dd" // Display format in the input
              onChange={(date) =>
                setSelectedDate(moment(date).format("YYYY-MM-DD"))
              }
            />
          </div>
        </div>
        <div className="text-center bg-white p-7 shadow-lg rounded-lg">
          {Array.isArray(attemptedTests) &&
            attemptedTests.length > 0 &&
            attemptedTests.map((dateCategory, index) => (
              <div key={`attempted-tests-${index}`} className="mb-5">
                <p className="text-lg font-bold text-left mb-5 text-[#2A4563]">
                  {dateCategory.date}
                </p>
                <section className="antialiased text-gray-600 gap-6 grid grid-cols-2">
                  {dateCategory.tests.map((test) => (
                    <div
                      key={`attempted-tests-id-${test.evaluation_id}`}
                      className="w-full h-full"
                    >
                      <div className="max-w-2xl bg-transparent shadow-[0_0_3px_rgb(0,0,0,0.2)] rounded-lg">
                        <div className="px-3 py-3">
                          <div className="flex items-start">
                            <div className="flex-grow truncate">
                              <div className="w-full sm:flex justify-between items-center mb-3">
                                <h2 className="text-xl leading-snug font-extrabold truncate mb-1 sm:mb-0">
                                  {test.set_name}
                                </h2>
                              </div>

                              <div className="flex justify-between whitespace-normal items-center">
                                <div className="max-w-md flex justify-between gap-4 items-center">
                                  <p>Score: {test.overall_average}</p>
                                  Rating :
                                  <Rating
                                    initialRating={test.rating}
                                    emptySymbol={
                                      <img
                                        src={grayStar}
                                        alt="grayStar"
                                        className="h-4 w-auto mx-0.5"
                                      />
                                    }
                                    fullSymbol={
                                      <img
                                        src={yellowStar}
                                        alt="yellowStar"
                                        className="h-4 w-auto mx-0.5"
                                      />
                                    }
                                    readonly={true}
                                  />
                                </div>

                                <div
                                  className="flex-shrink-0 flex items-center justify-center ml-2 border py-1 px-3 bg-[#0AA6D7] rounded-lg cursor-pointer"
                                  onClick={() => {
                                    navigate(
                                      `/dashboard/performanceAnalytics?evaluationid=${test.evaluation_id}`
                                    );
                                  }}
                                >
                                  <span className="block font-bold text-white text-[12px]">
                                    Get analysis report
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            ))}
          {Array.isArray(attemptedTests) && attemptedTests.length <= 0 && (
            <p>No tests found</p>
          )}
        </div>
      </section>
    </>
  );
}
