import React, { useState, useEffect } from "react";
import { useForm } from "../../../context/FormContext";
import { useNavigate } from "react-router-dom";
import AccountProgressTracker from "../../../components/AccountProgressTracker";
import toast from "react-hot-toast";

const OtherBankingServices = () => {
  const { updateSection } = useForm();
  const navigate = useNavigate();

  const [digital, setDigital] = useState({
    debitCard: true,
    upi: true,
    internetBanking: true,
    whatsappBanking: true,
    mobileBanking: true,
  });

  const [deposits, setDeposits] = useState({
    fixed: false,
    recurring: false,
    taxSaving: false,
    locker: false,
    NA: false,
  });

  const [loans, setLoans] = useState({
    home: false,
    car: false,
    education: false,
    credit: false,
    NA: false,
  });

  const handleChange = (groupSetter, groupState, key) => {
  if (key === "NA") {
    const newState = Object.fromEntries(
      Object.keys(groupState).map((k) => [k, k === "NA" ? !groupState["NA"] : false])
    );
    groupSetter(newState);
  } else {
    const newState = {
      ...groupState,
      [key]: !groupState[key],
      NA: false, // uncheck NA if another field is checked
    };
    groupSetter(newState);
  }
};


  const isAtLeastOneChecked = (obj) => Object.values(obj).some((val) => val);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !isAtLeastOneChecked(digital) ||
      !isAtLeastOneChecked(deposits) ||
      !isAtLeastOneChecked(loans)
    ) {
      toast.error("Please select at least one option from each section.");
      return;
    }

    updateSection("services", {
      digital,
      deposits,
      loans,
    });

    navigate("/new-account/basic-savings/submit"); // Replace with your actual route
  };

  return (
    <div>
      <AccountProgressTracker currentStep={5} />
    <div className="max-w-4xl mx-auto p-8 mb-10 bg-white shadow-md rounded-lg mt-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Other Banking Services</h2>

      <form onSubmit={handleSubmit}>
        <p className="text-gray-600 mb-4">Please select the service you wish to avail</p>

        {/* Digital Banking */}
        <div className="mb-6">
          <h3 className="bg-blue-100 px-3 py-1 font-semibold rounded text-blue-700">Digital Banking</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
            {[
              ["Debit Card", "debitCard"],
              ["UPI", "upi"],
              ["Internet Banking", "internetBanking"],
              ["WhatsApp Banking", "whatsappBanking"],
              ["Mobile Banking", "mobileBanking"],
            ].map(([label, key]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={digital[key]}
                  onChange={() => handleChange(setDigital, digital, key)}
                />
                {label}
              </label>
            ))}
          </div>
          <p className="text-green-600 text-sm mt-2 bg-green-100 p-2 rounded">
            Please uncheck digital services which you don't want
          </p>
        </div>

        {/* Deposits */}
        <div className="mb-6">
          <h3 className="bg-blue-100 px-3 py-1 font-semibold rounded text-blue-700">Deposits</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
            {[
              ["Fixed Deposits", "fixed"],
              ["Recurring Deposits", "recurring"],
              ["Tax Saving Deposits", "taxSaving"],
              ["Locker Service", "locker"],
              ["Don't want Anyting", "NA"],
            ].map(([label, key]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={deposits[key]}
                  onChange={() => handleChange(setDeposits, deposits, key)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Loans */}
        <div className="mb-6">
          <h3 className="bg-blue-100 px-3 py-1 font-semibold rounded text-blue-700">Loan</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
            {[
              ["Home Loan", "home"],
              ["Car Loan", "car"],
              ["Education Loan", "education"],
              ["Credit Card", "credit"],
              ["Don't want Anyting", "NA"],
            ].map(([label, key]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={loans[key]}
                  onChange={() => handleChange(setLoans, loans, key)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => navigate("/new-account/basic-savings/nominee")}
            className="px-4 py-2 cursor-pointer bg-white border border-blue-500 text-blue-700 rounded hover:bg-blue-50"
          >
            BACK
          </button>
          <button
            type="submit"
            className="px-6 cursor-pointer py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default OtherBankingServices;
