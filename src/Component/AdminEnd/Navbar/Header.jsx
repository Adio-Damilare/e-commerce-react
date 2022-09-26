import React, { Children, useState } from 'react'
import styled from 'styled-components'
import{
  FaTh,FaBars,FaUserAlt,FaRegChartBar,FaCommentAlt,FaShoppingBag,FaThList
} from "react-icons/fa"
import { NavLink, Link} from 'react-router-dom'
 import {BsHouse} from  "react-icons/bs"
 import {FaRegUser} from "react-icons/fa"
const Header = () => {
  const [isOpen,setIsOpen] =useState(true);
  const toggle=()=>setIsOpen(!isOpen);
  const menuItems=[
    {
      name:"Dashboard",
      link:"/admin/Dashboard/",
      icon:<BsHouse/>
    },
    {
      name:"Profile",
      link:"/admin/dashboard/Profile",
      icon:<FaUserAlt/>
    },
    {
      name:"Admins",
      link:"/admin/dashboard/admins",
      icon:<FaRegChartBar/>
    },
    {
      name:"Users",
      link:"/admin/dashboard/userlist",
      icon:<FaRegUser/>
    },
    {
      name:"Products",
      link:"/Admin/dashboard/Product",
      icon:<FaShoppingBag/>
    },
    {
      name:" Upload Product ",
      link:"/admin/dashboard/uploadproduct",
      icon:<FaThList/>
    },

  ]
  return (
    <>
    <Container
       style={{width:isOpen? "220px": "50px"}} className='siderbar'>
      <div className='top_section'>
        <Link to="/"  style={{display:isOpen? "block": "none"}} className='logo'>DARUZ</Link>
        <div style={{marginLeft:isOpen? "50px": "0px",cursor:"pointer"}} className='bars '>
          <FaBars onClick={toggle}/>
        </div>
      </div>
        {
          menuItems.map((items,index)=>(
            <NavLink to={items.link} key={index} className="link" activeclassname="active">
                  <div className="icon">{items.icon}</div>
                  <div style={{display:isOpen? "block": "none"}} className="text_link">{items.name}</div>
            </NavLink>
          ))
        }
    
      
    </Container>
    
    </>
  )
}
const Container=styled.div`
    background-color:#000;
    color:#fff;
    height:100Vh;
    width:220px;
    transition: 0.5s ease-in-out;
  .top_section{
    display:flex;
    align-items:center;
    padding:20px 15px;
    .logo{
      font-size:30px;
      text-decoration:none;
      color:white;
    }
    .bars{
      font-size:25px;
      display:flex;
      margin-left:50px;
    }
  }
.link{
  text-decoration:none;
  display:flex;
  color:#fff;
  padding:10px 15px;
  gap:15px;
  transition: 0.5s ease-in-out;
  .icon, .link_text{
    font-size:20px;
  }
}
.link:hover{
  background-color:lightskyblue;
  color:#000;
  transition:all 0.5s;
}
.active{
  background-color:lightskyblue;
  color:#000;
  transition:all 0.5s;
}
@media screen and  (max-width:750px) and  (min-width:8px){
  display:none;
}

`

export default Header