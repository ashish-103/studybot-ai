import React, { useState, useEffect, useRef } from "react";

export default function ReadingQuestions({ passages, onAnswerChange, answers = {} }) {
  const prevAnswersRef = useRef();

  useEffect(() => {
    if (prevAnswersRef.current !== answers) {
      onAnswerChange(answers);
      prevAnswersRef.current = answers;
    }
  }, [answers, onAnswerChange]);

  // Handlers for different question types
  const handleMcqChange = (question, option) => {
    onAnswerChange({
      ...answers,
      mcq: { ...answers.mcq, [question]: option }, // Store under mcq key
    });
  };

  const handleShortAnswerChange = (question, value) => {
    onAnswerChange({
      ...answers,
      shortAnswer: { ...answers.shortAnswer, [question]: value }, // Store under shortAnswer key
    });
  };

  const handleTrueFalseChange = (question, value) => {
    onAnswerChange({
      ...answers,
      trueFalse: { ...answers.trueFalse, [question]: value }, // Store under trueFalse key
    });
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl mt-8">{passages?.title}</h1>
      <h3 className="pl-0 p-4">Author: {passages?.author}</h3>
      {passages?.content &&
        Object.entries(passages?.content).map(([key, paragraph]) => <p key={key}>{paragraph}</p>)}

      <hr />
      <h2 className="text-2xl pl-0 p-2 mt-4">Multiple Choice Questions</h2>
      {passages?.questions?.multiple_choice.map((mcq, i) => (
        <div key={mcq.question} className="question" style={{ marginBottom: "20px" }}>
          <p className="mb-4">{i + 1}. {mcq.question}</p>
          {mcq.options.map((option, j) => (
            <label key={j} className="pl-6">
              <input
                type="radio"
                name={`mcq-${mcq.question}`}
                value={option}
                checked={answers.mcq?.[mcq.question] === option}
                onChange={() => handleMcqChange(mcq.question, option)}
              />{" "}
              {option}
              <br />
            </label>
          ))}
        </div>
      ))}

      <hr />
      <h2 className="text-2xl pl-0 p-2 mt-4">Short Answer Questions</h2>
      {passages?.questions?.short_answer.map((saq, i) => (
        <div className="question" key={saq.question} style={{ marginBottom: "20px" }}>
          <p className="mb-2">{i + 1}. {saq.question}</p>
          <input
            className="outline-gray-400 border border-gray-300 rounded-md px-4 py-2"
            type="text"
            name={`short-${saq.question}`}
            value={answers.shortAnswer?.[saq.question] || ""}
            onChange={(e) => handleShortAnswerChange(saq.question, e.target.value)}
            style={{ width: "60%" }}
          />
        </div>
      ))}

      <hr />
      <h2 className="text-2xl pl-0 p-2 mt-4">True or False</h2>
      {passages?.questions?.true_false.map((tfq, i) => (
        <div className="question" key={tfq.question} style={{ marginBottom: "20px" }}>
          <p className="mb-2">{i + 1}. {tfq.question}</p>
          <label className="px-4">
            <input
              type="radio"
              name={`tf-${tfq.question}`}
              value="True"
              checked={answers.trueFalse?.[tfq.question] === "True"}
              onChange={() => handleTrueFalseChange(tfq.question, "True")}
            />{" "}
            True
          </label>
          <label className="px-4">
            <input
              type="radio"
              name={`tf-${tfq.question}`}
              value="False"
              checked={answers.trueFalse?.[tfq.question] === "False"}
              onChange={() => handleTrueFalseChange(tfq.question, "False")}
            />{" "}
            False
          </label>
        </div>
      ))}
    </div>
  );
}
