import React, { useState } from "react";
import { IoIosClose as CloseIcon } from "react-icons/io";

function ErrorMessage({ Message }) {
  const [hideAlert, setHideAlert] = useState(true);

  // Hide Alter Handler

  const hideAlertHandler = () => {
    setHideAlert(false);
  };

  return (
    <>
      {hideAlert && (
        <div className="mt-2">
          <div role="alert">
            <div class="bg-red-500 text-white font-bold rounded-t px-3 py-2 flex justify-between items-center">
              <p> Danger</p>
              <CloseIcon
                className="cursor-pointer"
                size={20}
                onClick={hideAlertHandler}
              />
            </div>

            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>{Message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ErrorMessage;
