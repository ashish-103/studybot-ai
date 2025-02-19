import "@fortawesome/fontawesome-free/css/all.css";
import SectionalSummary from "../../components/analytics/SectionalSummary";
import PerformanceSummary from "../../components/analytics/PerformanceSummary";
import StrengthAndWeakness from "../../components/analytics/StrengthAndWeakness";
import AreasToImprove from "../../components/analytics/AreasToImprove";
import DetailedAnalysis from "../../components/analytics/DetailedAnalysis";
import QuestionDistribution from "../../components/analytics/QuestionDistribution";
import TestSummary from "../../components/analytics/TestSummary";
import { AnalyticsContext } from "../../context/analyticsContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { apiCall } from "../../api/login";

const PerformanceAnalytics = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    analyticsData = [],
    summaryData = [],
    setAnalyticsData,
    miscData = [],
    setMiscData,
    setSummaryData,
  } = useContext(AnalyticsContext);
  const [loading, setLoading] = useState({
    status: false,
    text: "",
  });
  const [evaluationid, setEvaluationid] = useState();
  const [rating, setRating] = useState(null);

  const getEvaluation = async () => {
    try {
      setLoading({
        status: true,
        text: "Fetching Results ...",
      });
      // https://studybot.zapto.org/get-evaluation/67936e82c471f51d5b407f26duce length

      const response = (await apiCall.get(`get-evaluation/${evaluationid}`))
        .data;

      console.log("API Response:", response); // Log response to check its structure

      setAnalyticsData(response[0]["questions_answers"]);
      setMiscData(response[0]);
      setRating(response[0]?.rating); // Set the rating from the response

      // console.log("reponse: ", response[0]["questions_answers"]);
      // console.log("reponse---: ", response[0]["graph_value_coherence"]);
    } catch (error) {
      console.log("error fetching question: ", error);
    }
  };

  useEffect(() => {
    // console.log("misc dataa: ", miscData);
  }, [miscData]);

  // const calculateBandValues = (object, i, name) => {
  //   const band_score =
  //     analyticsData[i]["gpt_evaluation"][name] === "N/A"
  //       ? 0
  //       : analyticsData[i]["gpt_evaluation"][name][0];
  //   object.score += band_score;
  //   return object;
  // };

  const calculateBandValues = (object, i, name) => {
    if (!analyticsData[i] || !analyticsData[i]["gpt_evaluation"]) {
      console.error(`Missing gpt_evaluation data for index ${i}`);
      return object;
    }

    let band_score_raw = analyticsData[i]["gpt_evaluation"][name];

    let band_score = (band_score_raw === "N/A")
      ? 0
      : Array.isArray(band_score_raw)
        ? band_score_raw[0]
        : band_score_raw;

    object.score += band_score;
    return object;
  };

  const calculateSummaryDetails = () => {
    const total_questions = analyticsData.length;
    const timeTaken = miscData["time"];
    let task_response_band = {
      score: 0,
      accuracy: 0,
      time: timeTaken,
    },
      coherence_band = {
        score: 0,
        accuracy: 0,
        time: timeTaken,
      },
      lexical_band = {
        score: 0,
        accuracy: 0,
        time: timeTaken,
      },
      grammar_band = {
        score: 0,
        accuracy: 0,
        time: timeTaken,
      };
    let attemptedQues = 0;
    for (let i = 0; i < total_questions; i++) {
      task_response_band = calculateBandValues(
        task_response_band,
        i,
        "Task_Response_Band"
      );
      coherence_band = calculateBandValues(
        coherence_band,
        i,
        "Coherence_and_Cohesion_Band"
      );
      lexical_band = calculateBandValues(
        lexical_band,
        i,
        "Lexical_Resource_Band"
      );
      grammar_band = calculateBandValues(
        lexical_band,
        i,
        "Grammatical_Range_and_Accuracy_Band"
      );
      const word_count =
        analyticsData[i]["gpt_evaluation"]["Word_Count"] === "N/A"
          ? 0
          : analyticsData[i]["gpt_evaluation"]["Word_Count"];
      if (word_count > 0) {
        attemptedQues += 1;
      }
    }

    task_response_band.score /= total_questions;
    coherence_band.score /= total_questions;
    lexical_band.score /= total_questions;
    grammar_band.score /= total_questions;
    console.log('task_response_band', task_response_band)
    task_response_band.accuracy = (
      task_response_band.score *
      (100 / 9)
    ).toFixed(2);
    coherence_band.accuracy = (coherence_band.score * (100 / 9)).toFixed(2);
    lexical_band.accuracy = (lexical_band.score * (100 / 9)).toFixed(2);
    grammar_band.accuracy = (grammar_band.score * (100 / 9)).toFixed(2);

    const convertTimeToSeconds = (timeString) => {
      const [minutes, seconds] = timeString.split(":").map(Number);
      return minutes * 60 + seconds;
    };
    const SummaryTableData = [
      {
        section_name: "Task Acheivement",
        obj: task_response_band,
        score: `${task_response_band.score}`,
        score_value: task_response_band.score / 9,
        attempted: `${attemptedQues}/${total_questions}`,
        attempted_value: attemptedQues / total_questions,
        attempted_ques: attemptedQues,
        accuracy: `${task_response_band.accuracy}%`,
        accuracy_value: task_response_band.accuracy / 100,
        time: `${task_response_band.time} / 60 min`,
        time_value: convertTimeToSeconds(task_response_band.time) / 3600,
        ip_address: "205.255.209.215",
        status: true,
      },
      {
        section_name: "Coherence and Cohesion",
        obj: coherence_band,
        score: `${coherence_band.score}`,
        score_value: coherence_band.score / 9,
        attempted: `${attemptedQues}/${total_questions}`,
        attempted_value: attemptedQues / total_questions,
        attempted_ques: attemptedQues,
        accuracy: `${coherence_band.accuracy}%`,
        accuracy_value: coherence_band.accuracy / 100,
        time: `${coherence_band.time} / 60 min`,
        time_value: convertTimeToSeconds(coherence_band.time) / 3600,
        ip_address: "34.159.101.181",
        status: true,
      },
      {
        section_name: "Lexical Resource",
        obj: lexical_band,
        score: `${lexical_band.score}`,
        score_value: lexical_band.score / 9,
        attempted: `${attemptedQues}/${total_questions}`,
        attempted_value: attemptedQues / total_questions,
        attempted_ques: attemptedQues,
        accuracy: `${lexical_band.accuracy}%`,
        accuracy_value: lexical_band.accuracy / 100,
        time: `${lexical_band.time} / 60 min`,
        time_value: convertTimeToSeconds(lexical_band.time) / 3600,
        ip_address: "184.139.248.150",
        status: true,
      },
      {
        section_name: "Grammatical Range And Accuracy",
        obj: grammar_band,
        score: `${grammar_band.score}`,
        score_value: grammar_band.score / 9,
        attempted: `${attemptedQues}/${total_questions}`,
        attempted_value: attemptedQues / total_questions,
        attempted_ques: attemptedQues,
        accuracy: `${grammar_band.accuracy}%`,
        accuracy_value: grammar_band.accuracy / 100,
        time: `${grammar_band.time} / 60 min`,
        time_value: convertTimeToSeconds(grammar_band.time) / 3600,
        ip_address: "206.48.254.74",
        status: true,
      },
    ];
    setSummaryData(SummaryTableData);
  };

  useEffect(() => {
    if (evaluationid) {
      getEvaluation();
    }
  }, [evaluationid]);

  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const evaluationId = queryParams.get("evaluationid");
    if (evaluationId) {
      setEvaluationid(evaluationId);
    } else {
      navigate("/dashboard/tests");
    }
  }, [location, navigate]);

  useEffect(() => {
    if (Array.isArray(analyticsData) && analyticsData.length > 0) {
      calculateSummaryDetails();
      setLoading({
        status: false,
        text: "",
      });
    }
  }, [analyticsData]);

  return loading.status ? (
    <div className="h-[360px] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-[#0AA6D7]">
        <PulseLoader color={"#0AA6D7"} loading={loading.status} />
        <div>{loading.text}</div>
      </div>
    </div>
  ) : (
    Array.isArray(analyticsData) && analyticsData.length > 0 && (
      <>
        <TestSummary ratings={rating} />
        <PerformanceSummary />
        {Array.isArray(summaryData) && summaryData.length > 0 && (
          <SectionalSummary />
        )}
        <DetailedAnalysis />
        <StrengthAndWeakness />
        <AreasToImprove />
        {/* {Array.isArray(summaryData) && summaryData.length > 0 && (
          <QuestionDistribution />
        )} */}
        {miscData ? <QuestionDistribution /> : null}
      </>
    )
  );
};

export default PerformanceAnalytics;
