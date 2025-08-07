import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../../context/FormContext";
import AccountProgressTracker from "../../../components/AccountProgressTracker";
import toast from "react-hot-toast";

const NomineeDetails = () => {
  const navigate = useNavigate();
  const { updateSection } = useForm();

  const [localData, setLocalData] = useState({
    fullName: "",
    relationship: "",
    birthDate: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    district: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
  };

  const handleNext = () => {
    const isValid = Object.values(localData).every((val) => val.trim() !== "");
    if (!isValid) {
      alert("Please fill all required fields.");
      return;
    }
    updateSection("nominee", localData);
    toast.success("Nominee details saved");
    navigate("/new-account/basic-savings/services"); // or whatever your next step is
  };

  const handleBack = () => {
    navigate("/new-account/basic-savings/personal-details");
  };

  return (
    <div>
      <AccountProgressTracker currentStep={4} />
    <div className="max-w-4xl mx-auto p-8 bg-white mb-10 shadow-2xl rounded-xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Nominee Details </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="fullName"
            value={localData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Relationship */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Relationship <span className="text-red-500">*</span></label>
          <select
            name="relationship"
            value={localData.relationship}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Spouse">Spouse</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Birth Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            name="birthDate"
            value={localData.birthDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={localData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
          <input
            type="tel"
            name="phone"
            value={localData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Address <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="address"
            value={localData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">State <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="state"
            value={localData.state}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* District */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">District <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="district"
            value={localData.district}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">City <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="city"
            value={localData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-10">
        <button
          onClick={handleBack}
          className="px-6 py-2 cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition duration-200"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default NomineeDetails;
