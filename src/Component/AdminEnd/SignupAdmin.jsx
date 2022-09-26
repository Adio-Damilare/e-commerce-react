import React, { useState } from 'react'
import Styled from "styled-components"
import Navbar from '../NavbarComponent/Navbar'
import { Link } from "react-router-dom"
import { Toastify } from 'toastify'
import { adminSiginUp } from "../Api/index"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as yup from "yup";

function SignupPageAdmin() {
    const [btnD, setBtnD] = useState(false)
    const toastId = React.useRef(null)
    const toastifyOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    const navigate = useNavigate()
    const [values, setValues] = useState({
        fullname: "",
        email: "",
        phonenumber: "",
        password: "",
        confirmpassword: ""
    })
    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            phonenumber: "",
            password: "",
            confirmpassword: ""
        },
        onSubmit: async (values) => {
            console.log(values)
            if (values.password===values.confirmpassword) {
                setBtnD(true)
                const { data } = await axios.post(adminSiginUp, values)
                if (data.status) {
                    if (!toast.isActive(toastId.current)) {
                        toastId.current = toast.success(data.message, toastifyOptions)
                        navigate("/admin/login")
                    }
                }
                else {
                    setBtnD(false)
                    if (!toast.isActive(toastId.current)) {
                        toast.error(data.message, toastifyOptions)
                    }
                }
            }
            else {
                toast.error("Password and confirm must be the same", toastifyOptions)
            }

        },
        validationSchema: yup.object({
            fullname: yup.string().required().min(3),
            email: yup.string().required().email(),
            password: yup.string().required(),
            phonenumber: yup.number().min(11).required(),
            confirmpassword: yup.string().required().matches(),
        })
    })
  
    



    return (<>
        <Navbar />
        <Container>

            <div className='father'>
                <div className='text-center some'>
                    Admin Register
                </div>
                <form className='sub-father  px-3' onSubmit={formik.handleSubmit}>
                    <input type="text" className={`form-control border-0 border-bottom border-dark rounded-0   my-3 w-100 ${formik.touched.fullname ? formik.errors.fullname ? " is-invalid border- " : 'is-valid' : ""} `} placeholder='Fullname' name='fullname' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <input type="text" className={`form-control border-0 border-bottom border-dark rounded-0  my-3 w-100 ${formik.touched.email ? formik.errors.email ? " is-invalid border- " : 'is-valid' : ""}`} placeholder='Email Address' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <input type="text" className={`form-control border-0 border-bottom border-dark rounded-0  my-3 w-100 ${formik.touched.phonenumber ? formik.errors.phonenumber ? " is-invalid border- " : 'is-valid' : ""}`} placeholder='Phone number' name='phonenumber' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <input type="text" className={`form-control border-0 border-bottom border-dark rounded-0  my-3 w-100  ${formik.touched.password ? formik.errors.password ? " is-invalid border- " : 'is-valid' : ""}`} placeholder='Password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <input type="text" className={`form-control border-0 border-bottom border-dark rounded-0  my-3 w-100  ${formik.touched.confirmpassword ? formik.errors.confirmpassword ? " is-invalid border- " : 'is-valid' : ""}`} placeholder='confirm Password' name='confirmpassword' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <article>Already have an account <Link to="/admin/login">Login</Link></article>
                    <button className='btn my-3' disabled={btnD}>{btnD ? `Loading...` : `Register`}</button>
                </form>

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
                border-radius:10px !important;
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
            
        }
    }
}
`

export default SignupPageAdmin