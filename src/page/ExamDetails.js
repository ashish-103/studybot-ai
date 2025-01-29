import React, { useEffect, useState } from "react";
import "./../Examdetail.css";
import upsc from "./../images/upsc.png";
import user from "./../images/user.png";
import clock from "./../images/clock.png";
import power from "./../images/energy.png";
import check from "./../images/checklist.png";
import clock1 from "./../images/clock1.png";
import question from "./../images/question.png";
// import english from "./../images/english.png";
import india from "./../images/india.png";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";

import { useParams } from "react-router-dom";

function Examdetail() {
  const [getData, setGetData] = useState([]);

  let { id } = useParams();
  // console.log(id, "route id");
  useEffect(() => {
    // const url = process.env.APP_API_URLS_GETDATA;
    const handleClick = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.10:8000/api/getData/${id}`
        );
        // const response = await axios.get(`${url}${id}`);

        // );
        const { data } = response?.data;
        console.log(data?.tests, "examdetails=========================");
        setGetData(response?.data?.data?.tests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    handleClick();
  }, [id]);

  const getmarks = (data) => {
    console.log("================41======data", data);

    const getmark = data.filter((mark1) => {
      return mark1.mark === 1;
    });

    return getmark.length;
  };

  return (
    <div className="App">
      <Header />
      <div>
        <div className="inner-page-header">
          <div className="page-header-image">
            <img src={upsc} alt="UPSC Logo" />
          </div>
          <h2 className="inner-page-title">
            IAS Exam 2023 - UPSC CSE Mains Admit Card, Exam Dates, Exam Pattern!
          </h2>
          <ul className="option-list">
            <li>
              <span>
                <img src={user} alt="" />
              </span>
              5k+ Students Enrolled
            </li>
            <li>
              <span>
                <img src={clock} alt="" />
              </span>
              Updated on Jul 27,2023
            </li>
          </ul>
        </div>
        <div className="detail-content-wrapper">
          <div className="container">
            <div className="exam-detail">
              <h2 className="block-title">Exam Detail</h2>
              <p>
                UPSC Civil Services Mains Admit Card Out. The exam will be
                scheduled from 15th-17th September, and on 23rd and 24th
                September 2023.Earlier, the UPSC Prelims Result was out! The
                exam was held on 28th May 2023. Candidates who are qualified in
                the exam are eligible to attend the mains exam. In this article,
                aspiring candidates can find all the important details about the
                UPSC Civil Services Exam such as eligibility.
              </p>
            </div>
            <div className="exam-test">
              <h2 className="block-title">IAS Exam All Test</h2>
              <div className="test-block-wrapper">
                {getData &&
                  getData.length > 0 &&
                  getData.map((data) => {
                    const stringArray = data.language.split(",");

                    //======================================================
                    const timeString = data.time;

                    const [hours, minutes] = timeString.split(":").map(Number);

                    const totalMinutes = hours * 60 + minutes;

                    return (
                      <div className="test-block" key={data.id}>
                        <div className="block-header">
                          <div className="block-header-left">
                            <div className="green">Free</div>
                            <div className="moderate">Moderate</div>
                          </div>
                          <div className="block-header-right">
                            <div className="charge">
                              <img src={power} alt="power" /> 2,305 users
                            </div>
                          </div>
                        </div>
                        <h3 className="block-sub-title">{data.name}</h3>
                        <ul className="check-block">
                          <li>
                            <span>
                              <img src={question} alt="question" />
                            </span>{" "}
                            {data.questions.length} Questions
                          </li>
                          <li>
                            <span>
                              <img src={check} alt="check" />
                            </span>{" "}
                            {getmarks(data.questions)}
                            {getmarks(data.questions) > 1 ? "marks" : "mark"}
                          </li>

                          <li>
                            <span>
                              <img src={clock1} alt="clock" />
                            </span>{" "}
                            {totalMinutes} min
                          </li>
                        </ul>

                        <ul className="country">
                          {stringArray.map((data1, index1) => {
                            const isLastItem =
                              index1 === stringArray.length - 1;
                            return (
                              <>
                                <li key={index1}>
                                  <span>
                                    <img src={india} alt="" />
                                  </span>{" "}
                                  {data1}
                                </li>
                                {!isLastItem && <li>|</li>}
                              </>
                            );
                          })}
                        </ul>

                        <div className="start-btn">
                          <a href="/">Start Now</a>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Examdetail;
