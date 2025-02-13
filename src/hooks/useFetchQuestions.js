/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiCall } from "../api/login";

export default function useFetchQuestions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [isOpen, setIsOpen] = useState(true)

  const [questionsList, setQuestionsList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examType, setExamType] = useState(null);
  const [exam_id, setExam_id] = useState("");
  const [loading, setLoading] = useState({
    status: false,
    text: "",
  });
  const getQuestions = useCallback(async () => {
    try {
      setLoading({
        status: true,
        text: "Fetching Questions ...",
      });
      setExam_id(state.exam_id);
      if (state.set_name.includes('exam_set')) {

        setExamType(state.set_name)
        const { data } = await apiCall.get(`get_questions11/${state.set_name}`)
        console.log('data',data);
        const { reading, listening, writing } = data;
        const sections = [reading, listening, writing.data.task1, writing.data.task2]
        setQuestionsList(sections)
        setCurrentQuestion(0)

      } else {

        const response = (
          await apiCall.get(
            `get_questions?exam_id=${state.exam_id}&exam_name=${state.task_type}`
          )
        ).data;
        console.log('questions',response);
        const questionsList = Array.from(response.questionData);
        for (let i = 0; i < questionsList.length; i++) {
          questionsList[i] = {
            ...questionsList[i],
            answer: "",
          };
        }
        setQuestionsList(questionsList);
      }
      setLoading({
        status: false,
        text: "",
      });
    } catch (error) {
      console.log("error fetching question: ", error);
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      if (state) {
        getQuestions();
      } else {
        navigate("/dashboard/tests");
      }
    }
  }, [getQuestions, isOpen, navigate, state]);

  return {
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
  }
};
