import React from "react";
import { writingSections } from "../../components/Guidelines/writingGuidelines";

const Guidelines = ({ setName }) => {
  console.log('setName', setName)
  let sections = [
    {
      title: "1. Overview of the IELTS Exam",
      content: (
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>Duration:</strong> Approximately 2 hours and 45 minutes.
          </li>
          <li>
            <strong>Sections:</strong> The exam is divided into four sections:
            <ol className="list-decimal ml-5">
              <li>Listening</li>
              <li>Reading</li>
              <li>Writing</li>
              <li>Speaking</li>
            </ol>
          </li>
          <li>
            <strong>Types of Questions:</strong> Includes multiple-choice,
            matching, map/diagram labeling, sentence completion, and
            short-answer questions, along with written tasks and oral
            responses.
          </li>
        </ul>
      ),
    },
    {
      title: "2. Section-Wise Breakdown",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">A. Listening Section</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Duration:</strong> 30 minutes (plus 10 minutes to
                transfer answers).
              </li>
              <li>
                <strong>Content:</strong>
                <ul className="list-disc ml-5">
                  <li>4 recordings (conversations and monologues).</li>
                  <li>
                    Questions based on the recordings include multiple-choice,
                    matching, form completion, and map labeling.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Total Questions:</strong> 40 questions.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">B. Reading Section</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Duration:</strong> 60 minutes.
              </li>
              <li>
                <strong>Content:</strong>
                <ul className="list-disc ml-5">
                  <li>
                    <strong>Academic Module:</strong> 3 long passages (from
                    books, journals, etc.).
                  </li>
                  <li>
                    <strong>General Training Module:</strong> Texts related to
                    everyday life, work, or general interest.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Total Questions:</strong> 40 questions (types include
                multiple-choice, sentence completion, matching headings, etc.).
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">C. Writing Section</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Duration:</strong> 60 minutes.
              </li>
              <li>
                <strong>Tasks:</strong>
                <ul className="list-disc ml-5">
                  <li>
                    <strong>Task 1:</strong> Describe visual information
                    (Academic) or write a letter (General Training).
                  </li>
                  <li>
                    <strong>Task 2:</strong> Write an essay responding to a
                    problem, argument, or viewpoint.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Word Count:</strong>
                <ul className="list-disc ml-5">
                  <li>Task 1: At least 150 words.</li>
                  <li>Task 2: At least 250 words.</li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">D. Speaking Section</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Duration:</strong> 11–14 minutes.
              </li>
              <li>
                <strong>Format:</strong>
                <ul className="list-disc ml-5">
                  <li>
                    <strong>Part 1 (Introduction):</strong> General questions
                    about yourself (4–5 minutes).
                  </li>
                  <li>
                    <strong>Part 2 (Long Turn):</strong> Talk about a given
                    topic (1 minute to prepare, 2 minutes to speak).
                  </li>
                  <li>
                    <strong>Part 3 (Discussion):</strong> In-depth questions on
                    the topic (4–5 minutes).
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "3. Additional Tips",
      content: (
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>Total Time Management:</strong>
            <ul className="list-disc ml-5">
              <li>
                Be aware that Listening, Reading, and Writing sections are
                completed in one sitting without breaks.
              </li>
              <li>
                The Speaking section is scheduled separately, typically on the
                same day or within a week before/after the written tests.
              </li>
            </ul>
          </li>
          <li>
            <strong>Preparation:</strong> Practice each section with sample
            tests to familiarize yourself with the question types and timing.
          </li>
        </ul>
      ),
    },
  ];
  if (setName?.includes('Writing')) {
    sections = writingSections;
  }
  return (
    <div className=" mx-auto md:p-6 space-y-8 overflow-y-auto">
      {sections.map((section, index) => (
        <div key={index} className="border-b pb-4">
          <h2 className="text-xl font-bold mb-4">{section.title}</h2>
          <div>{section.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Guidelines;
