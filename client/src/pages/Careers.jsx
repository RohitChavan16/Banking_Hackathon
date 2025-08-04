import React from "react";

const Careers = () => {
  return (
    <div className="bg-gray-50 mt-29 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white py-20 px-6 md:px-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Careers at Bank of Maharashtra</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Join a legacy of excellence and become a part of India’s fast-growing public sector bank dedicated to empowering the nation.
        </p>
      </div>

      {/* Why Join Us */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">Why Join Bank of Maharashtra?</h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            Bank of Maharashtra isn't just a workplace—it's a platform for building impactful careers. With a rich heritage, dynamic environment, and commitment to digital transformation, we help shape the financial leaders of tomorrow.
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Inclusive Culture",
                desc: "Work with people from all walks of life. Our culture celebrates diversity and inclusion.",
                icon: "🤝",
              },
              {
                title: "Career Progression",
                desc: "We nurture internal talent and provide fast-track promotions, leadership training, and upskilling.",
                icon: "🚀",
              },
              {
                title: "Job Security",
                desc: "As a government-owned entity, we offer unmatched stability with long-term career growth.",
                icon: "🛡️",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-2xl rounded-2xl p-6 transition-transform hover:scale-105 border-t-4 border-blue-500"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-blue-50 py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">Open Roles</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                title: "Probationary Officers (PO)",
                desc: "Dynamic entry-level opportunity for graduates with leadership potential and strong communication skills.",
                eligibility: "Eligibility: Graduate, Age: 21–30",
              },
              {
                title: "Specialist Officers (SO)",
                desc: "Join as a cybersecurity expert, IT officer, data analyst, or credit officer.",
                eligibility: "Eligibility: Varies by role, Age: 23–35",
              },
              {
                title: "Clerical Staff",
                desc: "Front-line roles with customer interactions, cash handling, and branch support.",
                eligibility: "Eligibility: Graduate, Age: 20–28",
              },
              {
                title: "Internship Program",
                desc: "Paid internships for college students in Finance, Tech, and Business departments.",
                eligibility: "Eligibility: 2nd/3rd year students, Age: 18+",
              },
            ].map((role, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition">
                <h3 className="text-2xl font-bold text-blue-800 mb-2">{role.title}</h3>
                <p className="text-gray-700 mb-2">{role.desc}</p>
                <p className="text-sm text-blue-600 italic">{role.eligibility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Culture */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Benefits & Perks</h2>
            <ul className="list-disc text-lg pl-5 space-y-3 text-gray-700">
              <li>Attractive pay packages with allowances</li>
              <li>Housing & medical facilities</li>
              <li>On-the-job training & certification programs</li>
              <li>Work-life balance & paid holidays</li>
              <li>Post-retirement benefits & pension</li>
            </ul>
          </div>
          <img
            src="https://www.bankofmaharashtra.in/writereaddata/Portal/Images/Employee.png"
            alt="Employee"
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Start Your Journey Today</h2>
        <p className="text-lg mb-8">
          Be a part of a purpose-driven institution and contribute to India’s economic growth and financial inclusion mission.
        </p>
        <a
          href="https://www.bankofmaharashtra.in/current-openings"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-blue-900 font-bold px-8 py-3 rounded-full shadow hover:bg-gray-200 transition"
        >
          View Current Openings
        </a>
      </section>
    </div>
  );
};

export default Careers;
