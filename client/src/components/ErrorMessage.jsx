import React from "react";

function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center w-full py-4">
      <div className="w-full max-w-xl bg-red-50 border border-red-200 rounded-xl px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600 font-bold text-lg">!</span>
          </div>

          <div>
            <h3 className="text-red-700 font-semibold text-base">
              Something went wrong
            </h3>

            <p className="text-red-600 text-sm mt-1">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;