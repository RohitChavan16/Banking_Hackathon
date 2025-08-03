import React from "react";
import {
  ToggleLeft,
  ToggleRight,
  Globe,
  Wallet,
  CreditCard,
  Smartphone,
  RefreshCw
} from "lucide-react";

const CardSettings = () => {
  const settings = [
    {
      title: "Daily Spending Limit",
      value: "₹10,000",
      icon: <CreditCard className="w-5 h-5 text-orange-400" />,
    },
    {
      title: "Monthly Spending Limit",
      value: "₹2,00,000",
      icon: <Smartphone className="w-5 h-5 text-blue-400" />,
    },
    {
      title: "Transaction Types",
      value: "Online, ATM, POS",
      icon: <CreditCard className="w-5 h-5 text-purple-400" />,
    },
    {
      title: "Tap to Pay",
      value: "Enabled",
      toggle: true,
      icon: <Smartphone className="w-5 h-5 text-green-400" />,
    },
    {
      title: "International Usage",
      value: "Disabled",
      toggle: true,
      icon: <Globe className="w-5 h-5 text-red-400" />,
    },
    {
      title: "Linked Wallets",
      value: "Google Pay, PhonePe",
      icon: <Wallet className="w-5 h-5 text-yellow-400" />,
    },
    {
      title: "Auto-Renewal",
      value: "Enabled",
      toggle: true,
      icon: <RefreshCw className="w-5 h-5 text-cyan-400" />,
    },
  ];

  return (
    <div className="max-w-full mt-10 m-6 bg-[#e4f6fe] p-6 rounded-2xl shadow-[0_0_20px_rgba(25,162,224,0.1)] text-white">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">
        Card Settings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {settings.map((item, index) => (
          <div
            key={index}
            className="bg-[#fcfcfceb] p-5 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#334155] p-2 rounded-md">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <p className="text-base text-gray-700 font-medium">{item.value}</p>
              </div>
            </div>

            {/* Toggle-style Display */}
            {item.toggle && (
              <div className="text-teal-400">
                {item.value === "Enabled" ? (
                  <ToggleRight className="w-6 h-6" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-500" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSettings;
