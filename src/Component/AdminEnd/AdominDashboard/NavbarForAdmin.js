import React from 'react'
import styled from 'styled-components'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut } from './AdminRedux';
import Header from '../Navbar/Header';
import {
  FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag, FaThList
} from "react-icons/fa"
import { NavLink, Link } from 'react-router-dom'
import { BsHouse } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"
import {AdminState} from "./AdminRedux"

const NavbarForAdmin = () => {
  const menuItems = [
    {
      name: "Dashboard",
      link: "/admin/Dashboard/",
      icon: <BsHouse />
    },
    {
      name: "Profile",
      link: "/admin/dashboard/Profile",
      icon: <FaUserAlt />
    },
    {
      name: "Admins",
      link: "/admin/dashboard/admins",
      icon: <FaRegChartBar />
    },
    {
      name: "Users",
      link: "/admin/dashboard/userlist",
      icon: <FaRegUser />
    },
    {
      name: "Products",
      link: "/Admin/dashboard/Product",
      icon: <FaShoppingBag />
    },
    {
      name: " Upload Product ",
      link: "/admin/dashboard/uploadproduct",
      icon: <FaThList />
    },

  ]
  const {detail}=useSelector(AdminState)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogOutf = () => {
    dispatch(LogOut())
    localStorage.removeItem("token");
    navigate("/admin/login")
  }
  return (
    <>
      <Container>
        <div className='w-100 d-flex pt-3'>
          <div className="container-fluid d-flex ">
            <input type="search" className='form-control ' />
            <button className='btn'>Logout</button>
          </div>
          <button className='btn' onClick={LogOutf}>Logout</button>
        </div>
      </Container>
      <Contain2>
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
           <Link to="/" className='textdecoration'>DARUZ</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end background" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div class="offcanvas-header d-flex align-items-end">
                <article>{detail.fullname}</article>
                <button type="button" class="btn-close text-reset btn-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body ">
                {
                  menuItems.map((items, index) => (
                    <NavLink to={items.link} key={index} className="link" activeclassname="active">
                      <div className="icon">{items.icon}</div>
                      <div className="text_link">{items.name}</div>
                    </NavLink>
                  ))
                }
              </div>
            </div>
          </div>
        </nav>
      </Contain2>

    </>
  )
}
const Container = styled.div`

@media screen and  (max-width:750px) and  (min-width:8px){
  display:none;
}
`

const Contain2 = styled.div`
display:none;
position:sticky;
z-index:888888;
top:0pc;
@media screen and  (max-width:750px) and  (min-width:8px){
  display:block;
}
.textdecoration{
  text-decoration:none;
  font-size:28px;
  color:black;
  font-weight:300;
}
.background{
  background-color:#000;
  z-index:888888;

  .offcanvas-header{
    article{
      color:#ffff;
      font-size:25px;
    }
    .btn-close{
      background-color:#ffff;
    }
  }
  .offcanvas-body{
    gap:40px !important;
  
    .link{
      gap:10px;
      display:flex;
      font-size:20px;
      margin-top:30px;
      color:white;
      padding:13px 0px 13px 10px;
      text-decoration:none;
      &:hover{
      background-color:lightskyblue;
      color:#000;
      transition:all 0.5s;
      }
    }
    
    .active{
      background-color:lightskyblue;
      color:#000;
      transition:all 0.5s;
    }
  }
}

`

export default NavbarForAdmin