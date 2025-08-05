import React from 'react'
import { Globe, PieChart, Rocket, Server } from "lucide-react";

const HomeOption = () => {
  const motivationItems = [
    {
      icon: <Globe className="w-10 h-10 text-orange-400" />,
      title: "Online Banking",
      subtitle:
        "Our modern web and mobile applications allow you to keep track of your finances wherever you are in the world.",
    },
    {
      icon: <PieChart className="w-10 h-10 text-orange-400" />,
      title: "Simple Budgeting",
      subtitle:
        "See exactly where your money goes each month. Receive notifications when you're close to hitting your limits.",
    },
    {
      icon: <Rocket className="w-10 h-10 text-orange-400" />,
      title: "Fast Onboarding",
      subtitle:
        "We don't do branches. Open your account in minutes online and start taking control of your finances right away.",
    },
    {
      icon: <Server className="w-10 h-10 text-orange-400" />,
      title: "Open API",
      subtitle:
        "Manage your savings, investments, pension, and much more from one account. Tracking your money has never been easier.",
    },
  ];

  return (
    <section id="About" className="py-20  md:py-40 bg-[#0f172a]">
      <div className="max-w-[1800px] w-full mx-auto flex flex-col justify-center items-center gap-10 px-4 sm:px-10 md:px-12 text-center lg:text-left">
        
        {/* Heading */}
        <div className="grid lg:grid-cols-2 mb-12 lg:mb-16">
          <div className="col-span-1">
            <h2 className="text-3xl font-bold !font-sans lg:text-4xl text-teal-600 pb-5 mb-5">
              Discover the Top Reasons to Bank with{" "}
              <span className="font-extrabold text-orange-500">
                Bank of Maharashtra
              </span>
            </h2>
            <p className="text-white !font-sans font-light text-lg leading-5">
              We leverage Open Banking to turn your bank account into your
              financial hub. Control your finances like never before.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-9 lg:gap-6 lg:grid-cols-4">
          {motivationItems.map((item) => (
            <div
              key={item.title}
              className="border-2 p-10 rounded-lg shadow-[0_0_20px_rgba(25,162,224,0.5)]"
            >
              <div className="flex justify-center lg:justify-start mb-4">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-teal-600 py-4 lg:pt-9 lg:pb-6 lg:text-xl lg:font-bold">
                {item.title}
              </h3>
              <p className="text-white !font-sans text-sm font-light lg:text-base leading-5">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeOption;
