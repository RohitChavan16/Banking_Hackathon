import React from 'react'

import BalanceOverTime from '../../components/admin/BalanceOverTime'
import AdminTitle from '../../components/admin/AdminTitle';
import TotalBalance from '../../components/admin/TotalBalance';
import TransactionCategoryChart from '../../components/admin/TransactionCategoryChart';

const Dashboard = () => {
  return (
    <div>
      <AdminTitle text="Dashboard" description=""/>
      <div className="border flex m-3 max-md:flex-col rounded-2xl border-gray-400/70">
      <BalanceOverTime />
      <TransactionCategoryChart />
      <div className=" m-3 my-auto max-md:mb-3 ">
      <TotalBalance/>
      </div>
      </div>
    </div>
  )
}

export default Dashboard;
