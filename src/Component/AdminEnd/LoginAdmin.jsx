import React, { useState } from 'react'
import Styled from "styled-components"
import Navbar from '../NavbarComponent/Navbar'
import {Link} from "react-router-dom"
import { toast,ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {adminLogin} from "../Api/index"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { useFormik } from 'formik'
import * as yup from "yup"



function LoginAdmin() {
    const toastId=React.useRef(null)
    const [btnD,setBtnD]=useState(false)
    const navigate=useNavigate()
   
        const toastifyOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }
    const formik =useFormik({
        initialValues:{
            email:"",
            password:"",
        },onSubmit:(values)=>{
            setBtnD(true)
            axios.post(adminLogin,values).then((res)=>{
           if(res.data.status){
            localStorage.token=res.data.token;
            toast.success(res.data.message,toastifyOptions)
            navigate("/admin/dashboard")
           }else{
            setBtnD(false)
            toast.error(res.data.message,toastifyOptions)
           }

        })
        },
        validationSchema:yup.object({
            email:yup.string().required("Email or  Phone Number is required"),
            password:yup.string().required("Password is required")
        })
    })
    
   
    React.useEffect(()=>{
        if(formik.errors.email){
            if(!toast.isActive(toastId.current)){
            toast.error(formik.errors.email,toastifyOptions)
            }
        }

    },[formik.errors.email])
    React.useEffect(()=>{
        if(formik.errors.password){
            if(!toast.isActive(toastId.current)){
            toast.error(formik.errors.password,toastifyOptions)
            }
        }
    },[formik.errors.password])
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(formik.values.email==="" && formik.values.password===""){
            toast.warning("Kindly fill the form",toastifyOptions)
    
        }else{

            formik.handleSubmit()
        }
     
    }
return (<>
        <Navbar/>
        <Container>

            <div className='father'>
                <div className='text-center some'>
                   Admin Login
                </div>
                <form className='sub-father' onSubmit={(e)=>handleSubmit(e)}>
                   
                    <input type="text" className={!formik.touched.email ? "form-control " : formik.errors.email ? "form-control is-invalid " : "form-control is-valid"} placeholder='Email Address or Phone number' name='email' onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
                    <input type="text" placeholder='Password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur}  className={!formik.touched.password ? "form-control mt-4 mb-2 " : formik.errors.password? "form-control is-invalid mt-4 mb-2" : "form-control is-valid mt-4 mb-2"} />
                    <article>Don't have account <Link to="/admin/register">Register</Link></article>
                    <button className='btn btn-primary mt-2' type='submit' disabled={btnD} >{ btnD?`Loading....`:`Login`}</button>
                </form>

            </div>
        </Container>
        <ToastContainer/>
    </>
    )
}
const Container = Styled.div`
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
        .btn{
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
        p{
            color:black;
            font-size:15px;
            margin-bottom:0px;
            -webkit-text-stroke:1px black;
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
        p{
            font-size:14px;
            padding:8px 0px;
            a{
                text-decoration:none;
            }
        }
        .btn{
            background-color: #2B6DC3;
            color:#FFFF; 
            border:1px solid;
            width:100%;
            transition:0.5s ease-in-out;
        }
        .btn:hover{
            background-color: #ffff;
            color:#2B6DC3; 
            border-color:#2B6DC3;
            transform:scale(1.009)
            
        }
    }
}
`

export default LoginAdmin