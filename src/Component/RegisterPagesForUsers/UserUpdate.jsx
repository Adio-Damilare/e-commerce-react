import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useSelector ,useDispatch} from "react-redux";
import { EditUser, AddCurrentUser } from './UserRedux';
import { SelectCurrentUser } from "./UserRedux";
import * as yup from "yup";
import {updateChange} from "../Api/index"
// import {AddU}
const toastifyOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
}
const UserUpdate = () => {
    const dispatch=useDispatch();
    const { User } = useSelector(SelectCurrentUser);
    const [disableBtn,setDisAbleBtn]=useState(false)
    const formik = useFormik({
        initialValues: {
            fullname: User.fullname,
            newEmail: User.email,
            phonenumber: "0"+ User.phonenumber,
            oldpassword:"",
            newpassword:"",
        },
        onSubmit: async (values,{resetForm})=>{
            try{
                setDisAbleBtn(true)
                let{fullname,phonenumber, newEmail}=values
                await axios.post(updateChange,{...values,email:User.email}).then(res=>{
                    if(res?.data?.status){
                    dispatch(EditUser({fullname,phonenumber,email:newEmail}))
                    toast.success(res.data.message)
                    resetForm({values:""})
                   localStorage.usertoken=res.data.token;
                }else{
                    toast.error(res.data.message)  
                }
                }) 
            }catch(err){
                console.log(err.message)
            }finally{
                setDisAbleBtn(false)
            }
        },
        validationSchema:yup.object({
            fullname:yup.string().required().min(3),
            newEmail:yup.string().email().required(),
            phonenumber:yup.number().required().min(11),
            oldpassword:yup.string().required().min(5),
            newpassword:yup.string().required().min(5)


        })

    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        formik.handleSubmit();

    }

    return (
        <>
            <Container>

                <div className='father'>
                    <article className='text-center mb-2'>PROFILE SETTING</article>
                    <form className='sub-father' onSubmit={(e)=>handleSubmit(e)}>
                        <div className='d-flex'>
                            <div className='w-100'>
                                <label className='text-center d-block' htmlFor='fullname'>Change fullname</label>
                                <input type="text" value={formik.values.fullname} onBlur={formik.handleBlur} onChange={formik.handleChange} className={`form-control border border-1 w-100  rounded-0 border-primary mb-3 w-50  ${formik.touched.fullname?formik.errors.fullname?"is-invalid":"is-valid":" "}`} id='fullname' name='fullname' />
                            </div>

                        </div>
                        <div className='jobo'>
                            <div className='sonOfJobo'>
                                <label className='text-center w-100'>change email</label>
                                <input type="text" value={formik.values.newEmail} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`form-control border border-1 w-100 rounded-0 border-primary mb-3 w-50 ${formik.touched.newEmail?formik.errors.newEmail?"is-invalid":"is-valid":" "}`} placeholder='' name='newEmail' />
                            </div>
                            <div className='sonOfJobo'>
                                <label className='text-center w-100'>change phone number</label>
                                <input type="text" value={formik.values.phonenumber} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`form-control border border-1  w-100 rounded-0 border-primary mb-3 w-50 ${formik.touched.phonenumber?formik.errors.phonenumber?"is-invalid":"is-valid":" "}`} placeholder='' name='phonenumber' />
                            </div>
                        </div>
                        <div className='d-block'>
                            <label className='text-center w-100'> Change Password</label>
                            <div className='d-flex'>
                                <input type="text" name="oldpassword" className={`form-control border border-1 rounded-0 border-primary mb-3 w-50 ${formik.touched.oldpassword?formik.errors.oldpassword?"is-invalid":"is-valid":" "}`} value={formik.values.oldpassword} placeholder='Old password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                <input type="text" className={`form-control border border-1 rounded-0 border-primary mb-3 w-50  ${formik.touched?.newpassword?formik.errors?.newpassword?"is-invalid":"is-valid":" "}`} placeholder='New password' value={formik.values.newpassword} name='newpassword' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                            </div>
                        </div>
                        <button className='btn btn-success w-100' type='submit'  disabled={disableBtn}>update</button>

                    </form>

                </div>

                
            </Container>
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
background-color:rgb(255,254,252);
width:100%;
.father{
    width:100%;
    .jobo{
        display:flex;
        gap:5px;
        .sonOfJobo{
            width:50%;
        }
    }
    @media screen and (max-width:898px) {
        .jobo{
            display:block;
            .sonOfJobo{
                width:100%;
            }
        }
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
            margin:10px;
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
export default UserUpdate