import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Login from "./page/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import DashboardLayout from "./layout/DashboardLayout";
// import { useContext } from "react";
import DashboardHome from "./page/dashboard/DashboardHome";
import AttemptedTests from "./page/dashboard/AttemptedTests";
import Practice from "./page/dashboard/Practice";
import Reports from "./page/dashboard/Reports";
import PerformanceAnalytics from "./page/dashboard/Performance_Analytics";
import ExploreTests from "./page/dashboard/ExploreTests";
import Settings from "./page/dashboard/Settings";
import Account from "./page/dashboard/Account";
import Help from "./page/dashboard/Help";
import Subscription from "./page/dashboard/Subscription";
import Guidelines from "./page/dashboard/Guidelines";
import PerformanceAnalytics2 from "./page/dashboard/Perfomace_analytics2";

import PrivacyPolicy from "./page/PrivacyPolicy";
import UserPolicy from "./page/UserPolicy";
import Home from "./page/Home";
import TermsAndConditions from "./page/TermsAndConditions";
import NewPassword from "./page/NewPassword";
import Examdetail from "./page/ExamDetails";

import ProtectedRoute from "./components/ProtectedRoute";

import { UserProvider } from "./context/userContext";
import { ModalProvider } from "./context/ModalProvider";
import { PerformanceDataProvider } from "./context/performanceContext";
import { ExamResultsProvider } from "./context/analyticsContext";

const clientId =
  "483619648597-giknf43p085748h88hjebe5f7vm3be42.apps.googleusercontent.com";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-conditions" element={<TermsAndConditions />} />
              <Route path="user-policy" element={<UserPolicy />} />
              {/* <Route path="login" element={<Login />} /> */}
              <Route path="reset_password" element={<NewPassword />} />
              <Route path="exam/:id" element={<Examdetail />} />

              {/* <Route path="dashboard" element={<Dashboard />} ></Route> */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="home" index element={<DashboardHome />} />
                <Route path="tests" element={<ExploreTests />} />
                <Route path="practice" element={
                  <PerformanceDataProvider>
                    <Practice />
                  </PerformanceDataProvider>
                } />
                <Route path="guidelines" element={<Guidelines />} />
                <Route path="reports" element={<Reports />} />
                <Route path="attempted-tests" element={<AttemptedTests />} />
                <Route
                  path="performanceAnalytics"
                  element={
                    <ExamResultsProvider>
                      <PerformanceAnalytics />
                    </ExamResultsProvider>
                  }
                />
                <Route
                  path="performanceAnalytics2"
                  element={
                    <PerformanceDataProvider>
                      <PerformanceAnalytics2 />
                    </PerformanceDataProvider>
                  }
                />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
                {/* <Route path="account/update-profile" element={<UpdateProfile />} /> */}
                <Route path="subscription" element={<Subscription />} />
                <Route path="help" element={<Help />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
