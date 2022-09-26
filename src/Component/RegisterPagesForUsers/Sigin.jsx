import React, { useState ,useEffect} from 'react'
import Styled from "styled-components"
import Navbar from '../NavbarComponent/Navbar'
import {Link} from "react-router-dom"
import { toast,ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {signIn} from "../Api/index"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { useFormik } from 'formik'
import * as yup from "yup";
import { useDispatch } from 'react-redux'
import {LoginState} from "./UserRedux" 

function SignupPage() {
    const dispatch=useDispatch();
    const [send,setSend]=useState(false)
    const navigate=useNavigate()
        const toastifyOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }
    const fetchUserEmail= async()=>{
        let user= await localStorage.EcommercesUser
            if(user){
                navigate("/user/verified")
            }
    }
useEffect(() => {
    fetchUserEmail()
    }, [])
    
    const formik =useFormik({
        initialValues:{
            email:"",
            password:"",
        },onSubmit:(values)=>{
            setSend(true)
            axios.post(signIn,values).then((res)=>{
                if(res.data.status){
                    let user=res.data.token;
                    console.log(user);
                   localStorage.usertoken=user;
                    toast.success(res.data.message,toastifyOptions)
                    dispatch(LoginState() )
                    navigate("/user/profile")
                    setSend(false)
                }else{
                    toast.error(res.data.message,toastifyOptions)
                    setSend(false)
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
            toast.error(formik.errors.email,toastifyOptions)
        }
        if(formik.errors.password){
            toast.error(formik.errors.password,toastifyOptions)
        }
    },[formik.errors])
    
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
                    Login
                </div>
                <form className='sub-father' onSubmit={(e)=>handleSubmit(e)}>
                    <input type="text" className={!formik.touched.email ? "form-control " : formik.errors.email ? "form-control is-invalid " : "form-control is-valid"} placeholder='Email Address or Phone number' name='email' onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
                    <input type="text" placeholder='Password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur}  className={!formik.touched.password ? "form-control mt-4 mb-2 " : formik.errors.password? "form-control is-invalid mt-4 mb-2" : "form-control is-valid mt-4 mb-2"} />
                    <article>Don't have account <Link to="/user/register">Register</Link></article>
                    <button className='btn nt-3' type='submit' disabled={send} >Login</button>
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
            padding:8px 0;
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

export default SignupPage