import React, { useEffect } from "react";
import { usePerformanceData } from "../../context/performanceContext";
import { useNavigate } from "react-router-dom";

export default function PerformanceAnalytics2() {
  console.log("performanceAnalytics")
  const { data } = usePerformanceData();
  const navigate = useNavigate()

  useEffect(() => {
    console.log('data', data)
    if (data === null) {
      navigate("/dashboard/tests");
    }
  }, [data, navigate]);

  if (!data) {
    <p>Loading...</p>
  }
  return (
    <div className="p-6  min-h-screen">
      <div className=" w-full rounded-lg">
        <h1 className="text-2xl font-bold mb-4">IELTS Test Results</h1>

        {/* Listening Section */}
        <section className="mb-6 shadow-lg bg-white p-6 w-full rounded-md">
          <h2 className="text-2xl font-semibold">Listening</h2>
          <p><strong>Band Score:</strong> {data.listening.band_score}</p>
          <p><strong>Correct Answers:</strong> {data.listening.correct_count}</p>
          <p><strong>Description:</strong> {data.listening.description.description}</p>
          <p><strong>Skill Level:</strong> {data.listening.description.skill_level}</p>
        </section>

        {/* Reading Section */}
        <section className="mb-6 shadow-lg bg-white p-6 w-full rounded-md">
          <h2 className="text-2xl font-semibold">Reading</h2>
          <p><strong>Band Score:</strong> {data.reading.band_score}</p>
          <p><strong>Correct Answers:</strong> {data.reading.correct_count}</p>
          <p><strong>Description:</strong> {data.reading.description.description}</p>
          <p><strong>Skill Level:</strong> {data.reading.description.skill_level}</p>
        </section>

        {/* Writing Section */}
        <section className="mb-6 shadow-lg bg-white p-6 w-full rounded-md">
          <h2 className="text-2xl font-semibold">Writing</h2>
          {data.writing.map((entry, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold">Question {index + 1}</h3>
              <p className="text-gray-700 mb-2">{entry.question}</p>
              {entry.essay_evaluation.error ? (
                <p className="text-red-500">Error: {entry.essay_evaluation.error}</p>
              ) : (
                <div>
                  <p><strong>Task Response:</strong> {entry.essay_evaluation.Task_Response_Band[1]}</p>
                  <p><strong>Coherence & Cohesion:</strong> {entry.essay_evaluation.Coherence_and_Cohesion_Band[1]}</p>
                  <p><strong>Grammatical Range:</strong> {entry.essay_evaluation.Grammatical_Range_and_Accuracy_Band[1]}</p>
                  <p><strong>Lexical Resource:</strong> {entry.essay_evaluation.Lexical_Resource_Band[1]}</p>
                  <p><strong>Suggestions:</strong> {entry.essay_evaluation.AI_Suggestions}</p>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
