import React from "react";
import demo from "../../images/demo.png";
import Button from "../ui/Button";

export default function Demo() {
  return (
    <section className="">
      <div className="bg-white py-0 md:py-[40px] flex items-center justify-center container mx-auto">
        <div className="bg-white rounded-3xl py-web flex flex-col md:flex-row items-center justify-start  md:justify-center  gap-5">
          <div className="md:w-1/2 p-web pt-0 md:pt-web md:pl-[80px] md:pr-0 flex flex-col justify-center items-start">
            <div className="text-5xl md:text-6xl font-semibold pb-5">
              TAKE A DEMO TEST
            </div>
            <p className="text-base pb-5">
              Studybot AI is an AI-powered subjective answer analysis tool that
              can help students to improve their subjective answers and prepare
              for competitive exams better. Studybot AI provides students with
              feedback on their factual accuracy, language consistency, and
              other important parameters. It also identifies areas for
              improvement and provides personalized recommendations.
            </p>
            <Button variant="blueOutline" text={"Get a sample"} />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center items-center rel ative">
            <img src={demo} alt="demo" className="pl-web md:pl-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
