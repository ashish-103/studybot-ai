import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const TermsAndConditions = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <>
      <Header />
      <div className="min-h-screen py-10 px-5 mt-10 mb-10">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Terms and Conditions for Studybot AI
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Last Updated: <span className="font-semibold">22-01-2025</span>
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                General
              </h2>
              <p className="text-gray-600">
                The Studybot AI platform ("Website") and related services
                (together, the "Service") are operated by Wellorgs Infotech Pvt.
                Ltd. ("Studybot", "us", or "we"). By accessing or using any part
                of the Service, you represent that you have read, understood,
                and agree to be bound by these Terms and Conditions of Service
                ("Terms and Conditions"), including any future modifications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Description of Website and Service
              </h2>
              <p className="text-gray-600">
                Studybot AI allows users to prepare for subjective examinations,
                from government exams preparation to competitive exams and
                language proficiency exams, by offering:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>AI-based subjective answer evaluation.</li>
                <li>Detailed analysis of student performance.</li>
                <li>Suggestions for improvement.</li>
              </ul>
              <p className="text-gray-600 mt-2">
                Studybot AI may, at its sole discretion, update, modify,
                suspend, or discontinue any aspect of the Service, temporarily
                or permanently, without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Registration
              </h2>
              <p className="text-gray-600">
                By registering on Studybot AI, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Provide accurate, complete, and updated information.</li>
                <li>
                  Maintain the confidentiality of your account credentials.
                </li>
                <li>
                  Take full responsibility for activities occurring under your
                  account.
                </li>
                <li>
                  Allow us to contact you via phone, email, or SMS, including
                  promotional messages.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Subscriptions
              </h2>
              <p className="text-gray-600">
                Subscriptions are non-refundable and can be purchased monthly or
                annually through third-party platforms or directly via our
                website.
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>
                  <strong>Free Plan:</strong> Free plans may be provided, which
                  can be upgraded to pro or elite plans.
                </li>
                <li>
                  <strong>Auto-Renewal:</strong> Subscriptions renew
                  automatically unless canceled.
                </li>
                <li>
                  <strong>Payment:</strong> All payments are final and processed
                  by third-party platforms or directly through Studybot AI.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Indemnification
              </h2>
              <p className="text-gray-600">
                You agree to indemnify Studybot AI or Wellorgs Infotech Pvt.
                Ltd. against any claims, damages, or liabilities arising from:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Your use of the Service.</li>
                <li>Breach of these Terms and Conditions.</li>
                <li>Misrepresentation or violation of third-party rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Limitation of Liability
              </h2>
              <p className="text-gray-600">
                Under no circumstances will Studybot AI be liable for indirect,
                incidental, or consequential damages, including loss of data,
                profits, or business opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Governing Law and Arbitration
              </h2>
              <p className="text-gray-600">
                These Terms are governed by the laws of India, and any disputes
                will be subject to the exclusive jurisdiction of the courts in
                Mohali.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Miscellaneous
              </h2>
              <p className="text-gray-600">
                These Terms constitute the entire agreement between you and
                Studybot AI. If any provision is found unenforceable, it will
                not affect the remaining provisions. Studybot AI or Wellorgs
                Infotech Pvt. Ltd. may assign its rights without restriction.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
