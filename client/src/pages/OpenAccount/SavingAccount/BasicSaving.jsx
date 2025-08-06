import React, { useState } from "react";
import AccountProgressTracker from "../../../components/AccountProgressTracker";
import { assets } from "../../../assets/assets";
import toast from "react-hot-toast";

const BasicSaving = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [agreeTnC, setAgreeTnC] = useState(true);
  const [agreeVcip, setAgreeVcip] = useState(true);
  const [language, setLanguage] = useState("English");
  const [langOpen, setLangOpen] = useState(false);

  const options = [
    "I want to open new account via VKYC.",
    "I am having existing online account want to convert to SB General account.",
    "I am an existing customer and want to refer my Relative / Friend",
    "I dropped off in between without completing full flow, want to continue.",
    "I am referred by my Friend/Relative.",
    "I have completed Video KYC journey and require my Account details",
    "Video interaction with Bank official"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submit
  };

  return (
    <div>
        <AccountProgressTracker />
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row font-sans">
      {/* Sidebar of Landing Page */}
      <div className="bg-gradient-to-r from-[#0091ffe3] to-[#030889d1] text-white p-8 lg:w-1/3 flex flex-col justify-between">
        <div>
          <img
            src={assets.bankofmaha}
            alt="Bank Logo"
            className="w-full mb-6"
          />
          <h2 className="text-2xl font-bold mb-2">Open your Account in just 5 steps!</h2>
          <p className="text-lg">Let's start your journey to become a part of</p>
          <p className="font-semibold mt-1">Bank of Maharashtra parivaar</p>
        </div>

        <div className="mt-10">
          
          <img
            src="https://play-lh.googleusercontent.com/5pSuPY1RTSPQ10QSw3SVjsZCLuYCRvsqjHb1sZffLBYtZINNUXYXWxRitQbXVrYoT1Y=w240-h480-rw"
            alt="CHATBOT IS COMING HERE FOR YOUR HELP"
            className="h-16 mt-2 rounded"
          />
        </div>
      </div>

      {/* Landing Page Form Section */}
      <div className="bg-white p-6 md:p-10 lg:w-2/3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Welcome to Bank of Maharashtra</h1>
          <div className="relative group">
 <button
  onClick={() => setLangOpen(!langOpen)}
  className="flex items-center cursor-pointer gap-2 bg-gradient-to-tr from-blue-600 to-blue-400 text-white px-4 py-1.5 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
>
  🌐 {language}
  <svg
    className={`w-4 h-4 transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M19 9l-7 7-7-7" />
  </svg>
</button>

 
  {/* This is Language Selector */}

  <div className={`absolute ${langOpen ? "block" : "hidden"} top-full mt-2 left-1/2 -translate-x-1/2 w-40 bg-white shadow-xl border rounded-xl z-50 overflow-hidden text-sm`}>
    <button onClick={() => {
    setLanguage("English");
    setLangOpen(false);
    toast.success("Language changed to English!");
  }} className="flex items-center cursor-pointer gap-2 px-5 py-3 w-full text-left hover:bg-gray-100 transition-colors duration-200 text-gray-800">
      🇬🇧 <span>English</span>
    </button>
    <button onClick={() => {
    setLanguage("हिंदी");
    setLangOpen(false);
    toast.success("भाषा हिंदी में बदल दी गई है!");
  }} className="flex items-center cursor-pointer gap-2 px-5 py-3 w-full text-left hover:bg-gray-100 transition-colors duration-200 text-gray-800">
      🇮🇳 <span>हिंदी</span>
    </button>
    <button onClick={() => {
    setLanguage("मराठी");
    setLangOpen(false);
    toast.success("भाषा मराठीत बदलली गेली आहे!");
  }} className="flex items-center cursor-pointer gap-2 px-5 py-3 w-full text-left hover:bg-gray-100 transition-colors duration-200 text-gray-800">
      🇮🇳 <span>मराठी</span>
    </button>
    <button onClick={() => {
    setLanguage("ગુજરાતી");
    setLangOpen(false);
    toast.success("ભાષા ગુજરાતીમાં બદલાઈ ગઈ છે!");
  }} className="flex items-center cursor-pointer gap-2 px-5 py-3 w-full text-left hover:bg-gray-100 transition-colors duration-200 text-gray-800">
      🇮🇳 <span>ગુજરાતી</span>
    </button>
  </div>
</div>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2 underline">Please be ready with</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Aadhar Number</li>
            <li>
              Signature on White Paper{" "}
              <span className="text-gray-500">(upto 100KB in .jpg, .jpeg, .png format)</span>
            </li>
            <li>Mobile linked with Aadhar</li>
            <li>
              Original Image of PAN Card{" "}
              <span className="text-gray-500">(upto 5MB in .jpg, .jpeg, .png format)</span>
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
            User Guide
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
            Watch a Journey
          </button>
        </div>

        {/* Radio Options */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {options.map((opt, idx) => (
            <label key={idx} className="block">
              <input
                type="radio"
                name="purpose"
                className="mr-2"
                value={opt}
                checked={selectedOption === opt}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              {opt}
            </label>
          ))}

          {/* Checkboxes */}
          <div className="mt-4 space-y-2">
            <label className="flex items-start">
              <input
                type="checkbox"
                className="mt-1 mr-2"
                checked={agreeTnC}
                onChange={() => setAgreeTnC(!agreeTnC)}
              />
              <span>
                I accept the{" "}
                <a href="#" className="text-blue-600 underline">
                  Terms and Conditions
                </a>
              </span>
            </label>

            <label className="flex items-start">
              <input
                type="checkbox"
                className="mt-1 mr-2"
                checked={agreeVcip}
                onChange={() => setAgreeVcip(!agreeVcip)}
              />
              <span className="text-sm font-medium">
                I have understood the Video based customer identification process (VCIP) by reading
                user manual and watching Video.
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="mt-6">
            <button
              type="submit"
             
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded text-base font-medium"
            >
              LET’S START
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default BasicSaving;
