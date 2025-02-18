import React from "react";
import counterImage from "../../images/counter.png";
import CountUp from "react-countup";
import tutorial from "../../assets/StudybotTutorial.mp4"

export default function Counter() {
  return (
    <section className="" >
      <img
        src={counterImage}
        alt="counterImage"
        className="hidden md:block w-full scale-y-[-1] translate-y-[1px]"
        
      />
      <div className="md:bg-primary-blue" >
        {/* <div className="bg-white container mx-auto md:bg-primary-blue md:p-[80px] p-web md:px-[120px] md:flex md:items-center md:justify-center"> */}
        <div className="w-full px-[100px] py-40" id="counter">
          <div className="bg-white md:rounded-3xl  w-[80%] h-[44rem] mx-auto py-0">
            <video
              className="rounded-lg shadow-lg h-full w-full object-cover"
              controls
            >
              <source src={tutorial} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* <p className="text-base">
                Studybot AI is an AI-powered subjective answer analysis tool
                that can help students to improve their subjective answers and
                prepare for competitive exams better.
              </p> */}
          </div>
        </div>
        {/* <div className="md:w-1/2 pt-20 md:pt-0 flex flex-col justify-center items-center rel ative">
          <div className="w-[220px] h-[220px] md:w-[300px] md:h-[300px] mx-auto bg-primary-orange rounded-full relative text-center">
            <div className="text-white flex items-center justify-center mx-auto w-1/2 h-full text-2xl md:text-3xl font-bold text-center">
              10000 + Happy Students
            </div>

            <div className="bg-white shadow-counter rounded-full p-5 h-[80px] w-[80px] md:h-[100px] md:w-[100px] absolute -top-10 left-1/2 flex flex-col items-center justify-center text-sm">
              <div className="font-bold text-xl text-primary-blue">
                <CountUp start={0} end={300} duration={3} />+
              </div>
              Partner Experts
            </div>
            <div className="bg-white shadow-counter rounded-full p-5 h-[90px] w-[90px] md:h-[110px] md:w-[110px] absolute bottom-10 -left-10 flex flex-col items-center justify-center text-sm">
              <div className="font-bold text-xl text-primary-blue">
                <CountUp start={0} end={98} duration={5} />%
              </div>
              Accuracy in AI-Analysis
            </div>
            <div className="bg-white shadow-counter rounded-full p-5 h-[100px] w-[100px] md:h-[130px] md:w-[130px] absolute top-2/3 right-0 flex flex-col items-center justify-center text-sm">
              <div className="font-bold text-xl text-primary-blue">
                <CountUp start={0} end={50000} duration={2} />+
              </div>
              Answers Reviewed
            </div>
            <div className="absolute bg-primary-blue h-[30px] w-[30px] rounded-full top-0 left-0" />
            <div className="absolute bg-primary-blue h-[30px] w-[30px] rounded-full -bottom-10 left-1/3" />
            <div className="absolute bg-primary-blue h-[30px] w-[30px] rounded-full top-1/2 -right-10" />
          </div>
        </div> */}
      </div>
      <img
        src={counterImage}
        alt="counterImage"
        className="w-full hidden md:block"
      />
    </section>
  );
}
