import React, { useState,useEffect } from 'react'
import Styled from "styled-components"
import Navbar from '../NavbarComponent/Navbar'
import { Link } from "react-router-dom"
import { siginUp } from "../Api/index"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"

import { auth, provider } from "../App-config/App-config"
import { signInWithPopup } from "firebase/auth"
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux'
import { useFormik } from "formik";
import { selectUser } from './GoogleSlice'
import * as yup from "yup"

function GoogleVerified() {
    const [btnD, setBtnD]=useState(false)
    const navigate = useNavigate();
    const {detail:user}=useSelector(selectUser);
        const checkUser =()=>{
            if(!user){
                navigate("/user/register",{replace:true})
            }
        }
        useEffect(()=>{
            checkUser()

        },[])
    const formik = useFormik({
        initialValues: {
            phonenumber: "",
            password: "",
        },
        onSubmit: async (values)=>{
            setBtnD(true)
            const { data } = await axios.post(siginUp, {...values,...user})
            if (data.status) {
                localStorage.EcommercesUser = JSON.stringify(user.email);
                setBtnD(false);
                navigate("/user/verified");
            }
            else{
                setBtnD(false)
                toast.error(data.message)
            }
        },
        validationSchema:yup.object({  
            phonenumber:yup.number().required().min(11),
            password:yup.string().required(),
    
        })
    })
    return (<>
        <Navbar />
        <Container>
            <div className='father'>
                <div className='sub-father   px-3 '  >
                    <article className='text-center'> Add your Phone number and password</article>
                    <input type="text" className={`form-control border-0 border-bottom my-3 w-100  border-dark rounded-0 ${formik.touched?.phonenumber?formik.errors?.phonenumber? "is-invalid":"is-valid":""}`} onBlur={formik.handleBlur} placeholder='Phone number' name='phonenumber' onChange={formik.handleChange} />
                    <input type="text" className={`form-control border-0 border-bottom my-3 w-100  border-dark rounded-0 ${formik.touched?.password?formik.errors?.password? "is-invalid":"is-valid":""}`} onBlur={formik.handleBlur} placeholder='Password' name='password' onChange={formik.handleChange} />
                    <button className='btn  Register' disabled={btnD} onClick={formik.handleSubmit}>{ btnD? "Loading...":"Register"}</button>
                </div>

            </div>



        </Container>
        <ToastContainer />
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
    width:30%;
    @media screen and (max-width:1161px) and (min-width:958px){
        width:40%;
        .sub-father{
        .btn{
            width:50%
        }}
    }
    @media screen and (max-width:957px) and (min-width:819px){
        width:54%;
        .sub-father{
        .btn{
            width:50%
        }}
    }
    @media screen and (max-width:818px) and (min-width:538px){
        width:60%;
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
        padding-bottom:20px;
        input{
            height:50px;
            &::selection{
                outline:none !important;
                color:red;
            }
            &:focus{
                background-color:dodgerblue;
                outline:none !important;
                border-radius:10px;
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
        .Register{
            background-color: #2B6DC3;
            color:#FFFF; 
            border:1px solid;
            width:100%;
            transition:0.5s ease-in-out;
        }
        .Register:hover{
            background-color: #ffff;
            color:#2B6DC3; 
            border-color:#2B6DC3;
            
        }
    }
}
`

export default GoogleVerified