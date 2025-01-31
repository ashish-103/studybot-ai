import React, { useState, useEffect } from "react";

export default function WritingQuestions({ writingData, onAnswerChange, answers }) {

  if (!writingData || !writingData.data) {
    return <p className="text-red-500">Loading writing data...</p>;
  }

  const { task1 = [], task2 = [] } = writingData.data; // Ensure both task1 & task2 exist

  const handleAnswerChange = (question, value, attachments) => {
    onAnswerChange({ ...answers, [question]: { "answer": value, "image_url": attachments } });
  };

  return (
    <div className="p-4 my-4">
      <h2 className="text-2xl font-bold mb-4">Writing Tasks</h2>

      {[...task1, ...task2].map((task, index) => (
        <div key={index} className="mb-8">
          <p className="font-medium">
            <span className="font-bold">{index + 1}. </span> {task.question}
          </p>
          {task.attachments && (
            <img src={task.attachments[0]} alt="Writing Task" className="w-full mb-4 border" />
          )}
          <textarea
            className="border border-gray-300 rounded px-2 py-1 w-full h-40 mt-2"
            placeholder="Write your response here..."
            value={answers[task.question]?.answer || ""}
            onChange={(e) => handleAnswerChange(task.question, e.target.value, task.attachments)}
          />
        </div>
      ))}
    </div>
  );
}
