import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Component/NavbarComponent/Navbar';
import Product from './Component/ProductComponent/SignleProduct';
import Slider from './Component/Slidercomponent/Slider';
import { Home } from './Component/Pages/Home';
import SignupPage from './Component/RegisterPagesForUsers/SignupPage';
import Verified from './Component/RegisterPagesForUsers/Verified';
import Sigin from './Component/RegisterPagesForUsers/Sigin';
import LostPage from './Component/LostPage';
import LoginAdmin from './Component/AdminEnd/LoginAdmin';
import SignupAdmin from './Component/AdminEnd/SignupAdmin';
import AdminDashboard from './Component/AdminEnd/AdominDashboard/AdminDashboard';
import Header from './Component/AdminEnd/Navbar/Header';
import BarChat from './Component/AdminEnd/AdominDashboard/BarChat';
import AdminProfile from './Component/AdminEnd/AdominDashboard/AdminProfiile';
import AdminProduct from './Component/AdminEnd/AdominDashboard/AdminProduct';
import Layout from './Layout';
import UploadProduct from './Component/AdminEnd/AdominDashboard/UploadProduct';
import AdminLayout from './AdminLayout';
import GoogleVerified from './Component/RegisterPagesForUsers/GoogleVerified';
import UserProfile from './Component/RegisterPagesForUsers/UserProfile';
import OrderList from './Component/RegisterPagesForUsers/OrderList';
import UserList from './Component/AdminEnd/AdominDashboard/UserList';
import UpdateGoods from './Component/AdminEnd/AdominDashboard/UpdateGoods';
import SingleProduct from './Component/ProductComponent/Product';
import UserLayout from './UserLayout';
import CheckOut from './Component/RegisterPagesForUsers/CheckOut';
import { Typewriter } from "react-simple-typewriter";
import { useSelector } from "react-redux";
import { SelectCurrentCart } from "./Component/NavbarComponent/CartRedux";
import {selectAll} from "./Component/ProductAction/ProductSlice"
import NavbarForAdmin from './Component/AdminEnd/AdominDashboard/NavbarForAdmin';
import Footer from './Component/RegisterPagesForUsers/Footer';
import AdminsName from './Component/AdminEnd/AdominDashboard/AdminsName';

function App() {
  const  store  = useSelector(selectAll);
  const Loading = () => {
    return (
      <div style={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" ,fontSize:"30px"}}>
        LOADING<Typewriter loop={50}
          words={["..........", "..........", "..........", "..........", "..........", "..........", "..........", "..........", ".........."]}
          delaySpeed={1000} />
      </div>
    )
  }
  return (
    <>{
      store&&store.length>0?
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='product' element={<Product />} />
          <Route path='product/:productId' element={<SingleProduct />} />

          {/* User Routes */}
          <Route path='user/' element={<Layout />}>
            <Route index element={<SignupPage />} />
            <Route path="register" element={<Navigate to="/user" replace />} />
            <Route path="signup" element={<Navigate to="/user" replace />} />
            <Route path='login' element={<Sigin />} />
            <Route path='sgnin' element={<Sigin />} />
            <Route path='verified' element={<Verified />} />
            <Route path='google/verified' element={<GoogleVerified />} />
            <Route path='profile' element={<UserLayout />}>
              <Route index element={<UserProfile />} />
              <Route path='orderlist' element={<OrderList />} />
              <Route path="checkout" element={store&&store.length>0?<CheckOut />:<Navigate to="/user/profile"/>} />
            </Route>
          </Route>

          {/* Admin Routes */}
          <Route path='admin/' element={<Layout />}>
            <Route index element={<SignupAdmin />} />
            <Route path='register' element={<Navigate to="/admin" replace />} />
            <Route path='login' element={<LoginAdmin />} />
            {/* Admin dashboard */}
            <Route path='dashboard/' element={<AdminLayout />} >
              <Route index element={<AdminDashboard />} />
              <Route path='product' element={<AdminProduct />} />
              <Route path='profile' element={<AdminProfile />} />
              <Route path='userlist' element={<UserList />} />
              <Route path='admins' element={<AdminsName/>} />
              <Route path='uploadproduct' element={<UploadProduct />} />
              <Route path='product/:id' element={<UpdateGoods />} />
            </Route>
          </Route>
        </Route>
        <Route path='/chart' element={<BarChat />} />
        <Route path='/*' element={<LostPage />} />
      </Routes>:
       <div ><Loading/> </div>
   

    } 
    </>
  );
}

export default App;
