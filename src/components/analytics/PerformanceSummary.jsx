import React, { useContext, useEffect, useState } from 'react'
// import { PerformanceSummaryData } from '../../data/data'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AnalyticsContext } from '../../context/analyticsContext';

export default function PerformanceSummary() {
    const { analyticsData } = useContext(AnalyticsContext);
    // console.log("Analytics data: ", analyticsData)
    const [values, setValues] = useState({
        score: 0,
        questions: 0,
        all_questions: 0,
        accuracy: 0,
        band_score: 0,
    })
    function roundIeltsScore(score) {
        let decimal = score % 1; // Get the decimal part

        if (decimal < 0.25) {
            return Math.floor(score); // Round down to the nearest whole number
        } else if (decimal < 0.75) {
            return Math.floor(score) + 0.5; // Round to the nearest 0.5
        } else {
            return Math.ceil(score); // Round up to the next whole number
        }
    }
    const calculateValues = () => {
        let total_band_score = 0;
        let attempted_questions = 0;
        const total_questions = analyticsData.length;
        console.log("analyticsData", analyticsData[0]["gpt_evaluation"]["Average_Band_Score"]);
        for (let i = 0; i < total_questions; i++) {
            const band_score = analyticsData[i]["gpt_evaluation"]["Average_Band_Score"] === "N/A" ? 0 : analyticsData[i]["gpt_evaluation"]["Average_Band_Score"];
            // console.log("Band score: ", band_score);
            const isAttempted = analyticsData[i]["gpt_evaluation"]["Word_Count"];
            if (isAttempted > 0) {
                attempted_questions += 1;
            }
            console.log("band_score", band_score)
            console.log("typeof band_score", typeof band_score)
            total_band_score += band_score;
            // console.log("total_band_score", total_band_score)
        }

        console.log('total_band_score', total_band_score)
        total_band_score /= total_questions;
        console.log('total_questions', total_questions)
        console.log("total_band_score after dividing", total_band_score)
        total_band_score = roundIeltsScore(total_band_score);
        console.log("total_band_score after floor", total_band_score)
        setValues({
            all_questions: total_questions,
            questions: attempted_questions,
            band_score: total_band_score,
            score: total_band_score,
            accuracy: (total_band_score * (100 / 9)).toFixed(2)
        })
    }
    useEffect(() => {
        calculateValues();
    }, [])


    const performanceSummaryData = [
        {
            score: values.score * 10,
            value: values.score,
            title: "Score",
            desc: "Total score achieved",
        },
        {
            score: `${values.questions / values.all_questions * 100}`,
            // value: "100",
            value: `${values.questions && values.all_questions ? `${values.questions}` : "0"}/${values.all_questions}`,
            title: "Attempted Questions",
            desc: "Number of questions the student has attempted",
        },
        {
            score: `${values.accuracy}`,
            value: `${values.accuracy}%`,
            title: "Accuracy",
            desc: "Percentage of correct answers",
        },
        {
            score: values.band_score * 10,
            value: values.band_score,
            title: "Band Score",
            desc: "Average Band Score",
        },
    ];
    return (
        <section className='px-5 pb-10'>
            <div className="bg-white p-5 md:p-10 shadow-md rounded-md flex flex-col md:flex-row items-center justify-between"
            >
                <div className="md:w-[30%]">
                    <h2 className="text-[#2A4563] text-2xl font-bold pb-2">
                        Overall Performance Summary
                    </h2>
                    <p className="text-[#2A4563] text-sm py-1">Our IELTS-GPT system has been trained on millions of essays from 28 million students around the globe to ensure it can evaluate your IELTS writing with high accuracy as a professional IELTS examiner!</p>
                </div>
                <div className="hidden md:w-[70%] md:flex items-start justify-center">
                    {performanceSummaryData.map((item) => (
                        <div className={`flex flex-col items-center justify-between p-3 text-center gap-2 w-1/4`} key={`ps-1-${item.title}`}>
                            <CircularProgressbar value={item.score} text={item.value} className='h-24 w-auto' />
                            <div className='font-semibold text-sm'>{item.title}</div>
                            <p className='text-xs'>{item.desc}</p>
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-2 md:hidden'>
                    {performanceSummaryData.map((item) => (
                        <div className={`flex flex-col items-center justify-between p-3 text-center gap-2 md:w-1/4`} key={`$ps-2{item.title}`}>
                            <CircularProgressbar value={item.score} text={item.value} className='h-24 w-auto' />
                            <div className='font-semibold text-sm'>{item.title}</div>
                            <p className='text-xs'>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
