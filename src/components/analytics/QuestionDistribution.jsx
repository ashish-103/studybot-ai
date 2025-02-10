import React, { useContext } from "react";
import SummaryBarChart from "../SummaryBarChart";
import { AnalyticsContext } from "../../context/analyticsContext";

export default function QuestionDistribution() {
  // const { summaryData } = useContext(AnalyticsContext);
  const { miscData, summaryData } = useContext(AnalyticsContext);

  return (
    <section className="px-5 pb-10">
      <div className="bg-white p-5 md:p-10 shadow-md rounded-md">
        <h2 className="text-[#2A4563] text-2xl font-bold pb-2">
          Question Distribution
        </h2>
        <p className="text-[#2A4563] text-sm py-1 pb-3">
          Our IELTS-GPT system has been trained on millions of essays from 28
          million students around the globe to ensure it can evaluate your IELTS
          writing with high accuracy as a professional IELTS examiner!
        </p>
        {/* <SummaryBarChart /> */}
        <SummaryBarChart data={miscData} />
      </div>
    </section>
  );
}
