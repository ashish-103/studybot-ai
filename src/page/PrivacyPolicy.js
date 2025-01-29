import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const PrivacyPolicy = () => {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Header />
      <div className=" text-gray-800 min-h-screen p-8 mt-10 mb-10">
        <div className="rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Last Updated: 22-01-2025
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">General</h2>
            <p className="mb-4">
              By using, accessing, or participating in Studybot AI ("the
              Service"), you agree to the terms of this Privacy Policy.
              Capitalized terms not defined herein have the meanings set forth
              in the Terms and Conditions, available here. We reserve the right
              to change this Privacy Policy at any time. Any revisions will be
              effective after (i) a 7-day notice posted on the website or (ii)
              your first use of the Service following the revisions. The date of
              the last update will be indicated at the bottom of this policy. If
              you disagree with the Privacy Policy, you must cease using the
              Service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Information We Collect
            </h2>
            <h3 className="text-lg font-medium mt-4">
              Information You Provide
            </h3>
            <p className="mb-4">
              During registration or use of the Service, you may provide your
              name, email address, and other requested details. These details
              are essential for account security and personalization of
              services.
            </p>
            <h3 className="text-lg font-medium mt-4">
              Information Collected Automatically
            </h3>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Cookies and Device Data:</strong> We use cookies to
                enhance your experience. A cookie is stored on your device to
                recognize your activity and preferences.
              </li>
              <li>
                <strong>Browser and IP Information:</strong> This data helps us
                monitor website usage and maintain platform security.
              </li>
              <li>
                <strong>Service Interactions:</strong> Studybot AI collects
                activity data during interactions with educational tools to
                improve your learning experience.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Enhanced Security Measures
            </h2>
            <p className="mb-4">
              To ensure data security, email addresses are collected and
              securely linked to your account.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Use of Information</h2>
            <p className="mb-4">
              The information collected serves the following purposes:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Personalizing your experience and tailoring content.</li>
              <li>Sending notifications about new features and updates.</li>
              <li>Maintaining platform security and functionality.</li>
              <li>Conducting analytics to enhance the Service.</li>
            </ul>
            <p>
              Studybot AI may use aggregate or anonymized data for research or
              product improvement purposes.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Sharing Your Information
            </h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Service Providers:</strong> With third-party providers
                assisting in delivering the Service (e.g., hosting, analytics,
                or notifications).
              </li>
              <li>
                <strong>Legal Compliance:</strong> When required by law,
                subpoenas, or court orders.
              </li>
              <li>
                <strong>Fraud Prevention:</strong> To prevent fraudulent
                activities or ensure the safety of our platform.
              </li>
            </ul>
            <p>
              If ownership of Studybot AI changes, your data may transfer to the
              new owner under this policy's terms.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Third-Party Services</h2>
            <p className="mb-4">
              Studybot AI integrates third-party analytics services like
              Intercom for usage insights and improved support. Your personal
              details, such as email and account activities, may be shared with
              these services solely for enhancing the Service. Additionally:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>
                You may interact with YouTube videos on our platform. By doing
                so, you agree to YouTube's Terms of Service and Google's Privacy
                Policy.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Consumer Control & Opt-Out Options
            </h2>
            <ul className="list-disc list-inside mb-4">
              <li>
                <strong>Push Notifications:</strong> You can manage push
                notification settings through your device's system preferences.
              </li>
              <li>
                <strong>Cross-App Advertising:</strong> Disable interest-based
                ads in your device's settings under "Ads."
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">User Data Deletion</h2>
            <p className="mb-4">
              Users can request account or data deletion by contacting support
              at{" "}
              <a href="mailto:support@studybot.in" className="text-blue-500">
                support@studybot.in
              </a>
              .
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Links to Other Websites
            </h2>
            <p className="mb-4">
              The Service may include links to third-party websites. We are not
              responsible for their privacy practices and encourage you to
              review their policies before sharing information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Disclaimer</h2>
            <p>
              Studybot AI is an independent platform offering exam preparation
              services. We do not represent any government or private entity.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
