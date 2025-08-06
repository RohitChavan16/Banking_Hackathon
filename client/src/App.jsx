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
import PaymentTransfer from './pages/admin/Payment/PaymentTransfer';
import Transactions from './pages/Admin/Transactions';
import HelpSupport from './pages/Admin/HelpSupport';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import ManageCards from './pages/admin/ManageCards';
import LoanEmi from './pages/admin/LoanEmi';
import PersonalPayment from './pages/admin/Payment/PersonalPayment';
import SelectNewAccount from './pages/OpenAccount/SelectNewAccount';
import CurrentAccount from './pages/OpenAccount/CurrentAccount';
import SavingAccount from './pages/OpenAccount/SavingAccount/SavingAccount';
import BasicSaving from './pages/OpenAccount/SavingAccount/BasicSaving';
import CustomerRegistration from './pages/OpenAccount/SavingAccount/CustomerRegistration';
import DocumentsVerification from './pages/OpenAccount/SavingAccount/DocumentsVerification';
import AddressVerification from './pages/OpenAccount/SavingAccount/AddressVerification';
import PersonalDetails from './pages/OpenAccount/SavingAccount/PersonalDetails';
import NomineeDetails from './pages/OpenAccount/SavingAccount/NomineeDetails';
import OtherBankingServices from './pages/OpenAccount/SavingAccount/OtherBankingServices';
import SubmitNewAccountForm from './pages/OpenAccount/SavingAccount/SubmitNewAccountForm';

function App() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const isAdminRoute = path.startsWith('/admin') || path === '/login' || path === '/email-verify' || path === '/reset-password' || path === '/new-account/basic-savings' || path === '/new-account/basic-savings/registration';
 

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
         
         <Route path="/new-account" >
          <Route index element={<SelectNewAccount />}/>
         <Route path = "saving-account" element = {<SavingAccount/>} />
         <Route path = "current-account" element = {<CurrentAccount/>} />
         <Route path="basic-savings" >
  <Route index element={<BasicSaving />} />
  <Route path="registration" element={<CustomerRegistration />} />
  <Route path="documents" element={<DocumentsVerification />} />
  <Route path="address" element={<AddressVerification />} />
  <Route path="personal-details" element={<PersonalDetails />} />
  <Route path="nominee" element={<NomineeDetails />} />
  <Route path="services" element={<OtherBankingServices />} />
  <Route path="submit" element={<SubmitNewAccountForm />} />
</Route>

        </Route>

         <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path="accounts" element={<Accounts/>} />
          <Route path="my-details" element={<MyDetails/>} />
          <Route path="help-support" element={<HelpSupport/>} />
          <Route path="payment-transfer" element={<PaymentTransfer/>} />
          <Route path="payment-transfer/personal" element={<PersonalPayment/>} />
          <Route path="loan-emi" element={<LoanEmi/>} />
          <Route path="manage-cards" element={<ManageCards/>} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
      </Routes>
       {!isAdminRoute && < Footer />}
    </div>
  )
}

export default App;
