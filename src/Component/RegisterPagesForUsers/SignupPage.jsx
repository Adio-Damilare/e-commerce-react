import React, { useState } from 'react'
import Styled from "styled-components"
import Navbar from '../NavbarComponent/Navbar'
import { Link } from "react-router-dom"
import { siginUp } from "../Api/index"
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { addUser } from './GoogleSlice'
import { auth, provider } from "../App-config/App-config"
import { signInWithPopup } from "firebase/auth"
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik";
import * as yup from "yup"

function SignupPage() {
    const [btnD, setBtnD] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            phonenumber: "",
            password: "",
            confirmpassword: ""
        },
        onSubmit: async (values,{resetForm}) => {
            setBtnD(true)
            if (values.password === values.confirmpassword) {
                const { data } = await axios.post(siginUp, values)
                if (data.status) {
                    localStorage.EcommercesUser = JSON.stringify(values.email)
                    navigate("/user/verified")

                }
            }
            else {
                setBtnD(false)
                toast.error("Password and comfirm password must be the same")
            }


        },
        validationSchema: yup.object({
            fullname: yup.string().required().min(3),
            email: yup.string().required().email(),
            phonenumber: yup.number().required().min(11),
            password: yup.string().required(),
            confirmpassword: yup.string().required()
        })
    })

    const SignupWithGoogle = async () => {
        signInWithPopup(auth, provider).then((result) => {
            if (result?.user?.displayName) {
                try {
                    dispatch(addUser({ fullname: result.user.displayName, email: result.user.email, }));
                    navigate("/user/google/verified");
                } catch (err) {

                }

            }

        })
    }
    return (<>
        <Navbar />
        <Container>

            <div className='father'>
                <div className='text-center some'>
                    Register
                </div>
                <div className='sub-father   px-3 '  >

                    <input type="text" className={`form-control border-0 border-bottom my-3 w-100  border-dark  rounded-0 ${formik.touched?.fullname ? formik.errors?.fullname ? "is-invalid" : "is-valid" : ""}`} onBlur={formik.handleBlur} placeholder='Fullname' name='fullname' onChange={formik.handleChange} />
                    <input type="text" className={`form-control border-0 border-bottom my-3 w-100  border-dark rounded-0 ${formik.touched?.email ? formik.errors?.email ? "is-invalid" : "is-valid" : ""}`} onBlur={formik.handleBlur} placeholder='Email Address' name='email' onChange={formik.handleChange} />
                    <input type="text" className={`form-control border-0 border-bottom my-3 w-100  border-dark rounded-0 ${formik.touched?.phonenumber ? formik.errors?.phonenumber ? "is-invalid" : "is-valid" : ""}`} onBlur={formik.handleBlur} placeholder='Phone number' name='phonenumber' onChange={formik.handleChange} />
                    <input type="text" className={`form-control border-0 border-bottom my-3 w-100  border-dark rounded-0 ${formik.touched?.password ? formik.errors?.password ? "is-invalid" : "is-valid" : ""}`} onBlur={formik.handleBlur} placeholder='Password' name='password' onChange={formik.handleChange} />
                    <input type="text" className={`form-control border-0 border-bottom my-3 w-100  border-dark rounded-0 ${formik.touched.confirmpassword ? formik.errors.confirmpassword ? "is-invalid" : "is-valid" : ""}`} onBlur={formik.handleBlur} placeholder='confirm Password' name='confirmpassword' onChange={formik.handleChange} />
                    <article>Already have an account <Link to="/user/login">Login</Link></article>
                    <button className='btn  Register' onClick={formik.handleSubmit} disabled={btnD}>{btnD ? "Loading..." : "Register"}</button>
                    <article className='text-center w-100'>or</article>

                    <button className='btn w-100 text-center  bg-info text-light' onClick={SignupWithGoogle} style={{ fontSize: "18px" }}><FcGoogle /> Signup with google</button>
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

export default SignupPage