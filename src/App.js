import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./page/Home";
import Examdetail from "./page/ExamDetails";
// import Login from "./page/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { useContext } from "react";
import { UserProvider } from "./context/userContext";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./page/dashboard/DashboardHome";
import AttemptedTests from "./page/dashboard/AttemptedTests";
import Practice from "./page/dashboard/Practice";
import Reports from "./page/dashboard/Reports";
import PerformanceAnalytics from "./page/dashboard/Performance_Analytics";
import ExploreTests from "./page/dashboard/ExploreTests";
import Settings from "./page/dashboard/Settings";
import Account from "./page/dashboard/Account";
import Help from "./page/dashboard/Help";

import { ExamResultsProvider } from "./context/analyticsContext";
import Subscription from "./page/dashboard/Subscription";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./page/PrivacyPolicy";
import TermsAndConditions from "./page/TermsAndConditions";
import UpdateProfile from "./page/dashboard/UpdateProfile";
import UserPolicy from "./page/UserPolicy";
import Guidelines from "./page/dashboard/Guidelines";
import NewPassword from "./page/NewPassword";
import { ModalProvider } from "./context/ModalProvider";
import PerformanceAnalytics2 from "./page/dashboard/Perfomace_analytics2";
import PerformanceContext from "./context/performanceContext";
import { ChangePassword } from "./page/dashboard/ChangePassword";

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
              <Route path="*" element={<Home />} />
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
                <Route path="account/update-profile" element={<UpdateProfile />} />
                <Route path="account/change-password" element={<ChangePassword />} />
                <Route path="subscription" element={<Subscription />} />
                <Route path="help" element={<Help />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
