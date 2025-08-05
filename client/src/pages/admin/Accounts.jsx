import React from 'react'
import AdminTitle from '../../components/admin/AdminTitle'
import { assets } from '../../assets/assets'

const Accounts = () => {

  const dummyUser = {
  id: "user_1234567890",
  fullName: "Rohit Chavan",
  username: "rohit16",
  email: "rohit.chavan@example.com",
  phone: "+91 9876543210",
  dob: "2006-12-16",
  gender: "Male",
  profilePicture: "/assets/default-avatar.png",

  account: {
    type: "Personal",
    accountNumber: "123456789012",
    ifscCode: "MAHB0000456",
    customerId: "9876543210",
    panCard: "ABCDE1234F",
     branchName: "Shivajinagar Branch, Pune",
    createdAt: "2023-05-10T14:20:00Z",
    lastLogin: "2025-08-04T18:45:00Z",
    tier: "Gold",
    status: "Active",
    completionPercent: 85
  },

  security: {
    twoFactorEnabled: true,
    passwordStrength: "Strong",
    lastPasswordChange: "2025-07-01T09:00:00Z",
    loginDevices: [
      { device: "Chrome on Windows", location: "Pune, India", lastUsed: "2025-08-04 18:40" },
      { device: "Edge on Android", location: "Mumbai, India", lastUsed: "2025-07-28 14:12" }
    ]
  },

  preferences: {
    theme: "dark",
    language: "English",
    currency: "INR",
    emailNotifications: true,
    smsNotifications: false
  },

  address: {
    street: "45 MG Road",
    city: "Pune",
    state: "Maharashtra",
    zipCode: "411001",
    country: "India"
  },

  paymentMethods: [
    {
      type: "Credit Card",
      cardNumber: "**** **** **** 1234",
      holder: "Rohit Chavan",
      expiry: "08/27",
      default: true
    },
    {
      type: "UPI",
      upiId: "rohit@ybl",
      default: false
    }
  ],

  referrals: {
    referralCode: "ROHIT123",
    invitedUsers: 5,
    rewardsEarned: "₹500"
  },

  activityLog: [
    { activity: "Logged in", timestamp: "2025-08-04T18:45:00Z", ip: "103.21.244.0" },
    { activity: "Changed password", timestamp: "2025-07-01T09:00:00Z", ip: "103.21.244.0" },
    { activity: "Updated profile info", timestamp: "2025-06-20T10:30:00Z", ip: "103.21.244.0" }
  ],

  aiTips: [
    "You haven’t set a recovery email. Add one for better security.",
    "Enable biometric login on your mobile device for faster access."
  ]
};




  return (
    <div>
      <AdminTitle text="My Account" />
      <div className="flex flex-wrap gap-6 m-6 p-6 rounded-3xl border-2 border-blue-600 bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-400">
  
  <img 
    src={assets.avatar_icon} 
    className="w-40 h-40 rounded-full shadow-md hover:scale-105 transition-transform duration-300" 
    alt="Avatar" 
  />

  {/* Personal Info */}
  <div className="flex flex-col flex-1 p-6 gap-4 rounded-3xl border border-blue-400 bg-white/50 backdrop-blur-sm shadow-lg hover:bg-white/80 transition-all duration-300">
    <h2 className="text-xl font-semibold text-blue-700 mb-2">👤 Personal Details</h2>

    <div className="flex justify-between text-gray-800">
      <span className="font-medium">Full Name:</span>
      <span>{dummyUser.fullName}</span>
    </div>

    <div className="flex justify-between text-gray-800">
      <span className="font-medium">Email:</span>
      <span>{dummyUser.email}</span>
    </div>

    <div className="flex justify-between text-gray-800">
      <span className="font-medium">Phone No.:</span>
      <span>{dummyUser.phone}</span>
    </div>

    <div className="flex justify-between text-gray-800">
      <span className="font-medium">DOB:</span>
      <span>{dummyUser.dob}</span>
    </div>

    <div className="flex justify-between text-gray-800">
      <span className="font-medium">Gender:</span>
      <span>{dummyUser.gender}</span>
    </div>
  </div>

  {/* Account Info */}
  <div className="flex flex-col flex-1 p-6 gap-4 rounded-3xl border border-teal-400 bg-white/50 backdrop-blur-sm shadow-lg hover:bg-white/80 transition-all duration-300">
    <h2 className="text-xl font-semibold text-teal-700 mb-2">🏦 Account Information</h2>

    <div className="flex justify-between text-gray-800">
      <span className="font-medium">Customer ID:</span>
      <span>{dummyUser.account.customerId}</span>
    </div>

    <div className="flex justify-between text-gray-800">
      <span className="font-medium">Account Type:</span>
      <span>{dummyUser.account.type}</span>
    </div>

    <div className="flex justify-between text-gray-800">
      <span className="font-medium">Account No.:</span>
      <span>{dummyUser.account.accountNumber}</span>
    </div>

    <div className="flex justify-between text-gray-800">
      <span className="font-medium">IFSC Code:</span>
      <span>{dummyUser.account.ifscCode}</span>
    </div>

    <div className="flex justify-between text-gray-800">
      <span className="font-medium">Branch Name:</span>
      <span>{dummyUser.account.branchName}</span>
    </div>
  </div>
</div>


      
<div className="w-full  mx-auto bg-gradient-to-tr from-indigo-500/40 to-cyan-500/30 p-6  shadow-2xl mb-10 mt-8">
  <h2 className="text-3xl font-bold text-blue-800 mb-6">📋 My Account Details</h2>

  <div className="grid md:grid-cols-2 gap-6 text-gray-800 text-base">

    {/* Row 1 */}
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Full Name:</span>
      <span className="text-right">Rohit Shankar Chavan</span>
    </div>
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Date of Birth:</span>
      <span className="text-right">16 December 2006</span>
    </div>

    {/* Row 2 */}
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Account Number:</span>
      <span className="text-right">7486 2345 9012</span>
    </div>
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">IFSC Code:</span>
      <span className="text-right">MAHB0000201</span>
    </div>

    {/* Row 3 */}
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Branch Name:</span>
      <span className="text-right">Pune Shivajinagar</span>
    </div>
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Mobile Number:</span>
      <span className="text-right">+91 98765 43210 <span className="text-green-600 font-semibold">[Verified]</span></span>
    </div>

    {/* Row 4 */}
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Email ID:</span>
      <span className="text-right">rohitc@example.com</span>
    </div>
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Aadhar Linked:</span>
      <span className="text-right text-green-600 font-semibold">Yes ✅</span>
    </div>

    {/* Row 5 */}
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">PAN Card:</span>
      <span className="text-right">ABCDE1234F</span>
    </div>
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Occupation:</span>
      <span className="text-right">Student (B.Tech ENTC)</span>
    </div>

    {/* Row 6 */}
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Address:</span>
      <span className="text-right max-w-[60%] text-sm">102, Ashirwad Residency, FC Road, Shivajinagar, Pune - 411005</span>
    </div>
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Nominee Name:</span>
      <span className="text-right">Ramesh Chavan</span>
    </div>

    {/* Row 7 */}
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Nominee Relationship:</span>
      <span className="text-right">Father</span>
    </div>
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">KYC Status:</span>
      <span className="text-right text-green-700 font-semibold">Completed ✅</span>
    </div>

    {/* Row 8 */}
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Account Created:</span>
      <span className="text-right">15 April 2022</span>
    </div>
    <div className="flex justify-between border-b pb-2">
      <span className="font-medium">Net Banking:</span>
      <span className="text-right text-green-700 font-semibold">Active</span>
    </div>

  </div>
</div>


      


    </div>
  )
}

export default Accounts
