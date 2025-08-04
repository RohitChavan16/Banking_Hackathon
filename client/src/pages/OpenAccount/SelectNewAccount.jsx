import React from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const SelectNewAccount = ({onStart}) => {

  const navigate = useNavigate();  

  const accountTypes = [
  {
    id: "saving-account",
    img: assets.savingaccount,
    title: "Savings Account",
    description: "Ideal for individuals to save and earn interest securely.",
  },
  {
    id: "current-account",
    img: assets.currentaccount,
    title: "Current Account",
    description: "Designed for businesses to manage daily transactions smoothly.",
  },
  {
    id: "student",
    img: assets.studentaccount,
    title: "Student Account",
    description: "Tailored for students with zero balance and exclusive offers.",
  },
  {
    id: "minor",
    img: assets.minoraccount,
    title: "Minor Account",
    description: "Manage your childs finances with parental control.",
  },
];



const relatedAccountActions = [
  {
    id: 'check-status',
    name: 'Check Application Status',
    icon: '📋',
    color: 'bg-blue-600',
    description: 'Track the status of your account opening request.',
  },
  {
    id: 'complete-kyc',
    name: 'Complete KYC',
    icon: '🆔',
    color: 'bg-green-600',
    description: 'Submit KYC documents if not already provided.',
  },
  {
    id: 'update-info',
    name: 'Update Personal Details',
    icon: '✏️',
    color: 'bg-yellow-600',
    description: 'Update your address, phone number or email easily.',
  },
  {
    id: 'download-forms',
    name: 'Download Account Forms',
    icon: '📄',
    color: 'bg-purple-600',
    description: 'Get forms related to nominee, FATCA, etc.',
  },
  {
    id: 'schedule-branch-visit',
    name: 'Schedule Branch Visit',
    icon: '📅',
    color: 'bg-red-500',
    description: 'Book an appointment for in-person document verification.',
  },
  {
    id: 'video-kyc',
    name: 'Video KYC',
    icon: '🎥',
    color: 'bg-indigo-600',
    description: 'Complete your KYC instantly via a secure video call.',
  },
  {
    id: 'nominee-details',
    name: 'Add Nominee',
    icon: '👨‍👩‍👧',
    color: 'bg-pink-500',
    description: 'Add or update a nominee for your account.',
  },
  {
    id: 'cancel-application',
    name: 'Cancel Application',
    icon: '❌',
    color: 'bg-gray-700',
    description: 'Cancel your application if submitted in error.',
  },
  {
    id: 'contact-support',
    name: 'Need Help?',
    icon: '📞',
    color: 'bg-cyan-700',
    description: 'Chat or call support for help with the application process.',
  },
];



  return (
   <div className="min-h-screen mt-20 px-6 py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Let’s Get You Started</h1>
        <p className="text-gray-600 mt-2">Opening an account takes less than 5 minutes.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {accountTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => navigate(`/new-account/${type.id}`)}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={type.img}
              alt={type.title}
              className="w-66 h-46 mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{type.title}</h3>
            <p className="text-sm text-gray-600">{type.description}</p>
          </div>
        ))}
      </div>


<div className="mt-16 max-w-5xl mx-auto">
  <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
    👀 Are you looking for something else?
  </h2>

  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {relatedAccountActions.map((action) => (
      <div
        key={action.id}
        onClick={() => navigate(`/account/${action.id}`)}
        className="cursor-pointer p-5 rounded-xl shadow-md hover:shadow-lg transition bg-white"
      >
        <div
          className={`text-3xl w-12 h-12 rounded-full flex items-center justify-center ${action.color} text-white mb-3`}
        >
          {action.icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">{action.name}</h3>
        <p className="text-sm text-gray-600">{action.description}</p>
      </div>
    ))}
  </div>
</div>


    </div>
  )
}

export default SelectNewAccount;
