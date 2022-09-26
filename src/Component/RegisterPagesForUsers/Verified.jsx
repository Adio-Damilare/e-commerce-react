import axios from 'axios'
import React, {useEffect,useState} from 'react'
import styled from 'styled-components'
import Navbar from '../NavbarComponent/Navbar'
import { verified ,resend} from '../Api'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
const toastifyOptions={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
}
const Verified = () => {
const [btnD,setBtnD]=useState(true)
const [email,setEmail]=useState("")
const [value,setValue]=useState("")
const [disabledBtn,setdisabledBtn]=useState(true)
const navigate=useNavigate();
const fetchUserEmail= async()=>{
    let user= await localStorage.EcommercesUser
        if(!user){
            navigate("/user/register")
        }else{
            
            setEmail(JSON.parse(localStorage.EcommercesUser))
        }
}
useEffect(()=>{
    fetchUserEmail()    
},[])
useEffect(()=>{  
    if(value.length>=5){
        setdisabledBtn(false)
    }else{
        setdisabledBtn(true)
    }
},[value])


    const handleSubmit=(e)=>{
        e.preventDefault()
        setdisabledBtn(true)
        setBtnD(false)
        axios.post(`${verified}/${email}`,{value}).then((res)=>{
            
            if(res.data.status){
                toast.success(res.data.message,toastifyOptions)
                localStorage.removeItem("EcommercesUser")
                navigate("/")
            }else{
                setdisabledBtn(false)
                setBtnD(true)
                toast.error(res.data.message,toastifyOptions)
            }
        }).catch((err)=>{
            console.log(err)
        })
        
    }
    const handleResend=()=>{
        axios.get(`${resend}/${email}`).then((res)=>{
            if(res.data.status){
                toast.success(res.data.message,toastifyOptions)
            }else{
                toast.error(res.data.message,toastifyOptions)
            }
        })
    }
  return (
    <>
    <Navbar/>
    <Container>

    <div className='father'>
        <div className='text-center some'>
            Verify Email
        </div>
        <article style={{fontSize:"13.5px"}}>Kindly Enter the token sent to <span className='text-primary cursor-pointer' style={{cursor:"pointer"}}>{email}</span> or
            <div className=' btn  border-0 text-primary'  onClick={handleResend}>resend</div></article>
        <form className='sub-father' onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" maxLength={5} className='form-control border border-1 border-primary mb-3 w-100' placeholder='verified' name='verified' onChange={(e) =>setValue(e.target.value)} />

            <button className='btn verified ' disabled={disabledBtn} type='submit'>{btnD?  `Verify`:"Verifing..."}</button>
        </form>

    </div>
</Container>
<ToastContainer/>
</>
  )
}

const Container=styled.div`
display:flex;
height:90vh;
justify-content:center;
align-items:center;
background-color:rgb(255,254,252);
.father{
    width:27%;
    @media screen and (max-width:818px) and (min-width:538px){
        width:50%;
        .sub-father{
        .verified {
            width:50%
        }}
    }
    @media screen and (max-width:537px) and (min-width:8px){
        width:90%;
        .sub-father{
            .btn{
                width:50%
            }}

    }
    .some{
        font-size:40px;
        -webkit-text-stroke:1px  #2B6DC3;
        color:#fff;
    }
    p{
        font-size:13.7px;
        padding:0px 0;
        a{
            text-decoration:none;
        }
    }
    .sub-father{
        width:100%;
        input{
            height:50px;
            &::selection{
                outline:none !important;
                color:red;
            }
            &:focus{
                background-color:dodgerblue;
                outline:none !important;
                color:#ffff;
                transition:0.5s ease-in-out;
            }
        }
       
        .verified {
            background-color: #2B6DC3;
            color:#FFFF; 
            border:1px solid;
            width:100%;
            transition:0.5s ease-in-out;
        }
        .verified:hover{
            background-color: #ffff;
            color:#2B6DC3; 
            border-color:#2B6DC3;
            
        }
    }
}
`
export default Verified