// data.js
import course from "../images/courses.jpg";
import ai_answer_analized from '../images/ai_answer_analized.jpg'
import ai_practice from '../images/ai_practice.jpg'
import query from '../images/query.jpg'
import performanceSummary from '../images/performance-summary.jpg'

const dataCard = [
  {
    title: "Total Students Available",
    number: 1220,
    iconPath:
      "M8 17l4 4 4-4m-4-5v9 M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29",
    bgColor: "#e7e6fb",
  },
  {
    title: "Total Courses Available",
    number: 45,
    iconPath:
      "M8 17l4 4 4-4m-4-5v9 M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29",
    bgColor: "#f9e5ea",
  },
  {
    title: "Active Enrollments",
    number: 300,
    iconPath:
      "M8 17l4 4 4-4m-4-5v9 M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29",
    bgColor: "#dfedf7",
  },
  {
    title: "New Registrations",
    number: 150,
    iconPath:
      "M8 17l4 4 4-4m-4-5v9 M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29",
    bgColor: "#fbedd9",
  },
];

export default dataCard;

export const EvalutionData = [
  {
    title: "Task Acheivement",
    bandScore: "7.0",
    classes: "bg-[#EBD7FF] border-[#9A34FF]",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, industry's standard dummy text ever since the 1500s",
  },
  {
    title: "Coherence and Cohesion",
    bandScore: "6.0",
    classes: "bg-[#DEFDBF] border-[#9BFF37]",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, industry's standard dummy text ever since the 1500s",
  },
  {
    title: "Lexical Resource",
    bandScore: "5.0",
    classes: "bg-[#FED0D4] border-[#FE3244]",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, industry's standard dummy text ever since the 1500s",
  },
  {
    title: "Grammatical Range And Accuracy",
    bandScore: "8.0",
    classes: "bg-[#F8F88C] border-[#C7C706]",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, industry's standard dummy text ever since the 1500s",
  },
];

export const SummaryTableData = [
  {
    section_name: "Task Acheivement",
    score: "-4.5/50",
    score_value: -4.5 / 50,
    attempted: "9/25",
    attempted_value: 9 / 25,
    accuracy: "0%",
    accuracy_value: 0,
    time: "00:51 / 60 min",
    time_value: 51 / 3600,
    ip_address: "205.255.209.215",
    status: true,
  },
  {
    section_name: "Coherence and Cohesion",
    score: "0/50",
    score_value: 0 / 50,
    attempted: "0/25",
    attempted_value: 0 / 25,
    accuracy: "0%",
    accuracy_value: 0,
    time: "00:01 / 60 min",
    time_value: 1 / 3600,
    ip_address: "34.159.101.181",
    status: true,
  },
  {
    section_name: "Lexical Resource",
    score: "0/50",
    score_value: 0 / 50,
    attempted: "13/25",
    attempted_value: 13 / 25,
    accuracy: "0%",
    accuracy_value: 0,
    time: "00:01 / 60 min",
    time_value: 1 / 3600,
    ip_address: "184.139.248.150",
    status: true,
  },
  {
    section_name: "Grammatical Range And Accuracy",
    score: "34/100",
    score_value: 34 / 100,
    attempted: "25/25",
    attempted_value: 25 / 25,
    accuracy: "24%",
    accuracy_value: 24 / 100,
    time: "01:30 / 60 min",
    time_value: 90 / 3600,
    ip_address: "206.48.254.74",
    status: true,
  },
];

export const SubscriptionData = [
  {
    name: "Free",
    description: "Great to start.",
    amount: "1",
    frequency: "/month",
    features: ["1 user account", "10 transactions per month", "Basic support"],
    current: false,
  },
  {
    name: "Economy",
    description: "Best for individuals",
    amount: "15",
    frequency: "/month",
    features: ["1 user account", "10 transactions per month", "Basic support"],
    current: false,
  },
  {
    name: "Business",
    description: "Best for small business",
    amount: "44",
    frequency: "/month",
    features: ["1 user account", "10 transactions per month", "Basic support"],
    current: false,
  },
  {
    name: "Premium",
    description: "Best for big business",
    amount: "55",
    frequency: "/month",
    features: ["1 user account", "10 transactions per month", "Basic support"],
    current: false,
  },
];

export const featuresData = [
  {
    id: 1,
    image: ai_answer_analized,
    name: "AI-Powered Answer Analysis",
    description:
      "Analyze subjective answers and get detailed feedback on clarity, relevance, and structure based on exam criteria.",
  },
  {
    id: 2,
    image: performanceSummary,
    name: "Automated Performance Summary",
    description:
      "Receive automated performance summary with insights into areas of improvement.",
  },
  {
    id: 3,
    image: query,
    name: "AI Query Answering",
    description:
      "Input any question, and Scholar AI provides accurate and detailed answers.",
  },
  {
    id: 4,
    image: ai_practice,
    name: "Interactive Practice Tests",
    description:
      "Practice tests and simulations with instant feedback to prepare you for exam day.",
  },
];
