/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { PulseLoader } from "react-spinners";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { apiCall } from "../../api/login";

import { usePerformanceData } from "../../context/performanceContext";
import { UserContext } from "../../context/userContext";

import Timer from "../../components/ui/Timer";
import Guidelines from "./Guidelines";
import Modal from "../../components/Gmodal";

import ReadingQuestions from "../../components/ReadingQuestions";
import ListeningQuestions from "../../components/ListeningQuestions";
import WritingQuestions from "../../components/WritingQuestions";

import ExitModel from "../../components/exitModel/ExitModel";
import UploadFile from "../../components/UploadFile";
import WordCounter from "../../components/WordCounter";
import TextArea from "../../components/TextArea";
import SubmitButton from "../../components/SubmitButton";
import BackButton from "../../components/ResubaleComponents/BackButton"
import PrevButton from "../../components/ResubaleComponents/PrevButton"
import NextButton from "../../components/ResubaleComponents/NextButton"
import useFetchServerTime from "../../hooks/useFetchServerTime";
import useFetchQuestions from "../../hooks/useFetchQuestions";

export default function Practice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const { user } = useContext(UserContext);
  const { setPerformanceData } = usePerformanceData();
  const { startTime, endTime } = useFetchServerTime();
  const {
    isOpen,
    setIsOpen,
    currentQuestion,
    examType,
    exam_id,
    loading,
    questionsList,
    setLoading,
    setQuestionsList,
    setCurrentQuestion,
  } = useFetchQuestions(state);


  // const [type, setType] = useState("hard");
  const [barProgress, setBarProgress] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      question: "",
      answer: "",
      attachments: ""
    },
    listening: {
      // Listening answers
    },
  });
  const [inputValues, setInputValues] = useState({});  // Stores real-time textarea input
  const [storedAnswers, setStoredAnswers] = useState([]);  // Stores finalized answers

  const closeModal = () => {
    setIsOpen(false)
  }

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
  const handleInputChange = (questionIndex) => (e) => {
    const { value } = e.target;

    setInputValues((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const saveAnswer = (questionIndex, section, questionText, attachments) => {
    setStoredAnswers((prev) => {
      // Check if answer already exists
      const existingAnswerIndex = prev.findIndex((a) => a.questionIndex === questionIndex);

      if (existingAnswerIndex !== -1) {
        // Update existing answer
        return prev.map((item, index) =>
          index === existingAnswerIndex ? { ...item, answer: inputValues[questionIndex] || "" } : item
        );
      } else {
        // Add a new answer entry
        return [
          ...prev,
          {
            questionIndex,
            section,
            question: questionText,
            answer: inputValues[questionIndex] || "",
            attachments: attachments || [],
          },
        ];
      }
    });
  };





  const lastQuestion = questionsList.length - 1;

  const nextQuestion = () => {
    if (currentQuestion < lastQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
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

        // let data;
        // // console.log("answers writing", storedAnswers);
        // if (state.task_type === "task1") {
        //   data = answers.map(({ question, answer, attachments }) => ({
        //     question,
        //     answer,
        //     image_url: attachments[0],
        //   }));
        //   console.log('data', data);
        // } else {
        //   data = answers.map(({ question, answer }) => ({
        //     question,
        //     answer,
        //   }));
        // }
        const evaluateBody = {
          questions_answers: storedAnswers,
          task_type: state.task_type,
          timer: total_time,
          exam_id: state.exam_id,
          user_id: user.userid,
        };
        console.log("evaluate body: ", evaluateBody);
        const response = (
          await apiCall.post("evaluate", JSON.stringify(evaluateBody))
        ).data;
        console.log('evaluate response', response);
        const redirectedRoute = response.evaluation_id
          ? `/dashboard/performanceAnalytics?evaluationid=${response.evaluation_id}`
          : "/dashboard/tests/";
        navigate(redirectedRoute);
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
                  {questionsList.slice(currentQuestion, currentQuestion + 1).map
                    ((q, index) => (
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
                              <textarea
                                className="w-[900px] my-10 appearance-none lg:h-[170px] text-md py-1 px-2 focus:outline-none border-2 rounded-lg border-[#E4F9FF] focus:ring-blue-600 focus:border-[#0AA6D7] text-black placeholder-blue-300 dark:placeholder-gray-600   "
                                type="search"
                                name="q"
                                placeholder="Answer :"
                                value={
                                  inputValues[currentQuestion] !== undefined
                                    ? inputValues[currentQuestion]  // Use live input if available
                                    : storedAnswers.find((a) => a.questionIndex === currentQuestion)?.answer || "" // Fallback to stored answer
                                }
                                onChange={handleInputChange(currentQuestion)}
                                onBlur={() => saveAnswer(currentQuestion, "writing", q.question, q.attachments)} // Save on blur
                              />
                              <UploadFile display={'hidden'} file={uploadFile} />
                              <WordCounter text={answers.writing.answer} />
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  {/* <WritingQuestions answer={answers.writing} onAnswerChange={handleAnswerupdate} writingData={questionsList.slice(currentQuestion, currentQuestion + 1)} q={currentQuestion} /> */}
                </div >
              }

              {/* Questions Sections ends */}

              {/* Next and Prev Buttons starts*/}
              <div className="flex justify-between items-center">

                <div className="relative">
                  <PrevButton currentQuestion={currentQuestion} handleClick={prevQuestion} handleDisabled={currentQuestion === 0} />
                </div>

                {
                  currentQuestion === lastQuestion ?
                    <SubmitButton handleSubmit={handleSubmit} />
                    :
                    <NextButton handleClick={nextQuestion} handleDisabled={currentQuestion === lastQuestion} />
                }
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
            handlePrevQuestion={prevQuestion}
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
