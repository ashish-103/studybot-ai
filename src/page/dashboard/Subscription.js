/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import starIcon from "../../assets/images/starticon.svg";
import Billing from "../../assets/images/Billing.png";
import PaymentHistory from "../../assets/images/payment_history.png";
import Candidate from "../../assets/images/candidate.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../../components/ResubaleComponents/ErrorMessage";
import PaymentHistoryData from "./PaymentHistory";
import ContactUsModal from "../../components/ContactUsModal";
import UpgradePlan from "../../components/UpgradePlan/UpgradePlan";
import Plans from "../../data/plansData";

const Subscription = () => {
  const user_id = localStorage.getItem("user");
  const userID = JSON.parse(user_id);

  const [isModalOpenContact, setIsModalOpenContact] = useState(false);
  const [isModalOpenUpgrade, setIsModalOpenUpgrade] = useState(false);

  const [upgradeIndex, setUpgradeIndex] = useState("");
  const [activeTab, setActiveTab] = useState("monthly");
  const [activeTabScheme, setActiveTabScheme] = useState("yearly"); // Track active tab
  const [selectedPlan, setSelectedPlan] = useState("select a Plan");
  const [selectedNew, setSelectedOpgrade] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null); // Track selected card
  const [valueSend, setvalueSend] = useState(userID.plan_name);
  const [data, setData] = useState([]);

  const openModal = () => setIsModalOpenContact(true);
  const closeModal = () => setIsModalOpenContact(false);
  const openModalUpgrade = () => setIsModalOpenUpgrade(true);
  const closeModalUpgrade = () => setIsModalOpenUpgrade(false);

  const handleSelectPlan = (amount, name, index) => {
    const numericAmount = parseFloat(amount.replace(/[^\d.]/g, ""));
    const correctAmount = numericAmount * 100;

    setSelectedAmount(correctAmount); // Update the selected amount when a plan is clicked
    setSelectedPlan(name); // Update the selected plan name
    setSelectedCard(index); // Update the selected card index

    setFormData((prevState) => ({
      ...prevState,
      selectedPlan: name, // Update selected plan in formData as well
      amount: correctAmount, // Update the amount in formData as well
    }));
  };

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0"); // Get day and ensure two digits
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Get month and ensure two digits
  const year = currentDate.getFullYear(); // Get the full year
  const formattedDate = `${day}-${month}-${year}`; // Format date as DD-MM-YYYY

  const [errors, setErrors] = useState({
    billingName: "",
    billingAddress: "",
    billingPhone: "",
  });
  const [formData, setFormData] = useState({
    selectedPlan: selectedPlan,
    activeTabScheme: activeTabScheme,
    billingName: "",
    billingAddress: "",
    billingPhone: "",
    paymentDate: formattedDate,
    amount: selectedAmount,
  });
  // Handle input change for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "billingName" && /[^a-zA-Z\s]/.test(value)) {
      return;
    }
    if (name === "billingPhone" && /[^0-9]/.test(value)) {
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json ; charset=UTF-8");
    myHeaders.append(
      "Cookie",
      "session=.eJwljjEOAjEMBP-SmiKxEzvHZ5AdrwXtARXi70SinJVmNZ9yyxPPe7m-zjcu5faIci2AdtNJkuCJaXmIEYzbMWlF85pe13LsUdUHe6JuimMMQHplAbVO21s0OhAWzCbKkRS8mKuncQ0RCm-tZc9jOA1kc0hk2SHvJ85_jWgXUybXEJ4d5rqPJcr3BzvSOAI.Z0hRJg.m-nzm61vD2t1U7OeqwBk8mfreWQ"
    );

    const raw = JSON.stringify({
      amount: Number(selectedAmount),
      user_id: userID.userid,
      plan_name: formData.selectedPlan,
      scheme_name: "Yearly",
      billing_name: formData.billingName,
      billing_address: formData.billingAddress,
      billing_phone_number: formData.billingPhone,
      payment_date: formattedDate,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://studybot.zapto.org/initiate_payment", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        window.open(result.paymentUrl, '__blank');
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setData(Plans);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    let formIsValid = true;

    // Validate billingName
    if (!formData.billingName) {
      newErrors.billingName = "Name is required";
      formIsValid = false;
    }

    // Validate billingAddress
    if (!formData.billingAddress) {
      newErrors.billingAddress = "Address is required";
      formIsValid = false;
    }

    // Validate billingPhone
    if (!/^\d{10}$/.test(formData.billingPhone)) {
      newErrors.billingPhone = "Phone number must be 10 digits";
      formIsValid = false;
    }

    // Validate paymentDate
    if (!formData.paymentDate) {
      newErrors.paymentDate = "Payment date is required";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      handlePayment();
    }
  };

  const SureUpgradePlan = () => {
    if (selectedCard) {
      setUpgradeIndex(selectedCard);
      setSelectedOpgrade(selectedPlan);
      closeModalUpgrade();
    }
  };
  return (
    <>
      <div>
        <div className="text-sm font-medium text-center text-[#637381] mb-5 ">
          <ul className="flex flex-wrap -mb-px gap-5">
            <li
              className={`mr-2 flex items-center border-b-2 ${activeTab === "billing"
                ? "border-[#212B36] border-b-2"
                : "border-transparent"
                } hover:text-gray-600 hover:border-gray-300`}
              onClick={() => setActiveTab("billing")}
            >
              <span>
                <img src={Billing} alt="Billing" className="w-5 h-5" />
              </span>
              <Link
                to="/dashboard/subscription"
                className={`inline-block p-4 rounded-t-lg ${activeTab === "billing" ? "text-[#212B36]" : ""
                  }`}
              >
                Billing
              </Link>
            </li>
            <li
              className={`mr-2 flex items-center border-b-2 ${activeTab === "paymentHistory"
                ? "border-[#212B36]"
                : "border-transparent"
                } hover:text-gray-600 hover:border-gray-300`}
              onClick={() => setActiveTab("paymentHistory")}
            >
              <span>
                <img
                  src={PaymentHistory}
                  alt="PaymentHistory"
                  className="w-5 h-5"
                />
              </span>
              <Link
                to="/dashboard/subscription"
                className={`inline-block p-4 rounded-t-lg ${activeTab === "paymentHistory" ? "text-[#212B36]" : ""
                  }`}
                aria-current="page"
              >
                Payment History
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "paymentHistory" ? (
        <section className="bg-white rounded-2xl">
          <div className="max-w-7xl mx-auto ">
            {/* <h2 className="text-2xl font-extrabold text-black mb-5">
              Payment History
            </h2> */}
            <PaymentHistoryData />
            {/* Add your payment history content here */}
          </div>
        </section>
      ) : (
        <>
          <section className="bg-white py-12 rounded-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-extrabold text-black">
                  Subscription Plans
                </h2>
                {/* <h2 className="flex items-center gap-3 cursor-pointer font-extrabold text-[#0061EB]">
                  Compare Subscription Plans
                  <span>
                    <img src={upArrow} alt="upArrow" />
                  </span>
                </h2> */}
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((plan, index) => {
                  return (
                    <div
                      key={`subscriptionid-${index}`}
                      className={`${plan.plan_name === userID.plan_name
                        ? ""
                        : "bg-white"
                        }
                      } h-full shadow-2xl rounded-lg  transform hover:scale-105 transition duration-300 border border-gray-150 `}
                      // ${upgradeIndex === index ? "upgradeIndex" : ""
                      onClick={() => {
                        if (
                          valueSend !== "Elite Plan" && plan.plan_name !== userID.plan_name
                        ) {
                          openModalUpgrade();
                          setSelectedCard(index);
                          handleSelectPlan(plan.price, plan.plan_name, index);
                        }
                      }}
                    >
                      {/* {plan.current && (
                        <p className="flex items-center gap-2 absolute right-2 py-1.5 px-2 bg-[#001921] text-white rounded-lg text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
                          <span>
                            <img src={starIcon} alt="current" className="" />
                          </span>
                          Current
                        </p>
                      )}
                      <div className="mb-8 mt-5">
                        <h3 className="text-2xl font-semibold ">
                          {plan.plan_name}
                        </h3>
                        <p className="">{plan.description}</p>
                      </div>
                      <div className="mb-8">
                        <span className="text-4xl font-semibold ">
                          {plan.price}
                        </span>
                      </div>
                      <p className=" uppercase font-medium mb-4">
                        What's included
                      </p>
                      <ul className="mb-8 space-y-4">
                        <li>{plan.details.ai_assistance}</li>
                        <li>{plan.details.exam_simulation}</li>
                        <li>
                          {plan.details.interactive_dashboard &&
                            plan.details.interactive_dashboard}
                        </li>
                        <li>{plan.details.mock_exams}</li>
                        <li>{plan.details.performance_report}</li>
                        <li>
                          {plan.details.priority_support &&
                            plan.details.priority_support}
                        </li>
                        <li>{plan.details.reattempts}</li>
                        <li>{plan.details.validity_period}</li>
                      </ul> */}

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

                      <div className={` 
                      ${selectedNew === "" ? plan?.plan_name === userID?.plan_name ? "bg-primary-orange" : "bg-primary-blue" : selectedNew === plan?.plan_name ? "bg-primary-orange" : "bg-primary-blue"}
                         text-white w-full h-16 p-0 my-auto flex justify-center items-center
                          `}>
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
                })}
              </div>

              <div className="mt-10 flex   md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <form className="flex flex-col w-full">
                  <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-[60%]   space-y-6">
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-xl  leading-5 text-black">
                        Plan Name
                      </h3>
                      <p className="text-[#212B36] font-medium">
                        {selectedNew}
                      </p>
                    </div>
                    <div className="flex justify-center items-center w-full space-y-4 flex-col   pb-4">
                      <div className="flex justify-between w-full items-center">
                        <p className="text-base leading-4 text-black">
                          Scheme Name
                        </p>
                        <p className="text-base leading-4 text-gray-600">
                          <div className="flex justify-center">
                            <nav className="flex   items-center p-1 space-x-6 rtl:space-x-reverse text-sm text-gray-600  rounded-xl ">
                              {/* <button
                                // onClick={() => setActiveTabScheme("monthly")}
                                role="tab"
                                type="button"
                                className={`${activeTabScheme === "monthly"
                                  ? "bg-black text-white px-4 py-1 rounded-full m-0 font-medium"
                                  : "font-medium"
                                  }`}
                              >
                                Monthly
                              </button> */}

                              <button
                                onClick={() => setActiveTabScheme("yearly")}
                                role="tab"
                                type="button"
                                className={`${activeTabScheme === "yearly"
                                  ? "bg-black text-white px-4 py-1 rounded-full m-0 font-medium"
                                  : "font-medium"
                                  }  `}
                              >
                                Yearly
                              </button>
                            </nav>
                          </div>
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base leading-4 text-black">Name</p>
                        <p className="text-base leading-4 text-[#212B36]">
                          <input
                            type="text"
                            name="billingName"
                            value={formData.billingName}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                          {errors.billingName && <ErrorMessage messsage={errors.billingName} />}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full pb-2">
                        <p className="text-base leading-4 text-black">
                          Address
                        </p>
                        <p className="text-base leading-4 text-gray-600">
                          <input
                            type="text"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                          {errors.billingAddress && <ErrorMessage message={errors.billingAddress} />}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base leading-4 text-black">
                          Phone number
                        </p>
                        <p className="text-base leading-4 text-gray-600">
                          <input
                            type="text"
                            name="billingPhone"
                            value={formData.billingPhone}
                            onChange={handleInputChange}
                            maxLength="10"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                          {errors.billingPhone && <ErrorMessage message={errors.billingPhone} />}
                        </p>
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-base leading-4 text-black">
                          Payment Date
                        </p>
                        <p className="text-base leading-4 text-[#212B36]">
                          {formData.paymentDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex gap-4 justify-end mt-10">
                {/* <button
                  onClick={() => {
                    setFormData({
                      selectedPlan: "select a Plan",
                      activeTabScheme: "",
                      billingName: "",
                      billingAddress: "",
                      billingPhone: "",
                      paymentDate: formattedDate,
                      amount: "",
                    });
                  }}
                  className="px-4 py-2 min-w-[120px] text-center text-[#212B36] border border-[#001921]  rounded hover:bg-[#001921] hover:text-white hover:border-[#001921]  focus:outline-none focus:ring font-semibold"
                >
                  Cancel Plan
                </button> */}
                <button
                  className="px-4 py-2 min-w-[120px] text-center text-white bg-[#001921]  border border-[#001921] rounded  hover:bg-transparent hover:text-[#212B36] focus:outline-none focus:ring font-semibold"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={selectedPlan == "Basic(Free) Plan"}
                >
                  Submit
                </button>
              </div>
            </div>
          </section>

          <section
            className="bg-red-500 mt-10 py-12 rounded-2xl"
            style={{
              background:
                "linear-gradient(112.47deg, #001921 13.81%, #FFFFFF 76.65%)",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
              <div className="flex justify-between mb-3">
                <p className="font-semibold text-xl">Enterprise</p>
                <h2
                  onClick={openModal}
                  className="flex items-center gap-3 cursor-pointer font-extrabold text-[#0061EB]"
                >
                  <span>
                    <img src={Candidate} alt="Candidate" />
                  </span>
                  Upgrade to Enterprise
                </h2>
              </div>
              <p>
                Keep your organization focused as you scale. Starting at 100
                members.
              </p>
            </div>
          </section>
        </>
      )
      }
      {
        isModalOpenContact && (
          <ContactUsModal
            isOpen={isModalOpenContact}
            closeModal={closeModal}
            valueSend={valueSend}
          />
        )
      }
      {
        isModalOpenUpgrade && (
          <UpgradePlan
            closeModalUpgrade={closeModalUpgrade}
            SureUpgradePlan={SureUpgradePlan}
            selectedCard={selectedCard}
          />
        )
      }
    </>
  );
};

export default Subscription;
