import { useNavigate } from "react-router-dom";

const UpgradePlan = ({
  closeModal,
  closeModalUpgrade,
  SureUpgradePlan,
  selectedCard,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="border rounded-lg shadow relative max-w-sm bg-white z-20">
          <div className="flex justify-end p-2">
            <button
              type="button"
              // onClick={closeModal || closeModalUpgrade}
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div className="p-6 pt-0 text-center">
            <svg
              className="w-20 h-20 text-red-600 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="mt-5 mb-5">
              <h2 className="text-xl font-semibold text-gray-800">
                Upgrade Your Plan
              </h2>
              <p className="mt-2 text-gray-600">
                Choose the best plan to unlock premium features and enhance your
                experience.
              </p>
            </div>
            <button
              onClick={() => {
                if (selectedCard) {
                  SureUpgradePlan();
                  // closeModalUpgrade();
                  closeModal();
                } else {
                  navigate(`/dashboard/subscription`);
                }
              }}
              className="text-white bg-primary-blue hover:bg-white hover:border hover:border-[#003060] hover:text-[#003060] font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              // onClick={closeModal || closeModalUpgrade}
              onClick={closeModal}
              className="text-gray-900 bg-white hover:bg-primary-blue border hover:text-white border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpgradePlan;
