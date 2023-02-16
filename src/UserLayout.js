import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddCurrentUser } from "./Component/RegisterPagesForUsers/UserRedux"
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { UserLogin, } from './Component/NavbarComponent/CartRedux';
import { Typewriter } from 'react-simple-typewriter';
import { useSelector } from 'react-redux';
import { UserLogOut } from './Component/RegisterPagesForUsers/UserRedux';

const UserLayout = () => {
  const [show, setShow] = useState(false)
  const [result, setResult] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.usertoken;
  const Url = "https://e-comerce-node.vercel.app/user/getdashboard"
  const Location = useLocation();
  let direction = JSON.parse(localStorage.getItem("logindirection"));
  const fetchDashboard = async () => {
    try {
      if (token) {
        await axios.get(Url, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        }).then(res => {
          if (res.data?.status) {
            let user = res.data.user;
            delete user.password;
            dispatch(AddCurrentUser(user));
            let { order } = user;
            dispatch(UserLogin(order))
            if (direction) {
              if (direction == "checkoutd") {
                localStorage.removeItem("logindirection")
                navigate("/user/profile/checkout");
              }
            }
            setShow(true)
          } else {
            toast.error(res.data.message);
            setResult(true);
            localStorage.removeItem("usertoken");
            dispatch(UserLogOut())
          }

        }).catch(err => {
          console.log(err.message)
        })
      }

    } catch (err) {

    }
  }
  useEffect(() => {
    fetchDashboard()
  }, [])
  
  const IsLoading = () => {
    return (
      <div style={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" ,fontSize:"25px"}}>
        Please wait<Typewriter loop={50}
          words={["..........", "..........", "..........", "..........", "..........", "..........", "..........", "..........", ".........."]}
          delaySpeed={1000} />
      </div>
    )
  }

  return (
    <>
      {token ? show ? (<Outlet />) : (<><IsLoading /> {result ? <Navigate to="/user/login" state={{ from: Location }} replace /> : ""}</>) : <Navigate to="/user/login" state={{ from: Location }} replace />}
      <ToastContainer />
    </>
  )
}

export default UserLayout