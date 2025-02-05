import React, { useContext, useEffect, useState } from "react";

// import { AreasToImproveData } from '../../data/data'
import { AnalyticsContext } from "../../context/analyticsContext";

export default function AreasToImprove() {
  const { analyticsData } = useContext(AnalyticsContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [areas, setAreas] = useState([]);
  // console.log("data: ", analyticsData[currentQuestion]["gpt_evaluation"])
  // console.log("current slide: ", currentSlide)
  useEffect(() => {
    const sectionData = [
      {
        heading: "Ask AI for suggestions",
        description: analyticsData[currentQuestion]["gpt_evaluation"]["error"]
          ? "No data"
          : analyticsData[currentQuestion]["gpt_evaluation"]["AI_Suggestions"],
      },
      {
        heading: "Improvements in Solutions",
        description: analyticsData[currentQuestion]["gpt_evaluation"]["error"]
          ? "No data"
          : analyticsData[currentQuestion]["gpt_evaluation"][
          "Improved_Solution"
          ],
      },
      {
        heading: "AI - sample answer",
        description: analyticsData[currentQuestion]["gpt_evaluation"]["error"]
          ? "No data"
          : analyticsData[currentQuestion]["gpt_evaluation"]["9_Band_Answer"],
      },
    ];
    setAreas(sectionData);
    console.log("sectionData: ", sectionData);
  }, [currentQuestion, analyticsData]);

  function addRedBackgroundToBraces(text) {
    return text[0].replace(
      /(\b\w+)\s*\{(.*?)\}/g,
      (match, beforeWord, insideBraces) => {
        return `<span style="background-color: #FFCCCB; color: #000;text-transform: lowercase;">${beforeWord}</span>
         <span style="background-color: #90EE90; color: #000;">${insideBraces}</span>`;
      }
    );
  }

  return (
    <section className="px-5 pb-10">
      <div className="bg-white p-5 md:p-10 shadow-md rounded-md">
        <div className="flex justify-start w-full pb-5 gap-5">
          <h2 className="text-[#2A4563] text-2xl font-bold">
            Areas to Improve
          </h2>
          <select
            className="shadow-md rounded-md p-2 cursor-pointer"
            onChange={(e) => setCurrentQuestion(e.target.value)}
          >
            {analyticsData.map((item, index) => (
              <option key={`${index}strength&weakness`} value={index}>
                Question {index + 1}
              </option>
            ))}
          </select>
        </div>
        {areas && (
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-[25%] flex flex-col gap-2 justify-start">
              {areas.map((item, index) => (
                <div
                  key={`areatoimprove${index}`}
                  className={`${index === currentSlide
                    ? "bg-primary-blue text-white"
                    : "text-primary-blue"
                    } p-2 border rounded-md cursor-pointer`}
                  onClick={() => setCurrentSlide(index)}
                >
                  {item.heading}
                </div>
              ))}
            </div>
            {areas[currentSlide] && (
              <div className="md:w-[73%] pt-7 md:p-7 md:shadow-md rounded-md">
                <div className="font-semibold text-2xl pb-3 text-primary-blue">
                  {areas[currentSlide].heading}
                </div>
                <p> {areas[currentSlide]?.description}</p>
                {/* {
                  areas[currentSlide].heading === "AI - sample answer" ? (<p> {areas[currentSlide]?.description}</p>) : (<p
                    dangerouslySetInnerHTML={{
                      __html: addRedBackgroundToBraces(
                        areas[currentSlide]?.description
                      ),
                    }}
                  ></p>)
                } */}


              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
