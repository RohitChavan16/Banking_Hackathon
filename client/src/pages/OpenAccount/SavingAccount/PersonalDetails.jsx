import React, { useState } from "react";
import { useForm } from "../../../context/FormContext";
import { useNavigate } from "react-router-dom";
import AccountProgressTracker from "../../../components/AccountProgressTracker.jsx";
import toast from "react-hot-toast";

const PersonalDetails = () => {
  const { formData, updateSection } = useForm();
  const navigate = useNavigate();

  const [localData, setLocalData] = useState({
    gender: "",
    maritalStatus: "",
    religion: "",
    education: "",
    occupation: "",
    income: "",
    fatherName: "",
    motherName: "",
    dependents: "",
    birthDate: "",
    signature: null,
    signaturePreview: null,
    ...formData.personal,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "signature") {
      const file = files[0];
      if (file) {
        const preview = URL.createObjectURL(file);
        setLocalData((prev) => ({ ...prev, signature: file, signaturePreview: preview }));
      }
    } else {
      setLocalData((prev) => ({ ...prev, [name]: value }));
    }
  };

 const handleNext = () => {
  const requiredFields = [
  "gender",
  "maritalStatus",
  "religion",
  "education",
  "occupation",
  "income",
  "fatherName",
  "motherName",
  "dependents",
  "birthDate",
  "signature"
];


  for (let field of requiredFields) {
    if (!localData[field]) {
      toast.error(`Please fill in the required field: `);
      return;
    }
  }

  updateSection("personal", localData);
  toast.success("Personal details saved");
  navigate("/new-account/basic-savings/nominee");
};


  const handleBack = () => {
    updateSection("personal", localData);
    navigate("/new-account/basic-savings/address");
  };

  return (
    <div className="">
      <AccountProgressTracker currentStep={3}/>
    <div className="max-w-4xl mx-auto mt-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Personal Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div>
          <label className="block mb-1 font-medium" required>Gender <span className="text-red-500">*</span></label>
          <select name="gender" required value={localData.gender} onChange={handleChange}
            className="w-full cursor-pointer border rounded px-3 py-2">
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Marital Status <span className="text-red-500">*</span></label>
          <select name="maritalStatus" value={localData.maritalStatus} onChange={handleChange}
            className="w-full cursor-pointer border rounded px-3 py-2">
            <option value="">Select</option>
            <option>Married</option>
            <option>Unmarried</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Religion <span className="text-red-500">*</span></label>
          <select name="religion" value={localData.religion} onChange={handleChange}
            className="w-full border rounded px-3 py-2">
            <option value="">Select</option>
            <option>Hindu</option>
            <option>Muslim</option>
            <option>Christian</option>
            <option>Sikh</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Education <span className="text-red-500">*</span></label>
          <input type="text" name="education" value={localData.education} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Occupation <span className="text-red-500">*</span> </label>
          <input type="text" name="occupation" value={localData.occupation} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Annual Income <span className="text-red-500">*</span></label>
          <input type="text" name="income" value={localData.income} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Father's Full Name <span className="text-red-500">*</span></label>
          <input type="text" name="fatherName" value={localData.fatherName} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mother's Name <span className="text-red-500">*</span></label>
          <input type="text" name="motherName" value={localData.motherName} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Number of Dependents <span className="text-red-500">*</span></label>
          <input type="number" name="dependents" value={localData.dependents} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Birth Date <span className="text-red-500">*</span></label>
          <input type="date" name="birthDate" value={localData.birthDate} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label htmlFor="sign" className="block cursor-pointer mb-1 font-medium">Upload Signature <span className="text-red-500">*</span></label>
          <input id="sign" type="file" name="signature" accept="image/*" onChange={handleChange}
            className="w-full cursor-pointer" />
          {localData.signaturePreview && (
            <img
              src={localData.signaturePreview}
              alt="Signature Preview"
              className="mt-2 h-24 border rounded object-contain"
            />
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="px-6 py-2 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default PersonalDetails;
