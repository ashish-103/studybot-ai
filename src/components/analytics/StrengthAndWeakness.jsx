import React, { useContext, useEffect, useState } from 'react'
import { AnalyticsContext } from '../../context/analyticsContext';

export default function StrengthAndWeakness() {
    const { analyticsData } = useContext(AnalyticsContext);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [strength, setStrength] = useState(0);
    const [weakness, setWeakness] = useState(0);

    useEffect(() => {
        if (analyticsData[currentQuestion]["gpt_evaluation"]["error"]) {
            setStrength("Not attempted");
            setWeakness("Not attempted");
        } else {
            setStrength(analyticsData[currentQuestion]["gpt_evaluation"]["Strengths"]);
            setWeakness(analyticsData[currentQuestion]["gpt_evaluation"]["Weaknesses"]);
        }
    }, [currentQuestion, analyticsData])
    // console.log("analyticsData from strength and weakness: ", analyticsData)
    return (
        <section className='px-5 pb-10'>
            <div className='flex justify-start w-full p-5 md:px-10 gap-5'>
                <h2 className="text-[#2A4563] text-2xl font-bold ">
                    Strengths and weaknesses
                </h2>
                <select className='shadow-md rounded-md p-2 cursor-pointer' onChange={(e) => setCurrentQuestion(e.target.value)}>
                    {analyticsData.map((item, index) =>
                        <option key={`${index}strength&weakness`} value={index}>Question {index + 1}</option>
                    )}
                </select>
            </div>
            <div className='flex flex-col md:flex-row justify-between'>
                <div className='md:w-[47%] p-10 mb-5 md:mb-0 bg-white rounded-lg shadow-md'>
                    <div className='font-medium text-xl text-center pb-3'>Strengths</div>
                    <p>{strength}</p>
                </div>
                <div className='md:w-[47%] p-10 bg-white rounded-lg shadow-md'>
                    <div className='font-medium text-xl text-center pb-3'>Weaknesses</div>
                    <p>{weakness}</p>
                </div>
            </div>
        </section>
    )
}
