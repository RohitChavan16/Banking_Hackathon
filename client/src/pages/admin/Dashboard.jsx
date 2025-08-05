import React from 'react'

import BalanceOverTime from '../../components/admin/BalanceOverTime'
import AdminTitle from '../../components/admin/AdminTitle';
import TotalBalance from '../../components/admin/TotalBalance';
import TransactionCategoryChart from '../../components/admin/TransactionCategoryChart';

const Dashboard = () => {
  return (
    <div className="mb-10">
      <AdminTitle text="Dashboard" description=""/>
      <div className="border flex m-3 p-1 gap-4 max-md:flex-col rounded-2xl border-gray-400/70">
      <BalanceOverTime />
      <TransactionCategoryChart />
      <div className=" m-3 my-auto max-md:mb-3 ">
      <TotalBalance/>
      </div>
      </div>

      





   

   <div className=" ml-190 max-md:mx-auto w-120 ">
        <div className="bg-blue-950 rounded-xl shadow-md p-6 space-y-4">
  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">🔗 Linked Services</h2>

  {/* Aadhaar Linking */}
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-700 dark:text-gray-200 font-medium">Aadhaar Linked</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Your Aadhaar is currently linked.</p>
    </div>
    <button className="px-4 py-1.5 cursor-pointer rounded-md bg-green-100 text-green-700 font-semibold text-sm hover:bg-green-200">
      Linked ✅
    </button>
  </div>

  {/* Mobile Linking */}
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-700 dark:text-gray-200 font-medium">Mobile Linked</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Mobile number ending with ****3210 is linked.</p>
    </div>
    <button className="px-4 py-1.5 cursor-pointer rounded-md bg-green-100 text-green-700 font-semibold text-sm hover:bg-green-200">
      Linked ✅
    </button>
  </div>

  {/* Net Banking */}
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-700 dark:text-gray-200 font-medium">Net Banking</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Access your bank account online securely.</p>
    </div>
    <button className="px-[19px] cursor-pointer py-[4px] rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700">
      Manage
    </button>
  </div>

  {/* Debit Card */}
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-700 dark:text-gray-200 font-medium">Debit Card</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Card ending with ****7890 is active.</p>
    </div>
    <button className="px-3 cursor-pointer text-[16px] py-[4px] rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700">
      View Card
    </button>
  </div>

  {/* UPI Linked */}
  <div className="flex justify-between items-center">
    <div>
      <p className="text-gray-700 dark:text-gray-200 font-medium">UPI Handles</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">rohit@mahabank, rohit16@ybl</p>
    </div>
    <button className="px-2 bg-amber-600 py-[5px] rounded-md text-[15px] text-gray-700 dark:text-white font-medium hover:bg-amber-600/90 cursor-pointer ">
      Manage UPI
    </button>
  </div>
</div>
</div>










    </div>
  )
}

export default Dashboard;
