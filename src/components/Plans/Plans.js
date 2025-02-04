import { useContext, useEffect, useState } from "react";
import { apiCall } from "../../api/login";
import starIcon from "../../assets/images/starticon.svg";
import { Element } from "react-scroll";
import { UserContext } from "../../context/userContext";
import { useModal } from "../../context/ModalProvider";
import Plans from "../../data/plansData";
import { useNavigate } from "react-router-dom";

export const SubscriptionPlans = ({ toggleModal }) => {
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
          <div className="text-5xl md:text-6xl font-semibold pb-5 text-center mb-10">
            Pricing Plan
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 rounded-sm ">
            {data.map((plan, index) => {
              return (
                <div
                  key={`subscriptionid-${index}`}
                  onClick={() => {
                    if (!user) {
                      openModal('login');
                    } else {
                      navigate('/dashboard/subscription')
                    }
                  }}
                  className={`${plan?.plan_name === user?.plan_name ? "" : "bg-white"} group h-full shadow-xl rounded-lg overflow-hidden transform  hover:scale-105 transition duration-300 border border-gray-150
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

                  <div className={`${plan?.plan_name === user?.plan_name ? 'bg-primary-orange' : 'bg-primary-blue'} group-hover:bg-primary-orange bg-primary-blue text-white  w-full h-16 p-0 my-auto flex justify-center items-center`} >
                    <h3 className="text-3xl font-semibold  ">
                      {plan.plan_name}
                    </h3>
                    {/* <p className="">{plan.description}</p> */}
                  </div>
                  <div className="">
                    <div className="mb-8 text-center p-12 bg-gray-100">
                      {plan.price !== "Free" ? (
                        <p className="text-5xl font-semibold align-middle ">
                          {`₹ ${plan.price.replace("INR", "").trim()}`}
                          <span className="text-lg pt-2 px-2 text-gray-600"> per Year</span>
                        </p>
                      ) : (<p className="text-5xl font-semibold ">Free</p>)}

                    </div>
                    {/* <p className=" uppercase font-medium mb-4">What's included</p> */}
                    <ul className="mb-8 space-y-4 px-6 price__plan">
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
                                <span className={title === "1" ? "text-base " : "text-lg font-semibold"}>
                                  {title} :
                                </span>
                                <span className="text-base"> {content}</span>
                              </span>
                            </li>
                          );
                        })}
                    </ul>

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

/* 
 <ul className="mb-8 space-y-4 px-6 price__plan">
                      <li>{plan.details.mock_exams}</li>
                      {/* <li>{plan.details.performance_report}</li> 
                      <li>
                        <span>{title}</span>
                        <span>{content}</span>
                      </li>
                      <li>{plan.details.ai_assistance}</li>
                      <li>{plan.details.exam_simulation}</li>
                      <li>{plan.details.reattempts}</li>
                      <li>
                        {plan.details.interactive_dashboard &&
                          plan.details.interactive_dashboard}
                      </li>
                      <li>
                        {plan.details.priority_support &&
                          plan.details.priority_support}
                      </li>
                      <li>{plan.details.ai_mentoring}</li>
                      <li>{plan.details.lifetime_access}</li>
                      <li>{plan.details.validity_period}</li>
                    </ul >
*/