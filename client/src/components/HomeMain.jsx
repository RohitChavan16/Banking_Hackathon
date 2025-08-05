import React from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import '../index.css';
import {
  Banknote, Home, User, CreditCard, PiggyBank, BarChart3,
  ShieldCheck, PhoneCall, FileText, RefreshCw, MapPin, PlusSquare
} from "lucide-react";

const HomeMain = () => {

 const navigate = useNavigate();
  
const features = [
  {
    id: 'new-account',
    name: 'Open New Account',
    icon: '🆕',
    color: 'bg-orange-500',
    description: 'Open savings or current accounts online in minutes.',
  },
  {
    id: 'internet-banking',
    name: 'Internet Banking',
    icon: '💻',
    color: 'bg-blue-500',
    description: 'Access your account, transfer funds, and pay bills online.',
  },
  {
    id: 'home-loans',
    name: 'Home Loans',
    icon: '🏠',
    color: 'bg-emerald-600',
    description: 'Apply for housing loans at competitive interest rates.',
  },
  {
    id: 'personal-loans',
    name: 'Personal Loans',
    icon: '💰',
    color: 'bg-yellow-500',
    description: 'Quick personal loans with flexible EMIs.',
  },
  {
    id: 'credit-cards',
    name: 'Credit Cards',
    icon: '💳',
    color: 'bg-purple-500',
    description: 'Explore our wide range of credit card options.',
  },
  {
    id: 'fixed-deposits',
    name: 'Fixed Deposits',
    icon: '🏦',
    color: 'bg-indigo-500',
    description: 'Invest safely with fixed returns and great interest.',
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    icon: '📈',
    color: 'bg-teal-500',
    description: 'Grow your wealth with expert-managed funds.',
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: '🛡️',
    color: 'bg-pink-500',
    description: 'Secure life, health, and travel with our insurance plans.',
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    icon: '📞',
    color: 'bg-red-500',
    description: 'We are here to help 24x7 with all your banking needs.',
  },
  {
    id: 'account-services',
    name: 'Account Services',
    icon: '🧾',
    color: 'bg-gray-600',
    description: 'Manage KYC, update address, and view statements.',
  },
  {
    id: 'upi-payments',
    name: 'UPI & Payments',
    icon: '🔁',
    color: 'bg-cyan-600',
    description: 'Instant money transfers, bill payments, and more.',
  },
  {
    id: 'branch-locator',
    name: 'Branch/ATM Locator',
    icon: '📍',
    color: 'bg-lime-600',
    description: 'Find the nearest branch or ATM quickly.',
  },
];
 


  return (
    <section id="Home" className="relative overflow-hidden bg-slate-50 ">
      <div className="max-w-[1800px] w-full flex px-4 sm:px-10 md:px-12 mx-auto">
        <div className="bg-header-mobile bg-custom-mobile-header-size absolute left-0 bg-top w-full h-full bg-no-repeat lg:hidden"></div>
        <div className="bg-header-desktop absolute -right-[30%]  w-full h-full bg-no-repeat hidden lg:block bg-left"></div>

        <div className="max-w-xl mx-auto max-md:mt-[-10px] lg:mx-0 h-screen relative z-20">
          <div className="h-full flex flex-col justify-center md:justify-end pb-4 lg:pb-0 lg:w-96 lg:justify-center">
            <div className="h-2/3 flex flex-col  backdrop-blur-[2px] bg-white/30 lg:backdrop-blur-none lg:bg-transparent rounded-lg px-2 justify-center items-center text-center lg:items-start lg:text-left">
              <div className="flex flex-col justify-center items-center lg:items-start flex-grow lg:pt-16">
                <h1 className="text-4xl font-bold !font-sans lg:leading-[1.20] lg:text-5xl text-slate-800 lg:text-purple-800 pb-5 drop-shadow-md">
                  <span className="bg-yellow-400 text-teal-700 px-2 rounded">
                    Revolutionize
                  </span>{" "}
                  Your Banking Experience with{" "}
                  <span className="bg-indigo-600 text-white rounded px-2">
                    E-Bank!
                  </span>
                </h1>

                 <p className=" text-gray-500 font-inter mt-[-9px] text-[13.5px] md:text-[17px] leading-snug my-6 drop-shadow-sm">
                    Take your banking experience to the next level with <span className="font-bold text-blue-500">Bank of Maharashtra's</span> AI-powered E-Bank. From secure transactions to smart budgeting, enjoy <span className="text-orange-500 font-medium">24/7 chatbot </span>assistance anytime, anywhere.
                 </p>
              </div>



<div className=" h-30 p-5 flex items-center ml-[-25px] mt-10 justify-center">
  <div className="grid grid-flow-col max-md:grid-rows-3 max-md:gap-2  grid-rows-3 gap-2.5 bg-white rounded-xl shadow-xl p-3 overflow-auto max-w-full">
    {features.map((item, index) => (
      <div
        key={index}
        onClick={() => navigate(`/${item.id}`)}
        className="relative cursor-pointer group w-43 h-17 max-md:w-25 max-md:h-23 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center text-white font-semibold text-sm"
      >
        <div className={`${item.color} w-full h-full rounded-xl flex flex-col items-center justify-center`}>
          <div className="text-3xl">{item.icon}</div>
          <div className="mt-2 text-center px-1">{item.name}</div>
        </div>

        {/* Tooltip */}
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white text-sm font-semibold rounded-xl p-4 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.8)] 
             opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 
             transition-all duration-500 ease-in-out border-2 border-transparent group-hover:border-white animate-borderPulse z-10 pointer-events-none">
            <p className="text-center max-md:text-[10px]">{item.description}</p>
           </div>



      </div>
    ))}
  </div>
</div>

</div>
</div>
</div>
</div>
</section>
  )
}

export default HomeMain;
