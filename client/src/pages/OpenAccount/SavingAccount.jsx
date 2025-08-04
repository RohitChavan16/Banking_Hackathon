import React from 'react'
import { useNavigate } from 'react-router-dom';

const SavingAccount = () => {

    const navigate = useNavigate();

    const savingTypes = [
  {
    id: "basic-savings",
    name: "Basic Savings Account",
    minBalance: "Zero or minimal",
    description:
      "A standard savings account suitable for individuals and minors (with guardian). No minimum balance for certain categories. Online/offline opening available.",
  },
  {
    id: "lok-bachat",
    name: "Lok Bachat Yojana",
    minBalance: "No minimum balance",
    description:
      "Designed for low-income customers/BPL. Can be opened with as low as ₹1 or ₹0.",
  },
  {
    id: "yuva-yojana",
    name: "Mahabank Yuva Yojana",
    minBalance: "Zero balance",
    description:
      "For youth aged 10–18. Free debit card, fund transfers from parent, utility payments.",
  },
  {
    id: "royal-savings",
    name: "Royal Savings Account",
    minBalance: "₹100,000 MAB",
    description:
      "For individuals, HUFs, associations, trusts. Zero opening, high benefit account with relationship manager and insurance.",
  },
  {
    id: "purple-savings",
    name: "Purple Savings Account",
    minBalance: "₹300,000 MAB",
    description:
      "For ultra‑HNI individuals. Zero opening, personalized chequebook, insurance cover, high limits.",
  },
  {
    id: "smart-sb",
    name: "BoM Smart SB Scheme (BSS‑15 / BSS‑25)",
    minBalance: "AQB ₹15,000 or ₹25,000",
    description:
      "Two variants (BSS‑15 and BSS‑25); free RuPay debit cards; varying cheque leaves; no AMC; free NEFT/RTGS.",
  },
  {
    id: "salary-account",
    name: "Salary & Supreme Payroll Schemes",
    minBalance: "Zero balance",
    description:
      "Designed for employers/organizations. Zero‑balance account with free debit cards, accident cover, unlimited banking.",
  },
];

  return (
    <div className="p-8 max-w-4xl mt-20 mx-auto space-y-8">
      <h1 className="text-3xl text-blue-500 font-bold">Bank of Maharashtra Savings Accounts</h1>
      <p>
        Explore different savings deposit schemes tailored to varied needs —
        from youth and no balance to HNI and salary-linked accounts.
      </p>

      <div className="space-y-6">
        {savingTypes.map((type) => (
          <div
           key={type.id}
           onClick={() => navigate(`/${type.id}`)} 
           className="bg-white group hover:shadow-lg p-6 rounded-lg shadow cursor-pointer">
            <h2 className="text-2xl  group-hover:text-blue-600 font-semibold mb-2">{type.name}</h2>
            <p className="text-gray-700 mb-1">
              <strong>Minimum Balance:</strong> {type.minBalance}
            </p>
            <p className="text-gray-600">{type.description}</p>
          </div>
        ))}
      </div>

      <section className="pt-8 border-t">
        <h2 className="text‑2xl font-semibold mb-2">Common Details</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Applicable interest: ~2.75% p.a. on daily balances, credited quarterly. :contentReference[oaicite:1]</li>
          <li>
            Eligibility: Resident individuals (singly/jointly), minors (with guardian),
            HUFs, trusts, associations, NRIs. :contentReference[oaicite:2]
          </li>
          <li>
            Documents Needed: Identity proof, Address proof, PAN/Form 60‑61, 2 passport photos; or introducer if missing ID/address. :contentReference[oaicite:3]
          </li>
          <li>
            If minimum (monthly average) balance not maintained, charges are levied quarterly. BV not applicable for localized types (Lok Bachat, pension, salary etc.). 
            :contentReference[oaicite:4]
          </li>
        </ul>
      </section>

      <section className="pt-8 border-t">
        <h2 className="text-2xl font-semibold mb-2">Additional Services</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            Fixed Deposit, Recurring Deposit, Mahasanchay Plan, Tax-saving Term Deposits also offered. Loan against deposit/FD facility up to 90% loanable. :contentReference[oaicite:5]
          </li>
          <li>
            NRI Savings under “NonResident Ordinary Account” scheme allows NRI/PIO to open Rupee savings/current/term deposit accounts. :contentReference[oaicite:6]
          </li>
        </ul>
      </section>
    </div>
  );
};

export default SavingAccount;
