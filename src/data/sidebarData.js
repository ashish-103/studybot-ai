// sidebarData.js
import account from "../images/icons/account.png";
import attemptedTests from "../images/icons/attemptedTests.png";
import exploreTests from "../images/icons/exploreTests.png";
import help from "../images/icons/help.png";
import practice from "../images/icons/practice.png";
import reports from "../images/icons/reports.png";
import settings from "../images/icons/settings.png";

export const sidebarLinks = [
  {
    heading: "MAIN",
    subLinks: [
      {
        label: "Explore Tests",
        path: "/tests",
        icon: exploreTests,
      },
    ],
    // subLinks: [
    //   {
    //     label: "Dashboard",
    //     path: "/home",
    //     icon: dashboard,
    //   },
    // ],
  },
  {
    heading: "EXAMS",
    subLinks: [
      // {
      //   label: "Practice",
      //   path: "/practice",
      //   icon: practice,
      // },
      {
        label: "Reports",
        path: "/reports",
        icon: reports,
      },
      {
        label: "Attempted Tests",
        path: "/attempted-tests",
        icon: attemptedTests,
      },
    ],
  },
  {
    heading: "MORE",
    subLinks: [
      {
        label: "Subscription",
        path: "/subscription",
        icon: settings,
      },
      // {
      //   label: "Settings",
      //   path: "/settings",
      //   icon: settings,
      // },
      {
        label: "Account",
        path: "/account",
        icon: account,
      },
      {
        label: "Help",
        path: "/help",
        icon: help,
      },
    ],
  },
];
