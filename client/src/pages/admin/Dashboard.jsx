import React from 'react'

import BalanceOverTime from '../../components/admin/BalanceOverTime'
import AdminTitle from '../../components/admin/AdminTitle';

const Dashboard = () => {
  return (
    <div>
      <AdminTitle text="Dashboard" description=""/>
      <BalanceOverTime />
    </div>
  )
}

export default Dashboard;
