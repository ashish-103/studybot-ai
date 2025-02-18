import { useContext, useEffect, useState } from "react";
import starIcon from "../../assets/images/starticon.svg";
import { Element } from "react-scroll";
import { UserContext } from "../../context/userContext";
import { useModal } from "../../context/ModalProvider";
import Plans from "../../data/plansData";
import { useNavigate } from "react-router-dom";
import basic from "../../assets/Studybot-AI-Basic.png"
import pro from "../../assets/Studybot-AI-Pro.png"
import elite from "../../assets/Studybot-AI-ELite.png"
import Button from "../ui/Button";

export const SubscriptionPlans = () => {
  const { openModal } = useModal();
  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(Plans);
  }, []);

  return (
    <Element name="section3">
      <section className="container mx-auto p-web ">
        <div className="max-w-[90rem] h-full  mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="text-5xl md:text-6xl font-semibold pb-5 text-center mb-10">
            Pricing Plan
          </div> */}
          <div className="flex flex-col justify-center items-center pb-10 lg:w-[75%] mx-auto">
            <div className="text-5xl md:text-6xl font-semibold pb-5 mb-5 border-b-[10px] border-primary-orange">AFFORDABLE PLANS FOR EVERYONE</div>
            <p className="text-lg font-semibold">Start free and scale up with plans designed to fit your needs.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 rounded-sm ">
            {data.map((plan, index) => {
              return (
                <div
                  key={`subscriptionid-${index}`}
                  onClick={() => {

                    openModal('signup');
                    // if (user === null) {
                    //   openModal('signup');
                    // } else {
                    //   navigate('/dashboard/subscription')
                    // }
                  }}
                  className={`${plan?.plan_name === user?.plan_name ? "" : "bg-white"}  h-full shadow-xl rounded-lg overflow-hidden transform  hover:scale-105 transition duration-300 border border-gray-150 flex flex-col gap-0
                  }`}
                // hover:border-[#001921]
                // className={`h-[350px] bg-white shadow-2xl rounded-lg p-6 transform hover:border-primary-orange hover:scale-105 transition duration-300  border-gray-150 border-[2px]  border-primary-orange`} [#de922c]
                >
                  {plan.current && (
                    <p className="flex items-center gap-2 absolute right-2 py-1.5 px-2 bg-primary-orange text-white rounded-lg text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2
                    ">
                      <span>
                        <img
                          src={starIcon}
                          alt="current"
                          className="text-white"
                        />
                      </span>
                      Current
                    </p>
                  )}

                  <div className={`${plan?.plan_name === user?.plan_name ? 'bg-primary-orange' : 'bg-primary-blue'}  bg-primary-blue text-white  w-full h-16 p-0  flex  flex-col justify-center items-center`} >
                    <h3 className="text-3xl font-semibold  ">
                      {plan.plan_name}
                    </h3>
                    {/* <p className="">{plan.description}</p> */}
                  </div>
                  <div className="flex flex-col h-full">
                    <div className="mb-8 text-center p-10 bg-gray-100 flex flex-col justify-center items-center">
                      {plan.plan_name === "Basic"
                        ? <img className="w-[20rem] h-[15rem]" src={basic} alt="" />
                        : plan.plan_name === "Standard"
                          ? <img className="w-[20rem] h-[15rem]" src={pro} alt="" />
                          : <img className="w-[20rem] h-[15rem]" src={elite} alt="" />
                      }
                      {plan.price !== "Free" ? (
                        <p className="text-5xl font-semibold align-middle ">
                          {`₹ ${plan.price.replace("INR", "").trim()}`}
                          {/* <span className="text-lg pt-2 px-2 text-gray-600"> per Year</span> */}
                        </p>
                      ) : (<p className="text-5xl font-semibold ">Free</p>)}

                    </div>
                    {/* <p className=" uppercase font-medium mb-4">What's included</p> */}
                    {/* <p className="text-center">{plan.description}</p> */}
                    <ul className="mb-8 space-y-2 px-6 price__plan">
                      {Object.values(plan.details)
                        .filter(detail => !detail.includes(":"))
                        .map((detail, i) => (
                          <li key={i} className="flex items-center gap-2">
                            {detail}
                          </li>
                        ))}

                      {Object.values(plan.details)
                        .filter(detail => detail.includes(":"))
                        .map((detail, i) => {
                          const [title, content] = detail.split(":");
                          // Check if the title before ":" is a number

                          return (
                            <li key={i} className="flex items-start gap-2">
                              <span>
                                {/* Apply bold and larger font if the title is not numeric */}
                                <span className={title === "1" ? "text-base " : "font-semibold"}>
                                  {title} :
                                </span>
                                <span className="text-base"> {content}</span>
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                    {plan.plan_name === "Basic"
                      ? <Button variant="orange" text="Choose a free plan"
                        style={{ margin: "auto 3rem 2rem 3rem" }}
                      />
                      : plan.plan_name === "Standard"
                        ? <Button variant="orange" text="Upgrade to Standard"
                          style={{ margin: "auto 3rem 2rem 3rem" }}
                        />
                        : <Button variant="orange" text="Go Permium"
                          style={{ margin: "auto 3rem 2rem 3rem" }}
                        />
                    }
                  </div>
                </div>
              );

            })

            }
          </div>
        </div>
      </section>
    </Element>
  );
};
