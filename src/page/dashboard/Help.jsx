import React from "react";
import Faqs from "../../components/home/Faqs";
import { Link } from "react-router-dom";

export default function Help() {
  return (
    <div>
      <Faqs />
      <div>
        <ul className="flex flex-col gap-4 text-lg font-semibold ml-48">
          <li>
            <Link
              to="/terms-conditions"
              className="menu-link hover:text-primary-orange"
            >
              Terms and Conditions
            </Link>
          </li>
          <li>
            <Link
              to="/user-policy"
              className="menu-link hover:text-primary-orange"
            >
              User Policy
            </Link>
          </li>
          <li>
            <Link
              to="/privacy-policy"
              className="menu-link hover:text-primary-orange"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
