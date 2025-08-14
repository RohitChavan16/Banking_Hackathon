// src/components/ContactUs.jsx
import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ContactCard = ({ title, children, icon }) => (
  <div className="bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/25 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h4>
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const ContactUs = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gradient-to-b mt-20 from-slate-50 to-white dark:from-slate-900 dark:to-slate-900 p-6 md:p-10">
      {/* Hero */}
      <section className="max-w-7xl mx-auto mb-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-rose-400/20 backdrop-blur-sm"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-6 p-8 md:p-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
                {t("contact.title")}
              </h1>
              <p className="mt-3 text-white/90 max-w-xl">
                {t("contact.description")}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#missed-call"
                  className="inline-block bg-white/90 text-indigo-700 font-semibold px-4 py-2 rounded-lg shadow"
                >
                  {t("contact.missedCallBtn")}
                </a>
                <a
                  href="#tollfree"
                  className="inline-block bg-white/10 text-white/90 font-semibold px-4 py-2 rounded-lg border border-white/20"
                >
                  {t("contact.tollFreeBtn")}
                </a>
                <a
                  href="#cyber-fraud"
                  className="inline-block bg-white/10 text-white/90 font-semibold px-4 py-2 rounded-lg border border-white/20"
                >
                  {t("contact.cyberFraudBtn")}
                </a>
              </div>
            </div>

            <div className="hidden md:block">
              <img
                src={assets.bankofmaha}
                alt={t("contact.heroImgAlt")}
                className="w-full h-44 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {t("quickLinks.title")}
            </h3>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
              {t("quickLinks.items", { returnObjects: true }).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t("products.title")}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex flex-col items-start gap-2">
                <img
                  src={assets.savingaccount}
                  onClick={() => navigate("/new-account/saving-account")}
                  alt={t("products.savingsAlt")}
                  className="w-full cursor-pointer h-30 object-cover rounded-md"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("products.savings")}
                </span>
              </div>
              <div className="flex flex-col items-start gap-2">
                <img
                  src={assets.currentaccount}
                  onClick={() => navigate("/new-account/current-account")}
                  alt={t("products.homeLoanAlt")}
                  className="w-full cursor-pointer h-30 object-cover rounded-md"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("products.homeLoan")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle column */}
        <div className="lg:col-span-2 space-y-6">
          <div id="missed-call" className="grid md:grid-cols-2 gap-6">
            <ContactCard title={t("missedCall.title")} icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14" /></svg>}>
              {t("missedCall.content")}
            </ContactCard>

            <ContactCard title={t("complaint.title")} icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}>
              {t("complaint.content")}
            </ContactCard>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ContactCard title={t("tollFree.title")} icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m0 14v2m12-10a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
              {t("tollFree.content")}
            </ContactCard>

            <ContactCard id="cyber-fraud" title={t("cyberFraud.title")} icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>}>
              {t("cyberFraud.content")}
            </ContactCard>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              {t("notes.title")}
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {t("notes.description")}
            </p>
            <div className="mt-4 text-xs text-slate-500">
              <strong>{t("notes.sourceLabel")}</strong>{" "}
              <a
                href="https://bankofmaharashtra.in/contact-us"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {t("notes.source")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
