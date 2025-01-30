import React, { useState } from 'react';

export default function ReadingQuestions({ passages }) {
  // Initialize state to store answers
  const [answers, setAnswers] = useState({
    mcq: {},
    shortAnswer: {},
    trueFalse: {}
  });

  // Handle change for multiple choice questions
  const handleMcqChange = (i, value) => {
    setAnswers(prev => ({
      ...prev,
      mcq: {
        ...prev.mcq,
        [i]: value
      }
    }));
  };

  // Handle change for short answer questions
  const handleShortAnswerChange = (i, value) => {
    setAnswers(prev => ({
      ...prev,
      shortAnswer: {
        ...prev.shortAnswer,
        [i]: value
      }
    }));
  };

  // Handle change for true/false questions
  const handleTrueFalseChange = (i, value) => {
    setAnswers(prev => ({
      ...prev,
      trueFalse: {
        ...prev.trueFalse,
        [i]: value
      }
    }));
  };

  // Handle form submission for multiple choice questions
  const handleMcqSubmit = () => {
    console.log("Multiple Choice Answers: ", answers.mcq);
    // Process the mcq answers (send to server, validation, etc.)
  };

  // Handle form submission for short answer questions
  const handleShortAnswerSubmit = () => {
    console.log("Short Answer Answers: ", answers.shortAnswer);
    // Process the short answer answers (send to server, validation, etc.)
  };

  // Handle form submission for true/false questions
  const handleTrueFalseSubmit = () => {
    console.log("True/False Answers: ", answers.trueFalse);
    // Process the true/false answers (send to server, validation, etc.)
  };

  return (
    <div>
      <h1 className='text-2xl mt-8'>{passages?.title}</h1>
      <h3 className='pl-0 p-4 '>Author: {passages?.author}</h3>
      {passages?.content && Object.entries(passages?.content).map(([key, paragraph]) => (
        <p key={key}>{paragraph}</p>
      ))}

      <hr />
      <h2 className="text-2xl pl-0 p-2 mt-4">Multiple Choice Questions</h2>
      {passages?.questions?.multiple_choice.map((mcq, i) => (
        <div key={i} className="question" style={{ marginBottom: "20px" }}>
          <p className="mb-4">{i + 1}. {mcq.question}</p>
          {mcq.options.map((option, j) => (
            <label key={j} className="pl-6">
              <input
                type="radio"
                name={`mcq${i}`}
                value={option}
                checked={answers.mcq[i] === option}
                onChange={() => handleMcqChange(i, option)}
              /> {option}
              <br />
            </label>
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={handleMcqSubmit}
        className='mt-4 text-blue-600 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white'
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Submit
      </button>

      <hr />
      <h2 className="text-2xl pl-0 p-2 mt-4">Short Answer Questions</h2>
      {passages?.questions?.short_answer.map((saq, i) => (
        <div className="question" key={i} style={{ marginBottom: "20px" }}>
          <p className='mb-2'>{i + 1}. {saq.question}</p>
          <input
            className="outline-gray-400 border border-gray-300 rounded-md px-4 py-2"
            type="text"
            name={`short${i}`}
            value={answers.shortAnswer[i] || ''}
            onChange={(e) => handleShortAnswerChange(i, e.target.value)}
            style={{ width: "60%" }}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleShortAnswerSubmit}
        className='mt-4 text-blue-600 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white'
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Submit
      </button>

      <hr />
      <h2 className="text-2xl pl-0 p-2 mt-4">True or False</h2>
      {passages?.questions?.true_false.map((tfq, i) => (
        <div className="question" key={i} style={{ marginBottom: "20px" }}>
          <p className='mb-2'>{i + 1}. {tfq.question}</p>
          <label className="px-4">
            <input
              type="radio"
              name={`tf${i}`}
              value="True"
              checked={answers.trueFalse[i] === "True"}
              onChange={() => handleTrueFalseChange(i, "True")}
            /> True
          </label>
          <label className="px-4">
            <input
              type="radio"
              name={`tf${i}`}
              value="False"
              checked={answers.trueFalse[i] === "False"}
              onChange={() => handleTrueFalseChange(i, "False")}
            /> False
          </label>
        </div>
      ))}
      <button
        type="button"
        onClick={handleTrueFalseSubmit}
        className='mt-4 text-blue-600 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white'
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Submit
      </button>
    </div>
  );
}
