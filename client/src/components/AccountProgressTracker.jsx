import React from "react";

const steps = [
  "Customer Registration",
  "Document Verification",
  "Address Information",
  "Personal Details",
  "Nominee Details",
  "Banking Services",
  "Final Submit",
];

const AccountProgressTracker = ({ currentStep }) => {
  return (
    <div className="bg-gradient-to-b from-[#fb610e] to-[#ebe309b1] p-6 shadow-md w-full overflow-x-auto ">
      <div className="flex items-center justify-between relative min-w-[900px]">
        {/* Base Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 z-0 -translate-y-1/2"></div>

        {/* Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400 z-10 -translate-y-1/2 transition-all duration-300"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {/* Step Circles */}
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center w-1/7 z-20">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                index < currentStep
                  ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white"
                  : index === currentStep
                  ? "border-2 border-blue-500 text-blue-600"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>
            <span className="text-xs mt-2">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountProgressTracker;
