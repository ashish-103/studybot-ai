import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const UserPolicy = () => {
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Header />
      <div className="userPolicy text-gray-800 min-h-screen p-8 mt-10 mb-10">
        <div className="rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
            Studybot AI - Acceptable Use Policy
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Last Updated: 22-01-2025
          </p>

          <section className="mb-6">
            {/* <h2 className="text-xl font-semibold mb-2">General</h2> */}
            <p className="text-gray-600 mb-4">
              <strong>Studybot AI</strong> is a platform operated by <strong>Wellorgs Infotech Pvt. Ltd.</strong>, designed to assist users in preparing for exams through AI-driven analysis and insights. To ensure a safe and productive experience for all users, you agree to use Studybot AI in accordance with the following Acceptable Use Policy
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Prohibited Content
            </h2>
            <p className="mt-4">
              You agree not to post, upload, or share any content that:
            </p>

            <ol className="list-decimal">
              <li><strong>Is Inappropriate or Harmful:</strong>
                <ul className="list-disc">
                  <li>Contains sexually explicit, pornographic, or otherwise inappropriate material.</li>
                  <li>Creates a risk of harm, injury, emotional distress, or danger to yourself, others, or any entity.</li>
                  <li>Exploits or harms children, including by exposing them to inappropriate content or soliciting personally identifiable information.</li>
                </ul>
              </li>
              <li><strong>Violates Laws or Regulations:</strong>
                <ul className="list-disc">
                  <li>Breaches any applicable laws, rules, or regulations, or encourages conduct that would violate them.</li>
                  <li>Contains illegal information, such as insider trading knowledge or trade secrets.</li>
                </ul>
              </li>
              <li><strong>Is Offensive or Defamatory:</strong>
                <ul className="list-disc">
                  <li>Includes content that is harmful, abusive, hateful, racist, violent, defamatory, harassing, or otherwise objectionable.</li>
                  <li>Infringes on third-party intellectual property, privacy, or proprietary rights.</li>
                </ul>
              </li>
              <li><strong>Is Misleading or Unauthorized:</strong>
                <ul className="list-disc"><li>Misleads, deceives, or contains content you are not legally permitted to share.
                </li></ul></li>
            </ol>

          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Prohibited Activities
            </h2>
            <p className="mb-4">
              You agree not to engage in activities that:
            </p>
            <ol className="list-decimal">
              <li><strong>Misuse the Studybot AI Platform:
              </strong>
                <ul className="list-disc">
                  <li>Use, display, mirror, or frame the platform or any of its elements (including trademarks or logos) without explicit written consent from <strong>Wellorgs Infotech Pvt. Ltd.</strong></li>
                  <li>Access non-public areas, systems, or delivery methods without authorization.</li>
                  <li>Attempt to scan, probe, or exploit vulnerabilities in Studybot AI systems or security.</li>
                </ul>
              </li>
              <li><strong>Circumvent or Interfere with Platform Protections:</strong>
                <ul className="list-disc">
                  <li>Circumvent, remove, or bypass technological protections employed by Studybot AI or third parties.</li>
                  <li>Interfere with or disrupt access to the platform by others (e.g., sending viruses, overloading servers, spamming).</li>
                </ul>
              </li>
              <li><strong>Engage in Unauthorized Data or Content Use:
              </strong>
                <ul className="list-disc">
                  <li>Scrape, access, or download user or platform content using automated tools without authorization.</li>
                  <li>Collect or store personal information of other users without explicit consent.</li>
                </ul>
              </li>
              <li><strong>Violate Intellectual Property or Misrepresent Affiliation:
              </strong>
                <ul className="list-disc">
                  <li>Use hidden tags or metadata associated with Studybot AI trademarks without prior written approval.</li>
                  <li>Impersonate or misrepresent your affiliation with Studybot AI, other users, or any entity.</li>
                </ul>
              </li>
              <li><strong>Reverse Engineer or Misuse Studybot Technology:</strong>
                <ul className="list-disc">
                  <li>Reverse engineer, decompile, or disassemble any software used to provide Studybot AI services.
                  </li>
                </ul>
              </li>
              <li><strong>Engage in Unauthorized Commercial Use:
              </strong>
                <ul className="list-disc">
                  <li>Use the platform for commercial purposes or to benefit a third party unless explicitly permitted.
                  </li>
                </ul>
              </li>
            </ol>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" >Consequences of Violations</h2>
            <p>Studybot AI, operated by <strong>Wellorgs Infotech Pvt. Ltd.</strong>, reserves the right to:</p>
            <ol className="list-decimal">
              <li>Remove any content deemed in violation of this Acceptable Use Policy or the Terms of Service.</li>
              <li>Suspend or terminate user accounts at its sole discretion, without prior notice or liability, if a violation occurs.</li>
            </ol>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserPolicy;
