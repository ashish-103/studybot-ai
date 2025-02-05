/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { EvalutionData } from "../../data/data";
import { AnalyticsContext } from '../../context/analyticsContext';

export default function DetailedAnalysis() {
    const { analyticsData } = useContext(AnalyticsContext);
    // console.log("analytics data: ", analyticsData);
    const sections = [];
    for (let i = 0; i < analyticsData.length; i++) {
        sections.push(`Question ${i + 1}`);
    }
    const [evaluationData, setEvaluationData] = useState([])
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        const data = [
            {
                title: "Task Acheivement",
                bandScore: analyticsData[currentSection]["gpt_evaluation"]["error"] ? "0.0" : analyticsData[currentSection]["gpt_evaluation"]["Task_Response_Band"][0],
                description: analyticsData[currentSection]["gpt_evaluation"]["error"] ? "0" : analyticsData[currentSection]["gpt_evaluation"]["Task_Response_Band"][1],
            },
            {
                title: "Coherence and Cohesion",
                bandScore: analyticsData[currentSection]["gpt_evaluation"]["error"] ? "0.0" : analyticsData[currentSection]["gpt_evaluation"]["Coherence_and_Cohesion_Band"][0],
                description: analyticsData[currentSection]["gpt_evaluation"]["error"] ? "0" : analyticsData[currentSection]["gpt_evaluation"]["Coherence_and_Cohesion_Band"][1],
            },
            {
                title: "Lexical Resource",
                bandScore: analyticsData[currentSection]["gpt_evaluation"]["error"] ? "0.0" : analyticsData[currentSection]["gpt_evaluation"]["Lexical_Resource_Band"][0],
                description: analyticsData[currentSection]["gpt_evaluation"]["error"] ? "0" : analyticsData[currentSection]["gpt_evaluation"]["Lexical_Resource_Band"][1],
            },
            {
                title: "Grammatical Range and Accuracy",
                bandScore: analyticsData[currentSection]["gpt_evaluation"]["error"] ? "0.0" : analyticsData[currentSection]["gpt_evaluation"]["Grammatical_Range_and_Accuracy_Band"][0],
                description: analyticsData[currentSection]["gpt_evaluation"]["error"] ? "0" : analyticsData[currentSection]["gpt_evaluation"]["Grammatical_Range_and_Accuracy_Band"][1],
            },
        ]
        setEvaluationData(data);
    }, [analyticsData, currentSection])

    return (
        <section className='px-5 pb-10'>
            <div className='bg-white p-5 md:p-10 shadow-md rounded-md '>
                <h2 className="text-[#2A4563] text-2xl font-bold pb-2">
                    Detailed Analysis
                </h2>
                <p className="text-[#2A4563] text-sm py-1">Our IELTS-GPT system has been trained on millions of essays from 28 million students around the globe to ensure it can evaluate your IELTS writing with high accuracy as a professional IELTS examiner!</p>
                <div className='pt-5 flex flex-col md:flex-row justify-center items-start gap-5'>
                    <div className='md:w-[15%] flex flex-col gap-2'>
                        {sections.map((item, index) => (
                            <div key={`detailedanalysis-${item}`} onClick={() => setCurrentSection(index)} className={`p-2 border rounded-md bg-white cursor-pointer ${currentSection === index && "border-gray-500"}`}>{item}</div>
                        ))}
                    </div>
                    <div className="md:w-[85%] grid md:grid-cols-2 gap-5">
                        {evaluationData.map((item) => (
                            <div className=" bg-[#F6F6F6] rounded-md p-4 relative " key={item.title}>
                                <p className="w-[50%] md:w-full mb-3 text-[#2A4563] text-base font-semibold">
                                    {item.title}
                                </p>
                                <div className="bg-white relative rounded-md p-3">
                                    <div
                                        className={`bg-primary-blue text-white absolute -top-10 z-10 right-1 rounded-t-[10px] p-2`}
                                    >
                                        {item.bandScore}
                                    </div>
                                    <p
                                        id="style-2"
                                        className="overflow-y-scroll h-32 text-[#2A4563] text-justify text-sm pr-3 "
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
