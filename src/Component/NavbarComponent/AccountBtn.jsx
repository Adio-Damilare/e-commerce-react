import React, { useState } from 'react'
import { VscAccount } from "react-icons/vsc"
import styled from 'styled-components';
import { Link } from "react-router-dom"
import { useSelector ,useDispatch} from 'react-redux';

import { SelectCurrentUser,UserLogOut } from '../RegisterPagesForUsers/UserRedux';
const AccountBtn = () => {
  const dispatch=useDispatch();
  const [tainer, setContainer] = useState(false)
  const { User } = useSelector(SelectCurrentUser)
  const [fullname,setFulname]=useState(User&&User?.fullname)
  const toggle=()=>setContainer(!tainer)
  return (<>

    {/* <button className="btn contact" onClick={() => setContainer(!container)}><VscAccount /> <span>{User? `${User.fullname.substring(0,2)}`: ""} </span></button> */}
    <button className="btn contact" onClick={toggle}><VscAccount /> <span>{User? `${fullname.substring(0,7)}...`: "account"} </span></button>
    {tainer && (
      <Container className='rounded rounded-3'>
        {
          User ? <>
          <Link  className='btn reall' to="/user/profile">Profile</Link>
            <Link  className='btn reall login' onClick={()=>dispatch(UserLogOut())} to="/user/login">Logout</Link>
          </> : <>
          <Link  className='btn reall' to="/user">Register</Link>
          <Link  className='btn reall login' to="/user/login">Login</Link>
          </>
        }

      </Container>)}
  </>
  )
}
const Container = styled.div`
position:absolute;
background-color:dodgerblue;
padding:5px;
justify-content:space-between;
top:4rem;
transition: 05ms ease-in-out;
right:14rem;
display:flex;
width:200px;
flex-direction:column;
@media screen and (max-width:1302px) and (min-width:1270px){
right:16.4rem;
}
@media screen and (max-width:1269px) and (min-width:1170px){
right:15rem;
}
@media screen and (max-width:1169px) and (min-width:1002px){
right:12.7rem;
}
@media screen and (max-width:1001px) and (min-width:950px){
right:10rem;
}
@media screen and (max-width:959px) and (min-width:914px){
right:9rem;
}
@media screen and (max-width:913px) and (min-width:820px){
right:8.3rem;
}
@media screen and (max-width:819px) and (min-width:799px){
right:14.4rem;
}
@media screen and (max-width:798px) and (min-width:772px){
right:14rem;
}
@media screen and (max-width:771px) and (min-width:752px){
right:13rem;
}
@media screen and (max-width:751px) and (min-width:698px){
right:12.2rem;
}
@media screen and (max-width:697px) and (min-width:648px){
right:11.3rem;
}
@media screen and (max-width:647px) and (min-width:630px){
right:10rem;
}
@media screen and (max-width:629px) and (min-width:616px){
right:13.5rem;
}
@media screen and (max-width:615px) and (min-width:590px){
right:13rem;
}
@media screen and (max-width:589px) and (min-width:564px){
right:12rem;
}
@media screen and (max-width:563px) and (min-width:520px){
right:11rem;
margin-top:5px;
}
@media screen and (max-width:519px) and (min-width:52px){
right:0rem;
margin-top:5px;
width:100%;
}

.reall{
    background-color:#ffff;
    
    .login{
      margin-top:10px !important;
    }
}
`

export default AccountBtn