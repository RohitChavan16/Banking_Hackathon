import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import ContactUs from './pages/ContactUs';
import UserLogin from './pages/UserLogin';
import LocateUs from './pages/LocateUs';
import EmailVerify from './pages/EmailVerify';
import HomePage from './pages/HomePage';
import Layout from './pages/Admin/Layout';
import Dashboard from './pages/Admin/Dashboard';
import Accounts from './pages/Admin/Accounts';
import MyDetails from './pages/Admin/MyDetails';
import PaymentTransfer from './pages/Admin/PaymentTransfer';
import Transactions from './pages/Admin/Transactions';
import HelpSupport from './pages/Admin/HelpSupport';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const isAdminRoute = path.startsWith('/admin') || path === '/login' || path === '/email-verify' || path === '/reset-password';
 

  return (
    <div className="">
      < Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
         <Route path = '/' element = {<HomePage/>} />
         <Route path = '/about-us' element = {<AboutUs/>} /> 
         <Route path = '/careers' element = {<Careers/>} />
         <Route path = '/contact-us' element = {<ContactUs/>} />
         <Route path = '/login' element = {<UserLogin/>} />
         <Route path = '/email-verify' element = {<EmailVerify/>} />
         <Route path = '/locate-us' element = {<LocateUs/>} />
         
         <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path="accounts" element={<Accounts/>} />
          <Route path="my-details" element={<MyDetails/>} />
          <Route path="help-support" element={<HelpSupport/>} />
          <Route path="payment-transfer" element={<PaymentTransfer/>} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
       {!isAdminRoute && < Footer />}
    </div>
  )
}

export default App;
