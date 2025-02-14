import { useEffect, useState } from "react";

function CountDownTimer({ handleOtp }) {
  const [timeLeft, setTimeLeft] = useState(60)
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (timeLeft === 0) {
      setDisable(false);
    } else {

      const interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  return (
    <div className="text-right">
      <button
        disabled={disable}
        onClick={handleOtp}
        className={disable ? 'text-gray-500' : 'text-blue-700'}
      >Resend {disable && `( ${timeLeft} )`}</button>
    </div>
  )
};

export default CountDownTimer;