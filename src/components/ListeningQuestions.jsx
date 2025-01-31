import React from "react";

export default function ListeningQuestions({ listeningData, onAnswerChange, answers = {} }) {
  const handleAnswerChange = (question, value) => {
    onAnswerChange({
      ...answers,
      [question]: value, // Store question text as the key with answer as the value
    });
  };

  return (
    <div className="p-2 my-4">
      {listeningData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h2 className="text-2xl font-bold">{section.section_name}</h2>

          <audio controls className="w-full ml-0 m-4">
            <source src={section.metadata.audio_url} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>

          {section.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-4">
              <p className="font-medium">
                {questionIndex + 1}. {question.question}
              </p>

              {/* Multiple Choice Questions */}
              {question.options ? (
                Object.entries(question.options).map(([key, option]) => (
                  <label key={key} className="block">
                    <input
                      type="radio"
                      name={`question-${question.question_id}`}
                      value={key}
                      checked={answers[question.question] === key}
                      onChange={() => handleAnswerChange(question.question, key)}
                    />{" "}
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
      ))}
    </div>
  );
}
