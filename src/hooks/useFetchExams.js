import { useEffect, useState } from "react";
import { apiCall } from "../api/login";
import course from "./../assets/images/ielts.jpg";

export function useFetchExams() {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [difficulty, setDifficulty] = useState("All");

  const user_id = localStorage.getItem("user");
  const userID = JSON.parse(user_id);

  const itemsPerPage = 8;

  useEffect(() => {
    const getData = async () => {
      // if (!userID.userid) return;
      // console.log("get data called")
      try {
        const response = (
          await apiCall.get(`get_exam_sets11?user_id=${userID.userid}`)
        ).data;
        const users = Array.from({ length: response.length }, (_, index) => ({
          name: `Exam ${index + 1}`,
          image:
            index % 2 === 0
              ? `https://randomuser.me/api/portraits/women/${index + 1}.jpg`
              : `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
        }));
        const dummyArr = response.map((item, index) => ({
          courseImage: { course },
          authorImage: users[index % users.length].image,
          authorName: users[index % users.length].name,
          authorRole: "Teacher",
          courseDescription: item.set_name,
          rating: item.rating,
          timing: item.time,
          set_name: item.set_name,
          task_type: item.task_type,
          exam_id: item.exam_id,
          status: item.status,
        }));
        setData(dummyArr);
        setDisplayData(dummyArr);
        const firstPage = dummyArr.filter((_i, index) => index < 8);
        setCurrentData(firstPage);
        const _totalpages = Math.ceil(dummyArr.length / itemsPerPage);
        setTotalPages(_totalpages);
      } catch (error) {
        // console.log("error fetching question: ", error);
      }
    };
    getData();
  }, [userID.userid]);

  useEffect(() => {
    // console.log('set total page called')
    const _totalpages = Math.ceil(displayData.length / itemsPerPage);
    setTotalPages(_totalpages);
  }, [displayData]);
  useEffect(() => {
    // console.log('set currentData called')
    const currentItems = displayData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setCurrentData(currentItems);
  }, [currentPage, data, displayData]);


  useEffect(() => {
    // console.log('set displayData called')
    if (difficulty !== "All") {
      const newData = data.filter((item) => item.set_name.includes(difficulty));
      setDisplayData(newData);
    } else {
      setDisplayData(data);
    }
  }, [data, difficulty]);


  return {
    data,
    displayData,
    currentData,
    totalPages,
    itemsPerPage,
    setDisplayData,
    setCurrentData,
    setTotalPages,
    setCurrentPage,
    setDifficulty
  };
};
