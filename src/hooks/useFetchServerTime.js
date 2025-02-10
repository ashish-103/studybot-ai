import { useEffect, useRef, useState } from "react";
import { apiCall } from "../api/login";
import { useLocation } from "react-router-dom";

export function useFetchServerTime() {
  const location = useLocation();

  const { state } = location;

  const fetchCalled = useRef(false);
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await apiCall.get(`get_time?exam_id=${state?.exam_id}`);
        const data = response.data;
        const currentTime = new Date().getTime();
        const serverTime = new Date(data.current_time).getTime();

        const oneHour = 60 * 60 * 1000;
        const targetEndTime = currentTime + oneHour;
        setStartTime(currentTime);
        setEndTime(targetEndTime);
      } catch (error) {
        console.error("Error fetching server time:", error);
      }
    };
    if (!fetchCalled.current) {
      fetchServerTime();
      fetchCalled.current = true;
    }
  }, []);
  return { startTime, endTime }
}