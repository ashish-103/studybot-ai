import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { apiCall } from '../../api/login';

const Timer = ({ exam_id, start_time, end_time, handleSubmit }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (!start_time || !end_time) return;

        const intervalId = setInterval(() => {
            const currentTime = new Date().getTime(); // Get client time
            const remainingTime = end_time - currentTime; // Calculate remaining time
            if (remainingTime <= 0) {
                clearInterval(intervalId); // Stop timer when time is up
                setIsFinished(true);
                handleSubmit(start_time, end_time);
            } else {
                setTimeLeft(remainingTime); // Update remaining time
            }
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [start_time, end_time]);

    // Format remaining time to display as minutes:seconds
    const formatTime = (time) => {
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='flex items-center justify-center'>
            {isFinished ? (
                <p>Time's up! Submitting your exam...</p>
            ) : (
                <span className='bg-[#0AA6D7] w-auto rounded-md py-2 px-4 text-white font-bold text-2xl'>
                    Time left: {timeLeft !== null ? formatTime(timeLeft) : 'Loading...'}
                </span>
            )}
        </div>
    );
};

export default Timer;