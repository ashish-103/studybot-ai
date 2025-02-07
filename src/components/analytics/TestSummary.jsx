import React, { useContext, useEffect, useState } from "react";
import Rating from "react-rating";
import yellowStar from "../../assets/images/starYellow.png";
import grayStar from "../../assets/images/starGray.png";
import { AnalyticsContext } from "../../context/analyticsContext";
import { apiCall } from "../../api/login";
import { useLocation } from "react-router-dom";

export default function TestSummary({ ratings }) {
  const location = useLocation();
  const { miscData } = useContext(AnalyticsContext);
  const [rating, setRating] = useState(0);
  const [setName, setSetName] = useState(null);
  const [evaluationId, setEvaluationId] = useState(null);
  const user_id = localStorage.getItem("user");
  const userID = JSON.parse(user_id);
  const getData = async () => {
    try {
      const response = await apiCall.get(
        `get_exam_sets?user_id=${userID.userid}`
      );

      // console.log("reponse questions: ", response)
      const dummyArr = Array.from(response);
      const newdummysetname = dummyArr.find(
        (item) => item.exam_id === miscData.exam_id
      );
      // console.log(newdummysetname);
      setSetName(newdummysetname.set_name);
      //   console.log(dummyArr,"dummyArrdummyArr")

      // console.log("reponse: ", response);
    } catch (error) {
      console.log("error fetching question: ", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleRating = async (rate) => {
    // console.log(rate, "rate");
    const ratingStr = String(rate); // Convert rating to string
    // Set the rating state
    setRating(rate);

    // Prepare the data for the API request
    const data = {
      //   evaluation_id: "671b43f9a81bec18446c1ab9",
      evaluation_id: evaluationId,
      rating: ratingStr,
    };

    try {
      const response = await apiCall.post("rate_answer", JSON.stringify(data));
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      // console.log("Success:", result); // Handle success response
    } catch (error) {
      console.error("Error:", error); // Handle error
    }
  };

  const fetchExistingRating = async (evalId) => {
    try {
      const response = await apiCall.get(`get_rating/${evalId}`); // Adjust the endpoint as needed
      const existingRating = response.data.rating; // Adjust according to your response structure
      setRating(existingRating);
    } catch (error) {
      console.error("Error fetching rating: ", error);
    }
  };

  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    // const evaluationId = queryParams.get("evaluationid");
    const evalId = queryParams.get("evaluationid"); // Changed variable name to avoid shadowing
    // console.log(evalId, "evaluationId");
    setEvaluationId(evalId);

    if (evalId) {
      fetchExistingRating(evalId); // Fetch rating when evaluationId is available
    }
  }, [location]);

  return (
    <section className="px-5 pb-10">
      <div className="bg-white p-5 md:p-10 shadow-md rounded-md flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-2/5">
          <h2 className="text-[#2A4563] text-2xl font-bold pb-2"> {setName}</h2>
          <p className="text-[#2A4563] text-sm py-1">
            Our IELTS-GPT system has been trained on millions of essays from 28
            million students around the globe to ensure it can evaluate your
            IELTS writing with high accuracy as a professional IELTS examiner!
          </p>
        </div>
        <div className="md:w-2/5 my-4 flex flex-col items-center justify-center">
          <h2 className="text-[#2A4563]  text-xl font-bold pb-2 text-center">
            Rate This Test{" "}
          </h2>
          <Rating
            initialRating={ratings ? ratings : rating}
            readonly={ratings || rating}
            emptySymbol={
              <img
                src={grayStar}
                alt="grayStar"
                className="h-7 w-auto mx-0.5"
              />
            }
            fullSymbol={
              <img
                src={yellowStar}
                alt="yellowStar"
                className="h-7 w-auto mx-0.5"
              />
            }
            onChange={handleRating} // Use handleRating here
          />
        </div>
      </div>
    </section>
  );
}
