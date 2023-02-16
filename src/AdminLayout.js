import React,{useEffect, useState} from 'react';
import { Outlet ,Navigate, useLocation,useHistory} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { AddAdmin } from './Component/AdminEnd/AdominDashboard/AdminRedux';
import axios from "axios";
import { toast,ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Typewriter } from 'react-simple-typewriter';
import { useGetUsersQuery,selectUserTotal,UserSlice } from './Component/AdminEnd/AdominDashboard/UserSlice';

const AdminLayout = () => {
  const { getUsers}=useGetUsersQuery()
  const [show,setShow]=useState(false)
  const [result,setResult]=useState(false)
  const [UserData,setUserData]=useState(false)
  const dispatch=useDispatch();
  const token=localStorage.token;
 const Url="https://e-comerce-node.vercel.app/admin/getdashboard"
  const Location= useLocation();
  const fetchDashboard= async ()=>{
    try{
      if(token){
         await axios.get(Url, {headers:{
          "Authorization" :`Bearer ${token}`,
          "Accept":"application/json",
          "Content-Type":"application/json",
        }}).then(res=>{
          if(res.data?.status){
            const user=res.data.user;
            delete user.password;
           dispatch(AddAdmin(user))
             setShow(true)
          }else{
            toast.error(res.data.message);
            setResult(true);
            localStorage.removeItem("token")
          }
         
        }).catch(err=>{
          console.log(err.message)
        })
      }

    }catch(err){

    }
  }



  const fetchUsers= async ()=>{
    try{
      let result= await dispatch(UserSlice.endpoints.getUsers.initiate())
      if(result.status=="fulfilled"){
        setUserData(true)
      }

    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(()=>{
    fetchDashboard()
    fetchUsers();
  },[])

  const Loading = () => {
    return (
        <div style={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "25px" }}>
            Please wait<Typewriter loop={50}
                words={["..........", "..........", "..........", "..........", "..........", "..........", "..........", "..........", ".........."]}
                delaySpeed={1000} />
        </div>
    )
}
  
  return (
    <> 
    {token?show&&UserData?(<Outlet/>):(<><Loading/> {result? <Navigate to="/admin/login" state={{from:Location}} replace/>:""}</>):<Navigate to="/admin/login" state={{from:Location}} replace/>}
    <ToastContainer/>
    </>
  )
}

export default AdminLayout