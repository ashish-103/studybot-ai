/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { PulseLoader } from "react-spinners";
import { UserContext } from "../../context/userContext";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "../../components/ui/Timer";
import { apiCall } from "../../api/login";
import { toast } from "react-toastify";
import { ExitModel } from "../../components/exitModel/ExitModel";
import Guidelines from "./Guidelines";
import Modal from "../../components/Gmodal";
import ReadingQuestions from "../../components/ReadingQuestions";
import ListeningQuestions from "../../components/ListeningQuestions";
import WritingQuestions from "../../components/WritingQuestions";
import { usePerformanceData } from "../../context/performanceContext";
import { UploadFile } from "../../components/UploadFile";
import { WordCounter } from "../../components/WordCounter";
import { TextArea } from "../../components/TextArea";
import { NextButton } from "../../components/ResubaleComponents/NextButton";
import { PrevButton } from "../../components/ResubaleComponents/PrevButton";
import { BackButton } from "../../components/ResubaleComponents/BackButton";
import { useFetchServerTime } from "../../hooks/useFetchServerTime";

export default function Practice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const { user } = useContext(UserContext);
  const { setPerformanceData } = usePerformanceData();
  const { startTime, endTime } = useFetchServerTime();


  const [examType, setExamType] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionsList, setQuestionsList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [type, setType] = useState("hard");
  const [exam_id, setExam_id] = useState("");
  const [barProgress, setBarProgress] = useState(0);
  const [loading, setLoading] = useState({
    status: false,
    text: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true)
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [answers, setAnswers] = useState({
    exam_set: state?.set_name,
    reading: {
      mcq: {},
      shortAnswer: {},
      trueFalse: {},
    },
    writing: {
      // Writing answers
    },
    listening: {
      // Listening answers
    },
  });

  const closeModal = () => {
    setIsOpen(false)
  }
  const getQuestions = async () => {
    try {
      setLoading({
        status: true,
        text: "Fetching Questions ...",
      });
      setExam_id(state.exam_id);
      if (state.set_name.includes('exam_set')) {
        // console.log(examType)
        setExamType(state.set_name)
        // console.log(state.set_name)
        const response = (await apiCall.get(`get_questions11/${state.set_name}`)).data;
        console.log('api response', response.writing.data.task1)
        // console.log('writing', response.writing)
        const sections = [response.reading, response.listening, response.writing.data.task1, response.writing.data.task2]
        // console.log("sections", sections);
        setQuestionsList(sections)
        setCurrentQuestion(0)
        console.log('question', questionsList)
      } else {

        const response = (await apiCall.get(`get_questions?exam_id=${state.exam_id}&exam_name=${state.task_type}`)).data;
        setQuestionsList(response.questionData);
      }
      setLoading({
        status: false,
        text: "",
      });
    } catch (error) {
      console.log("error fetching question: ", error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      if (state) {
        getQuestions();
      } else {
        navigate("/dashboard/tests");
      }
    }
  }, [isOpen, navigate]);

  useEffect(() => {
    if (questionsList && !isOpen) {
      const progress = Math.floor(
        (currentQuestion / questionsList.length) * 100
      );
      // const progress =
      //   currentQuestion === allQuestions.length - 1
      //     ? 100
      //     : Math.floor((currentQuestion / allQuestions.length) * 100);
      setBarProgress(progress < 0 ? 0 : progress);
      // console.log("progress: ", progress);
    }
  }, [questionsList, questionsList.length, currentQuestion, isOpen]);

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



  const uploadFile = async (file) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      // formData.forEach((value, key) => {
      //   console.log(`${key}:`, value);
      // });
      const response = await fetch(`https://studybot.zapto.org/upload`, {
        method: "POST",
        body: formData,
      }).then((data) => data.json());

      // console.log("Uploaded file text: ", response.text);
      const questions = Array.from(questionsList);
      questions[currentQuestion].answer = response.text;
      setQuestionsList(questions);
    } catch (error) {
      console.log("error fetching question: ", error);
    }
  };

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
  //     console.log("All questions(10): ", questionsList);
  //     setAllQuestions(questionsList);
  //   } catch (error) {
  //     console.log("error fetching question: ", error);
  //   }
  // };

  const handleInputChange = (question, answer) => {
    // setAllAnswers
    // const answers = Array.from(allQuestions);
    // answers[currentQuestion].answer = event.target.value;
    // setAllQuestions(answers);
    setAnswers((prev) => ({
      ...prev,
      writing: {
        ...prev.writing,
        [question]: answer, // Save answer under question ID
      },
    }));
  }

  const lastQuestion = questionsList.length - 1;

  const handleNextQuestion = () => {
    if (currentQuestion < lastQuestion) {
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

      const formatTime = (time) => {
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      };
      let total_time;
      if (startingTime && endingTime) {
        const time_elapsed = endTime - startTime;
        total_time = formatTime(time_elapsed);
      } else {
        const current_time = new Date().getTime();
        const time_elapsed = current_time - startTime;
        total_time = formatTime(time_elapsed);
      }
      if (state.set_name.includes('exam_set')) {
        console.log(answers);

        const response = (
          await apiCall.post(`evaluate_exam1111`, JSON.stringify(answers))
        ).data;
        console.log(response);
        setPerformanceData(response)
        navigate("/dashboard/performanceAnalytics2")

      } else {

        let data;
        if (state.task_type === "task1") {
          data = questionsList.map(({ question, answer, attachments }) => ({
            question,
            answer,
            image_url: attachments[0],
          }));
        } else {
          data = questionsList.map(({ question, answer }) => ({
            question,
            answer,
          }));
        }
        const evaluateBody = {
          questions_answers: answers.writing,
          task_type: state.task_type,
          timer: total_time,
          exam_id: state.exam_id,
          user_id: user.userid,
        };
        console.log(evaluateBody)
        console.log("evaluate body: ", evaluateBody);
        const response = (
          await apiCall.post("evaluate", JSON.stringify(evaluateBody))
        ).data;
        const redirectedRoute = response.evaluation_id
          ? `/dashboard/performanceAnalytics?evaluationid=${response.evaluation_id}`
          : "/dashboard/tests/";
        navigate(redirectedRoute);
        console.log(response, "response");

      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log("error fetching evaluation: ", error);
      navigate("/dashboard/tests");
    }
    setLoading({ status: false, text: "" });
  };

  const handleAnswerupdate = (section, sectionAnswers) => {
    setAnswers((prev) => ({
      ...prev,
      [section]: sectionAnswers,
    }));
  }


  return (
    <div>
      {currentQuestion !== 1 && <BackButton handleClick={handleOpenModal} />}
      <div
        className='bg-white rounded-lg mx-4 md:mx-auto max-w-[900px] border-2 border-[#E4F9FF] my-8'
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
            <div className="flex justify-end px-8 pt-2">
              {examType ? `Total Section: ` : `Total Questions: `}
              {`${questionsList.length}`}
            </div>


            <div className="px-4 py-3  md:py-6 md:px-10 overflow-y-auto">
              {/* Progressbar */}
              {questionsList && (
                <ProgressBar
                  completed={barProgress}
                  bgColor="#0AA6D7"
                  // transitionDuration="1s"
                  animateOnRender={true}
                  height="13px"
                  labelSize="10px"
                />
              )}
              {/* Progressbar */}

              {examType ? <>
                {currentQuestion === 0 &&
                  <ReadingQuestions
                    answers={answers.reading}
                    onAnswerChange={(answers) => handleAnswerupdate('reading', answers)}
                    passages={questionsList[0].passages[0]} />}
                {currentQuestion === 1 &&
                  <ListeningQuestions
                    answers={answers.listening}
                    onAnswerChange={(answers) => handleAnswerupdate('listening', answers)}
                    listeningData={questionsList[1]} />}
                {currentQuestion === 2 &&
                  <WritingQuestions
                    answers={answers.writing}
                    onAnswerChange={(answers) => handleAnswerupdate('writing', answers)}
                    writingData={questionsList[2]}
                    q={currentQuestion}
                  />}
                {currentQuestion === 3 &&
                  <WritingQuestions
                    answers={answers.writing}
                    onAnswerChange={(answers) => handleAnswerupdate('writing', answers)}
                    writingData={questionsList[3]}
                    q={currentQuestion}
                  />}
              </> :
                <div>
                  {questionsList.slice(currentQuestion, currentQuestion + 1).map((q, index) => (
                    <>
                      <div className="flex justify-between py-5 items-center">
                        <h2>Question: {currentQuestion + 1}</h2>
                      </div>
                      <div>
                        <p>{q.question}</p>
                        <div className="flex flex-wrap">
                          {q.attachments && q.attachments.map((x, i) =>
                          (<img
                            src={`${x}`}
                            alt={`attachment${i}`}
                            className={`${q.attachments.length > 1 ? "lg:w-1/2" : "w-2/3"} pt-5 mx-auto`}
                          />)
                          )}
                          <div className="flex flex-wrap nter items-center sm:justify-start gap-5">
                            <TextArea value={answers.writing[q.question]} plan={user.plan_name} q={q.question} onChange={handleInputChange} />
                            <UploadFile display={'hidden'} file={uploadFile} />
                            <WordCounter text={answers.writing[q.question]} />
                          </div>
                        </div>
                      </div>
                    </>))}
                  {/* Questions Sections ends */}
                </div >
              }

              {/* Next and Prev Buttons starts*/}
              <div className="flex justify-between items-center">
                <div className="relative">
                  <PrevButton currentQuestion={currentQuestion} handleClick={handlePrevQuestion} handleDisabled={currentQuestion === 0} />
                </div>
                {currentQuestion === lastQuestion ? (
                  <button
                    className="bg-[#0AA6D7] text-white px-4 py-1 rounded-lg"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                ) : (
                  <NextButton handleClick={handleNextQuestion} handleDisabled={currentQuestion === lastQuestion} />
                )}
              </div>
              {/* Next and Prev Buttons ends*/}
            </div>
          </>
        )}
      </div>
      {/* Modals  */}
      {isModalOpen &&
        (currentQuestion !== 1 ? (
          <ExitModel
            heading="Exam"
            paragraph="Are you sure you want to exit"
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <ExitModel
            heading={currentQuestion + 1}
            paragraph="Are you sure you want to exit"
            isModalOpen={isModalOpen}
            handleCloseModal={handleCloseModal}
            handlePrevQuestion={handlePrevQuestion}
          />
        ))}
      {
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <Guidelines setName={state?.set_name} />
        </Modal>
      }
    </div>
  );
}
