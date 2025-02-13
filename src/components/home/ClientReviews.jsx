import React from "react";
import TestimonialCard from "../ui/TestimonialCard";
import test1 from "../../assets/images/Alex_R.webp";
import test2 from "../../assets/images/Carlos_D.webp";
import test3 from "../../assets/images/Gab.webp";
import test4 from "../../assets/images/Rohit.webp";
import test5 from "../../assets/images/Jess_G.webp";
import test6 from "../../assets/images/Maria_G.webp";
import test7 from "../../assets/images/Jordan_M.webp";
import test8 from "../../assets/images/Liam_S.webp";
import test9 from "../../assets/images/Roman.webp";
import test10 from "../../assets/images/Janee.webp";
import test11 from "../../assets/images/Poppy_B.webp";
import test12 from "../../assets/images/Nivi.webp";
import test13 from "../../assets/images/Mia_P.webp";
import test14 from "../../assets/images/Sally.webp";
import test15 from "../../assets/images/Liam_T.webp";
import test16 from "../../assets/images/Riz_Ahmed.webp";
import test17 from "../../assets/images/Tim_Klay.webp";
import test18 from "../../assets/images/Salman.webp";
import test19 from "../../assets/images/Sandra_Q.webp";
import test20 from "../../assets/images/Tim_Kägy.webp";

import "./testimonials.css";
import "../../styles/clientreview.css";
import { Element } from "react-scroll";

export default function Testimonials() {
  const arr = [
    {
      clientImage: test1,
      clientName: "Alex R",
      clientRole: "Recent College Graduate",
      rating: 5,
      date: "Jan 4, 2025",
      content:
        "Studybot AI was a lifesaver for my IELTS prep! The feedback I received on my essays helped me improve my writing score from a 6.5 to a 7.5 in just a few days!",
    },
    {
      clientImage: test2,
      clientName: "Carlos D",
      clientRole: "Mid-Career Professional",
      rating: 5,
      date: "Jan 4, 2025",
      content:
        "The detailed feedback on my IELTS writing tasks was amazing! Studybot AI highlighted my mistakes and gave me tips to fix them. I felt so much more confident on exam day.",
    },
    {
      clientImage: test4,
      clientName: "Rohit",
      clientRole: "",
      rating: 5,
      date: "Nov 23, 2024",
      content:
        "Finally improving my writing score! Studybot  pointed out my grammar errors and gave me advice on structuring my essays. Scored a Band 8 thanks to this tool!",
    },
    {
      clientImage: test19,
      clientName: "Sandra Q",
      clientRole: "",
      rating: 5,
      date: "Jan 4, 2025",
      content:
        "Goodbye generic essay advice! Studybot AI gave me personalized feedback on my IELTS writing tasks. It was exactly what I needed to boost my score.",
    },

    {
      clientImage: test5,
      clientName: "Jess G",
      clientRole: "",
      rating: 5,
      date: "Jan 6, 2025",
      content:
        "SO GLAD I SUBSCRIBED! Studybot AI’s suggestions on my Task 1 and Task 2 answers helped me score a Band 8. It’s a must-have for IELTS prep!",
    },
    {
      clientImage: test6,
      clientName: "Maria G",
      clientRole: "Career Changer",
      rating: 5,
      date: "Jan 7, 2025",
      content:
        "Writing was always my weakest area, but Studybot AI’s feedback helped me understand where I was losing points. I finally hit the score I needed for immigration!",
    },
    {
      clientImage: test7,
      clientName: "Jordan M",
      clientRole: "",
      rating: 5,
      date: "Dec 29, 2024",
      content:
        "Studybot AI’s feedback on my writing tasks helped me fix awkward phrases and improve my coherence. My IELTS writing band went up by 1 point!",
    },
    {
      clientImage: test8,
      clientName: "Liam S",
      clientRole: "",
      rating: 5,
      date: "Dec 27, 2024",
      content:
        "I used Studybot AI for a month before my IELTS exam, and it pinpointed exactly where I needed improvement. I couldn’t believe how accurate and helpful the feedback was!",
    },
    {
      clientImage: test9,
      clientName: "Roman",
      clientRole: "",
      rating: 5,
      date: "Jan 1, 2025",
      content:
        "I’m so impressed by Studybot AI. It gave me specific feedback on grammar, vocabulary, and structure, which helped me jump to a Band 8 in writing!",
    },
    {
      clientImage: test10,
      clientName: "Janee",
      clientRole: "",
      rating: 5,
      date: "Nov 23, 2024",
      content:
        "I felt lost preparing for my IELTS writing exam, but Studybot AI’s feedback on my essays helped me fix my mistakes and gain confidence. Highly recommend it!",
    },
    {
      clientImage: test11,
      clientName: "Poppy B",
      clientRole: "",
      rating: 5,
      date: "Dec 24, 2024",
      content:
        "The writing feedback from Studybot AI is like magic! It gave me actionable tips and helped me achieve the score I needed for my university application.",
    },
    {
      clientImage: test12,
      clientName: "Nivi",
      clientRole: "",
      rating: 5,
      date: "Nov 19, 2024",
      content:
        "Never thought I’d enjoy IELTS writing practice, but Studybot AI made it fun and rewarding. Its feedback really improved my essays!",
    },
    {
      clientImage: test3,
      clientName: "Gab",
      clientRole: "",
      rating: 5,
      date: "Dec 5, 2024",
      content:
        "OMG, Studybot AI is a game-changer for IELTS prep. Its feedback on my Task 2 answers helped me structure my essays better and score higher!",
    },
    {
      clientImage: test17,
      clientName: "Tim Klay",
      clientRole: "",
      rating: 5,
      date: "Dec 19, 2024",
      content:
        "I used to dread writing essays, but Studybot AI’s feedback made it so much easier. It’s like having a personal tutor for IELTS writing!",
    },
    {
      clientImage: test14,
      clientName: "Sally",
      clientRole: "",
      rating: 5,
      date: "Dec 29 , 2024",
      content:
        "Studybot AI’s personalized writing feedback is a lifesaver! It helped me understand where I was losing marks and how to improve quickly.",
    },
    {
      clientImage: test13,
      clientName: "Mia P",
      clientRole: "",
      rating: 5,
      date: "Jan 7, 2025",
      content:
        "Studybot AI helped me get the Band 7.5 I needed by giving detailed feedback on my essays. Its suggestions were spot on!",
    },
    {
      clientImage: test15,
      clientName: "Liam T",
      clientRole: "",
      rating: 5,
      date: "Jan 7, 2025",
      content:
        "Studybot AI transformed the way I prepared for IELTS writing. The detailed corrections and advice boosted my score in no time!",
    },
    {
      clientImage: test16,
      clientName: "Riz Ahmed",
      clientRole: "",
      rating: 5,
      date: "Jan 9, 2025",
      content:
        "I went from Band 6 to Band 7.5 in writing after using Studybot AI’s feedback. This tool is seriously a must-have for IELTS prep!",
    },
    {
      clientImage: test18,
      clientName: "Salman",
      clientRole: "",
      rating: 5,
      date: "Dec 25, 2024",
      content:
        "Studybot AI gave me specific feedback on my essays and helped me fix recurring mistakes. I reached my target IELTS score with ease!",
    },
    {
      clientImage: test20,
      clientName: "Tim Kägy",
      clientRole: "",
      rating: 5,
      date: "May 24, 2023",
      content:
        "I used to dread writing cover letters, but this AI tool has made it a breeze. It's like it reads my mind and knows exactly what to say. Highly recommend!",
    },
  ];
  const arr1 = [];
  const arr2 = [];
  const arr3 = [];
  const arr4 = [];
  const totalReviews = arr.length;
  for (let i = 0; i < totalReviews; i++) {
    if (i < Math.ceil(totalReviews / 4)) {
      arr1.push(arr[i]);
    } else if (i < 2 * Math.ceil(totalReviews / 4)) {
      arr2.push(arr[i]);
    } else if (i < 3 * Math.ceil(totalReviews / 4)) {
      arr3.push(arr[i]);
    } else {
      arr4.push(arr[i]);
    }
  }
  // return (
  //   <Element name="section4">
  //     <section className="container mx-auto">
  //       <div className="bg-white py-[40px] p-web relative overflow-hidden">
  //         <div className="bg-white rounded-3xl lg:py-web">
  //           <div className="flex flex-col justify-center items-center pb-10 lg:w-[75%] mx-auto">
  //             <div className="text-5xl md:text-6xl font-semibold pb-5 mb-5 border-b-[10px] border-primary-orange">
  //               WHAT PEOPLE SAY ABOUT US
  //             </div>
  //             {/* <p className="">
  //               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //               eiusmod tempor incididunt ut labore et dolore magna aliqua.sed
  //               do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  //             </p> */}
  //           </div>
  //           <div className="w-full gap-4 mx-auto hidden md:flex">
  //             <div className="w-1/4 h-full flex flex-col gap-4">
  //               {arr1.map((item) => (
  //                 <div className="">
  //                   <TestimonialCard
  //                     key={`${item}testimonial1`}
  //                     clientImage={item.clientImage}
  //                     clientName={item.clientName}
  //                     clientRole={item.clientRole}
  //                     rating={item.rating}
  //                     content={item.content}
  //                     date={item.date}
  //                   />
  //                 </div>
  //               ))}
  //             </div>
  //             <div className="w-1/4 h-full flex flex-col gap-4">
  //               {arr2.map((item) => (
  //                 <div className="">
  //                   <TestimonialCard
  //                     key={`${item}testimonial1`}
  //                     clientImage={item.clientImage}
  //                     clientName={item.clientName}
  //                     clientRole={item.clientRole}
  //                     rating={item.rating}
  //                     content={item.content}
  //                     date={item.date}
  //                   />
  //                 </div>
  //               ))}
  //             </div>
  //             <div className="w-1/4 h-full flex flex-col gap-4">
  //               {arr3.map((item) => (
  //                 <div className="">
  //                   <TestimonialCard
  //                     key={`${item}testimonial1`}
  //                     clientImage={item.clientImage}
  //                     clientName={item.clientName}
  //                     clientRole={item.clientRole}
  //                     rating={item.rating}
  //                     content={item.content}
  //                     date={item.date}
  //                   />
  //                 </div>
  //               ))}
  //             </div>
  //             <div className="w-1/4 h-full flex flex-col gap-4">
  //               {arr4.map((item) => (
  //                 <div className="">
  //                   <TestimonialCard
  //                     key={`${item}testimonial1`}
  //                     clientImage={item.clientImage}
  //                     clientName={item.clientName}
  //                     clientRole={item.clientRole}
  //                     rating={item.rating}
  //                     content={item.content}
  //                     date={item.date}
  //                   />
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //           <div className="md:hidden h-full flex flex-col gap-4">
  //             {arr1.map((item) => (
  //               <div className="">
  //                 <TestimonialCard
  //                   key={`${item}testimonial1`}
  //                   clientImage={item.clientImage}
  //                   clientName={item.clientName}
  //                   clientRole={item.clientRole}
  //                   rating={item.rating}
  //                   content={item.content}
  //                   date={item.date}
  //                 />
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </Element>
  // );
  return (
    <Element name="section4">
      <section className="container mx-auto">
        <div className="bg-white py-[40px] p-web relative overflow-hidden">
          <div className="bg-white rounded-3xl lg:py-web flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center pb-10 lg:w-[75%] mx-auto">
              <div className="text-5xl md:text-6xl font-semibold pb-5 mb-5 border-b-[10px] border-primary-orange">
                WHAT PEOPLE SAY ABOUT US
              </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative w-full overflow-hidden rounded-xl shadow-xl p-8 flex flex-col gap-6">
              {/* Row 1 - Left to Right */}
              <div className="w-full overflow-hidden">
                <div className="flex w-max animate-scroll-right gap-4">
                  {[...arr1, ...arr1].map((item, index) => (
                    <div key={index} className="w-[300px] flex gap-4">
                      <TestimonialCard {...item} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 - Right to Left */}
              <div className="w-full overflow-hidden">
                <div className="flex w-max animate-scroll-left gap-4">
                  {[...arr2, ...arr2].map((item, index) => (
                    <div key={index} className="w-[300px] flex gap-4">
                      <TestimonialCard {...item} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3 - Left to Right */}
              <div className="w-full overflow-hidden">
                <div className="flex w-max animate-scroll-right gap-4">
                  {[...arr3, ...arr3].map((item, index) => (
                    <div key={index} className="w-[300px] flex gap-4">
                      <TestimonialCard {...item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>




          </div>
        </div>
      </section>
    </Element>

  )
}
