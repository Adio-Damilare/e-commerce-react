import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { UserLogin } from './Component/NavbarComponent/CartRedux';
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import axios from 'axios';
import { AddCurrentUser,SelectCurrentUser } from './Component/RegisterPagesForUsers/UserRedux';
import { Typewriter } from 'react-simple-typewriter';

const Layout = () => {
  const navigate = useNavigate();
  const [Log, setLog] = useState(false)
  const {loginState}=useSelector(SelectCurrentUser)
  const dispatch = useDispatch();
  const token = localStorage.usertoken;
  const Url = "https://e-comerce-node.vercel.app/user/getdashboard"
  let direction = JSON.parse(localStorage.getItem("logindirection"));
  const fetchDashboard = async () => {
    try {
      if (token&&!loginState) {
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
          } else {
            localStorage.removeItem("usertoken")
          }

        }).catch(err => {
          console.log(err.message)
        })
      }
    } catch (err) {
      console.log(err.message)
    }finally{
      setLog(true)
    }
    
  }
  useEffect(() => {
    fetchDashboard()
  }, [])

  const IsLoading = () => {
    return (
      <div style={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" ,fontSize:"30px"}}>
        LOADING<Typewriter loop={50}
          words={["..........", "..........", "..........", "..........", "..........", "..........", "..........", "..........", ".........."]}
          delaySpeed={1000} />
      </div>
    )
  }
  return (<>{
    token ? Log ? <><Outlet/> </>:<><IsLoading/> </> : <Outlet />
  }
  </>

  )
}

export default Layout