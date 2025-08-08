import React, { useState } from "react";

const UpiPayment = () => {
  const [upiId, setUpiId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Processing UPI payment for ${upiId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-gray-700 font-medium">UPI ID</span>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="example@upi"
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300"
          required
        />
      </label>
      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Pay Now
      </button>
    </form>
  );
}

export default UpiPayment;
