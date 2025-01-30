import React, { useContext, useEffect, useRef, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import Button from "../../components/ResubaleComponents/Button";
import leftArrow from "../../assets/images/leftArrow.png";
import { PulseLoader } from "react-spinners";
import { UserContext } from "../../context/userContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Timer from "../../components/ui/Timer";
import { apiCall } from "../../api/login";
import { toast } from "react-toastify";
import { ExitModel } from "../../components/exitModel/ExitModel";
import Guidelines from "./Guidelines";
import Modal from "../../components/Gmodal";
import ReadingQuestions from "../../components/ReadingQuestions";
import { useModal } from "../../context/ModalProvider";
import { ExitModel2 } from "../../components/exitModel/ExitModa2";

export default function Practice2() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const { user } = useContext(UserContext);
  const { activeModal } = useModal()
  console.log("activeModal", !activeModal)

  const [readingData, setReadingData] = useState();

  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSection, setCurrentSection] = useState('');
  const [type, setType] = useState("hard");
  const [exam_id, setExam_id] = useState("");
  const [barProgress, setBarProgress] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState({
    status: false,
    text: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true)
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const fetchCalled = useRef(false);
  const closeModal = () => {
    setIsOpen(false)
  }

  const getNewQuestions = async (params) => {
    try {
      setLoading({
        status: true,
        text: "Fetching Questions ...",
      });
      setExam_id(state.exam_id);
      // console.log(state.set_name)
      const response = (await apiCall.get(`get_questions11/${state.set_name}`)).data;
      setReadingData(response.reading.passages[0])
      setListeningData(response.listening.sections)
      setWritingData(response.writing.data)
      setLoading({
        status: false,
        text: "",
      });
    } catch (error) {
      console.log("error fetching question: ", error);
    }
  }

  // const uploadFile = async (file) => {
  //   if (!file) return;
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     // formData.forEach((value, key) => {
  //     //   console.log(`${key}:`, value);
  //     // });
  //     const response = await fetch(`https://studybot.zapto.org/upload`, {
  //       method: "POST",
  //       body: formData,
  //     }).then((data) => data.json());

  //     // console.log("Uploaded file text: ", response.text);
  //     const questions = Array.from(allQuestions);
  //     questions[currentQuestion].answer = response.text;
  //     setAllQuestions(questions);
  //   } catch (error) {
  //     console.log("error fetching question: ", error);
  //   }
  // };

  // const transcribeAudio = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://studybot.zapto.org/get_questions?type=${type}`,
  //       {
  //         method: "GET",
  //       }
  //     ).then((data) => data.json());
  //     // console.log("All questions: ", response.questionData);
  //     const questionsList = Array.from(response.questionData);
  //     for (let i = 0; i < questionsList.length; i++) {
  //       questionsList[i] = {
  //         ...questionsList[i],
  //         answer: "",
  //       };
  //     }
  //     // console.log("All questions(10): ", questionsList);
  //     setAllQuestions(questionsList);
  //   } catch (error) {
  //     console.log("error fetching question: ", error);
  //   }
  // };

  // const handleInputChange = (event) => {
  //   // setAllAnswers
  //   const answers = Array.from(allQuestions);
  //   answers[currentQuestion].answer = event.target.value;
  //   setAllQuestions(answers);
  // };

  const handleNextQuestion = () => {
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async (startingTime, endingTime) => {
    setBarProgress(100);
    // console.log("Clicking on handle submit: ");
    try {
      setLoading({
        status: true,
        text: "Evaluating your test responses ...",
      });
      let data;
      if (state.task_type === "task1") {
        data = allQuestions.map(({ question, answer, attachments }) => ({
          question,
          answer,
          image_url: attachments[0],
        }));
      } else {
        data = allQuestions.map(({ question, answer }) => ({
          question,
          answer,
        }));
      }

      const formatTime = (time) => {
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      };
      let total_time;
      // console.log("start time: ", startTime);
      // console.log("starting time: ", startingTime);
      // console.log("ending time: ", endingTime);
      if (startingTime && endingTime) {
        const time_elapsed = endTime - startTime;
        // const time_elapsed = endingTime - startingTime;
        total_time = formatTime(time_elapsed);
      } else {
        const current_time = new Date().getTime();
        const time_elapsed = current_time - startTime;
        // console.log("current time: ", current_time);
        // console.log("time elapsed: ", time_elapsed);
        total_time = formatTime(time_elapsed);
        // console.log("total time: ", total_time);
      }
      const evaluateBody = {
        questions_answers: data,
        task_type: state.task_type,
        timer: total_time,
        exam_id: state.exam_id,
        user_id: user.userid,
      };
      console.log("evaluate body: ", evaluateBody);
      const response = (
        await apiCall.post("evaluate", JSON.stringify(evaluateBody))
      ).data;
      const redirectedRoute = response.evaluation_id
        ? `/dashboard/performanceAnalytics?evaluationid=${response.evaluation_id}`
        : "/dashboard/tests/";
      navigate(redirectedRoute);
      console.log(response, "response");
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log("error fetching evaluation: ", error);
      navigate("/dashboard/tests");
    }
    setLoading({ status: false, text: "" });
  };

  useEffect(() => {
    if (!isOpen) {
      if (state) {
        getNewQuestions();
      } else {
        navigate("/dashboard/tests");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (allQuestions && !isOpen) {
      const progress = Math.floor(
        (currentQuestion / allQuestions.length) * 100
      );
      // const progress =
      //   currentQuestion === allQuestions.length - 1
      //     ? 100
      //     : Math.floor((currentQuestion / allQuestions.length) * 100);
      setBarProgress(progress < 0 ? 0 : progress);
      // console.log("progress: ", progress);
    }
  }, [allQuestions, allQuestions.length, currentQuestion, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const fetchServerTime = async () => {
        try {
          const response = await apiCall.get(`get_time?exam_id=${state.exam_id}`);
          const data = response.data;
          const currentTime = new Date().getTime();
          const serverTime = new Date(data.current_time).getTime();

          const oneHour = 60 * 60 * 1000;
          const targetEndTime = currentTime + oneHour;
          setStartTime(currentTime);
          setEndTime(targetEndTime);
        } catch (error) {
          console.error("Error fetching server time:", error);
        }
      };
      if (!fetchCalled.current) {
        fetchServerTime();
        fetchCalled.current = true;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      console.log("start time: ", startTime);
    }
  }, [startTime, isOpen]);

  const disableKeys = (e) => {
    // Block F12, Ctrl+U, and Ctrl+I
    if (
      e.key === "F12" ||
      (e.ctrlKey && (e.key === "u" || e.key === "i")) // Ctrl+U or Ctrl+I
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      document.addEventListener("keydown", disableKeys);
      return () => {
        document.removeEventListener("keydown", disableKeys);
      };
    }
  }, [isOpen]);

  return (
    <div>
      <div>
        {currentQuestion !== 1 && (
          <Link
            to="/dashboard/practice"
            className="inline-flex items-center border border-[#0AA6D7]-300 px-3 py-1.5 rounded-md text-[#0AA6D7] hover:bg-indigo-50"
            onClick={handleOpenModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              ></path>
            </svg>
            <span className="ml-1 font-bold text-lg">Back</span>
          </Link>
        )}
      </div>
      <div
        className={`bg-white rounded-lg mx-4 ${state.set_name.includes('exam_set') ? 'md:w-[90%]' : 'md:mx-auto max-w-[900px]'}  border-2 border-[#E4F9FF] my-8 `}
        style={{ boxShadow: "0.2px 0px 4px 4px rgb(122 219 249)" }}
      >
        {loading.status ? (
          <div className="h-[360px] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-[#0AA6D7]">
              <PulseLoader color={"#0AA6D7"} loading={loading.status} />
              <div>{loading.text}</div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full mx-auto mt-4">
              {exam_id && (
                <Timer
                  handleSubmit={handleSubmit}
                  start_time={startTime}
                  end_time={endTime}
                  exam_id={exam_id}
                />
              )}
            </div>
            {allQuestions && (
              <div className="flex justify-end px-8 pt-2">
                Total Questions : {allQuestions.length}
              </div>
            )}
            <div className="px-8 py-6 md:px-10 overflow-y-auto">
              {allQuestions && (
                <ProgressBar
                  completed={barProgress}
                  bgColor="#0AA6D7"
                  // transitionDuration="1s"
                  animateOnRender={true}
                  height="13px"
                  labelSize="10px"
                />
              )}

              <ReadingQuestions passages={readingData} />

              {/* Next and Prev Buttons starts*/}
              <div className="flex justify-between items-center">
                <div className="relative">
                  <div
                    className={`items-center justify-center bg-white border-2 pr-2 border-[#E4F9FF] text-[#0AA6D7] ${currentQuestion === 0 ? "hidden" : "flex"
                      }`}
                  >
                    <img src={leftArrow} className="w-6 h-6" alt="leftarrow" />
                    <Button
                      label="Prev"
                      type="button"
                      className="px-0"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestion === 0}
                    />
                  </div>
                </div>
                {currentQuestion === allQuestions.length - 1 ? (
                  <button
                    className="bg-[#0AA6D7] text-white px-4 py-1 rounded-lg"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <div className="flex items-center justify-center bg-white border-2 pl-2 border-[#E4F9FF] text-[#0AA6D7]">
                    <Button
                      label="Next"
                      type="button"
                      className="px-0"
                      onClick={handleNextQuestion}
                      disabled={currentQuestion === allQuestions.length - 1}
                    />
                    <img
                      src={leftArrow}
                      className="w-6 rotate-180 h-6"
                      alt="right arrow"
                    />
                  </div>
                )}
              </div>
              {/* Next and Prev Buttons ends*/}

            </div>
          </>
        )}
      </div>
      {activeModal &&
        (currentQuestion !== 1 ? (
          <ExitModel2
            heading="Exam"
            paragraph="Are you sure you want to exit"
            activeModal={activeModal}
            closeModal={closeModal}
          />
        ) : (
          <ExitModel2
            heading={currentQuestion + 1}
            paragraph="Are you sure you want to exit"
            activeModal={activeModal}
            closeModal={closeModal}
            handlePrevQuestion={handlePrevQuestion}
          />
        ))}
      {
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <Guidelines />
        </Modal>
      }
    </div>
  );
}