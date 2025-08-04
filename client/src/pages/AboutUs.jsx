import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 mt-30 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 to-blue-600 text-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Bank of Maharashtra</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            One of India’s leading public sector banks with a heritage of trust, service, and nationwide presence.
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Our Legacy</h2>
            <p className="text-lg leading-relaxed">
              Established in 1935 in Pune, the Bank of Maharashtra has grown into a trusted public sector bank with over 2,200 branches across India. Known for its customer-centric approach and financial inclusion efforts, it plays a crucial role in empowering individuals, businesses, and the rural economy.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              With cutting-edge banking technologies, digital transformation initiatives, and inclusive schemes, the bank continues to uphold its motto – *Ek Parivaar, Ek Bank*.
            </p>
          </div>
          <img
            src="https://www.bankofmaharashtra.in/writereaddata/Portal/Images/bankimg.jpg"
            alt="Bank legacy"
            className="rounded-xl shadow-xl w-full h-auto"
          />
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-blue-50 py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Vision</h3>
            <p className="text-lg leading-relaxed">
              To be the most respected, technology-driven, customer-friendly, and inclusive bank in India.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Mission</h3>
            <p className="text-lg leading-relaxed">
              Deliver excellence in banking services with innovation, transparency, and integrity while driving financial literacy and rural development.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-blue-900 mb-10">Our Impact in Numbers</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold text-blue-700">2200+</h4>
              <p className="text-lg">Branches</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-blue-700">1900+</h4>
              <p className="text-lg">ATMs</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-blue-700">3.5 Cr+</h4>
              <p className="text-lg">Happy Customers</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-blue-700">87+ Years</h4>
              <p className="text-lg">of Trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="bg-blue-100 py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-blue-900 mb-10 text-center">Our Leadership</h3>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <img
              src="https://www.bankofmaharashtra.in/writereaddata/Portal/Images/Board-of-Directors.png"
              alt="Leadership"
              className="rounded-xl shadow-xl"
            />
            <p className="text-lg leading-relaxed">
              Our bank is led by a team of visionary professionals dedicated to upholding transparency, innovation, and excellence. Under their leadership, we are committed to driving financial inclusion and digital empowerment across all segments of society.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-blue-900 text-white py-16 px-6 md:px-20 text-center">
        <h3 className="text-3xl font-bold mb-4">Join the Legacy of Trust</h3>
        <p className="text-lg mb-6">
          Whether you’re a student, entrepreneur, or salaried professional — Bank of Maharashtra has the right solution for you.
        </p>
        <button className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition">
          Explore Accounts
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
