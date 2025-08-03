import { CreditCard, Eye, Lock, Unlock } from 'lucide-react';
import React from 'react'
import AdminTitle from '../../components/admin/AdminTitle';
import CardSettings from '../../components/admin/CardSettings';

const ManageCards = () => {

   const card = {
    cardholder: "Rohit Chavan",
    cardType: "Visa",
    cardNumber: "**** **** **** 3456",
    expiry: "08/29",
    status: "Active",
    cardLimit: "₹1,00,000",
    remainingLimit: "₹12,400",
    currency: "INR",
  };

  return (
    <div className='w-full'>
      <AdminTitle text="Manage Cards" description="paisa paisa" />
      <div className="flex p-5 max-sm:flex-col ">
   <div className="w-xl h-auto mt-10 shadow-[10px_10px_7px_rgba(2,2,211,0.4)] bg-gradient-to-br from-[#1e293b] to-[#203b78] rounded-2xl p-8 shadow-[0_0_25px_rgba(0,255,255,0.1)] text-white space-y-6">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-orange-400" />
          <h2 className="text-xl font-semibold">Primary Debit Card</h2>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            card.status === "Active"
              ? "bg-green-600/20 text-green-400"
              : "bg-red-600/20 text-red-400"
          }`}
        >
          {card.status}
        </span>
      </div>

      {/* Card Number Section */}
      <div className="text-2xl tracking-widest font-mono bg-[#1a253a] px-6 py-4 rounded-xl flex justify-between items-center">
        <span>{card.cardNumber}</span>
        <button className="text-teal-400 hover:text-teal-300 transition">
          <Eye className="w-5 h-5" />
        </button>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">Cardholder</p>
          <p className="text-base font-medium">{card.cardholder}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Card Type</p>
          <p className="text-base font-medium">{card.cardType}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Expiry Date</p>
          <p className="text-base font-medium">{card.expiry}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Card Limit</p>
          <p className="text-base font-medium">{card.cardLimit}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Remaining Limit</p>
          <p className="text-base font-medium">{card.remainingLimit}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Currency</p>
          <p className="text-base font-medium">{card.currency}</p>
        </div>
      </div>

      {/* Controls */}
      
    </div>

    <div className="w-xl h-auto mt-10  shadow-[10px_10px_7px_rgba(2,2,211,0.4)] mx-10 bg-gradient-to-br from-[#1e293b] to-[#203b78] rounded-2xl p-8 shadow-[0_0_25px_rgba(0,255,255,0.1)] text-white space-y-6">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-orange-400" />
          <h2 className="text-xl font-semibold">Primary Debit Card</h2>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            card.status === "Active"
              ? "bg-green-600/20 text-green-400"
              : "bg-red-600/20 text-red-400"
          }`}
        >
          {card.status}
        </span>
      </div>

      {/* Card Number Section */}
      <div className="text-2xl tracking-widest font-mono bg-[#1a253a] px-6 py-4 rounded-xl flex justify-between items-center">
        <span>{card.cardNumber}</span>
        <button className="text-teal-400 hover:text-teal-300 transition">
          <Eye className="w-5 h-5" />
        </button>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">Cardholder</p>
          <p className="text-base font-medium">{card.cardholder}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Card Type</p>
          <p className="text-base font-medium">{card.cardType}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Expiry Date</p>
          <p className="text-base font-medium">{card.expiry}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Card Limit</p>
          <p className="text-base font-medium">{card.cardLimit}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Remaining Limit</p>
          <p className="text-base font-medium">{card.remainingLimit}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Currency</p>
          <p className="text-base font-medium">{card.currency}</p>
        </div>
      </div>

      {/* Controls */}
      
    </div>
      </div>
      <CardSettings/>
    </div>
  );
}

export default ManageCards;
