import React, { useState } from "react";

export default function ListeningQuestions({ listeningData, onAnswerChange, answers = {} }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handleAnswerChange = (question, value) => {
    onAnswerChange({
      ...answers,
      [question]: value,
    });
  };

  return (
    <div className="p-2 my-4">
      <div className="flex space-x-2 mb-4">
        {listeningData.sections.map((section, index) => (
          <button
            key={index}
            onClick={() => setCurrentSectionIndex(index)}
            className={`px-4 py-2 rounded ${currentSectionIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {section.section_name}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-bold">{listeningData.sections[currentSectionIndex].section_name}</h2>

      <audio controls className="w-full ml-0 m-4">
        <source src={listeningData.sections[currentSectionIndex].metadata.audio_url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {listeningData.sections[currentSectionIndex].questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-4">
          <p className="font-medium">
            {questionIndex + 1}. {question.question}
          </p>
          {question.options ? (
            Object.entries(question.options).map(([key, option]) => (
              <label key={key} className="block">
                <input
                  type="radio"
                  name={`question-${question.question_id}`}
                  value={key}
                  checked={answers[question.question] === key}
                  onChange={() => handleAnswerChange(question.question, key)}
                /> {" "}
                {option}
              </label>
            ))
          ) : (
            <input
              type="text"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              placeholder="Your answer..."
              value={answers[question.question] || ""}
              onChange={(e) => handleAnswerChange(question.question, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
