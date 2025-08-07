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
  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="bg-gradient-to-b from-[#fb610e] to-[#ebe309b1] px-4 py-6 shadow-md w-full overflow-x-auto">
      <div className="flex items-center justify-between relative min-w-[900px] md:min-w-full flex-wrap gap-3">
        {/* Base Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 z-0 -translate-y-1/2"></div>

        {/* Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400 z-10 -translate-y-1/2 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center z-20 flex-1 min-w-[80px]">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${
                index < currentStep
                  ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white"
                  : index === currentStep
                  ? "border-2 border-blue-500 text-blue-600 bg-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>
            <span className="text-[10px] md:text-xs mt-2 font-medium">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountProgressTracker;
