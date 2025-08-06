import { useRef, useState } from "react";
import AccountProgressTracker from "../../../components/AccountProgressTracker";
import toast from "react-hot-toast";

export function CustomerRegistration() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyOpt, setverifyOtp] = useState(false);

  const inputRefs = useRef([]);
  
    const handleInput = (e, index) => {
      if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && e.target.value === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
  
    const handlePaste = (e) => {
      const paste = e.clipboardData.getData("text");
      const pasteArray = paste.split("");
      pasteArray.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });
    };

  const handleSendOtp = () => {
    // trigger OTP send logic here
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
       setverifyOtp(true)
  }

  const handleNext = () => {
    // validate & navigate
    if(!verifyOpt){
         return toast.error("Otp was not verified correct");
    }
    console.log("Submit form");
  };

  return (
    <div>
        <AccountProgressTracker />
    <div className="max-w-3xl mb-2 mx-auto px-6 py-5 bg-white rounded-lg shadow-md border mt-3">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2">
        Customer Registration
      </h2>

      {/* Name Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            First Name
          </label>
          <input
            type="text"
            className="w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Rohit"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Middle Name
          </label>
          <input
            type="text"
            className="w-full mt-1 border rounded-md px-3 py-2"
            placeholder="Kumar"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            className="w-full mt-1 border rounded-md px-3 py-2"
            placeholder="Chavan"
          />
        </div>
      </div>

      {/* Mobile Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Code
          </label>
          <input
            type="text"
            defaultValue="+91"
            className="w-full mt-1 border rounded-md px-3 py-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            className="w-full mt-1 border rounded-md px-3 py-2"
            placeholder="9876543210"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          className="w-full mt-1 border rounded-md px-3 py-2"
          placeholder="example@email.com"
        />
      </div>

      {/* Politically Exposed Question */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Are you a politically exposed person?
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="pep" value="yes" className="accent-blue-600" />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="pep" value="no" className="accent-blue-600" />
            No
          </label>
        </div>
      </div>

      {/* OTP Section */}
      <div className="mb-6 ">
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send OTP
          </button>
        ) : (<div className="flex gap-10">
           <div className="flex justify-between mb-8 w-90" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input type="text" maxLength="1" key={index} required className="w-12 h-12 bg-[#970bfa] text-white text-center text-xl rounded-md" ref={(e) => (inputRefs.current[index] = e)} onInput={(e) => handleInput(e, index)} onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button 
        onClick={handleVerifyOtp}
        className="border h-12 px-3 rounded shadow-2xl bg-amber-300 cursor-pointer hover:bg-amber-400">
               Verify Otp
        </button>
        </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-1">
        <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400">
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
}

export default CustomerRegistration;

