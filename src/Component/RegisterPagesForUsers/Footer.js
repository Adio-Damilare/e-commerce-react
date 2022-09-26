import React from 'react';
import styled from 'styled-components';
import { ImWhatsapp } from "react-icons/im"
import { TbPhoneCall } from "react-icons/tb";
import { AiOutlineMail } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import { selectAll } from '../ProductAction/ProductSlice';
import { useFormik } from 'formik';
import { sendmessage } from '../Api';
import * as yup from "yup";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Footer = () => {
    const Goods = useSelector(selectAll)
    let shuffle = (array) => array.sort(() => Math.random() - 0.5);
    let result = shuffle(Goods);
    const [Toggle, setToggle]=React.useState(true)
    const [loading,setLoading]=React.useState(false)
    const [messageStatus,setmessageStatus]=React.useState(false)
    const [message,setmessage]=React.useState("")
    const Url="sendmessage"
    const formik=useFormik({
        initialValues:{
            fullname:"",
            email:"",
            message:""
        },
        onSubmit:(values)=>{
            try{
                setLoading(true)
                axios.post(sendmessage,{...values,Toggle}).then(res=>{
                    setmessageStatus(true);
                   setmessage(res.data.message);
                }).catch(err=>{
                    console.log(err.message)
                })

            }catch(err){
                console.log(err.message);
            }
        },
        validationSchema:yup.object({
            fullname:yup.string().min(3),
            email:Toggle? yup.string().email() : yup.number().min(11),
            message:yup.string().min(20)
        })
    })

    const finnally=()=>{
        setLoading(false);
        setmessageStatus(false);
        setmessage("")

    }
    return (
        <Container>
            <div className='slider-man' >
                <div className="slider-child" style={{ backgroundImage: `url(${result[1].image})` }}>
                    <article className="first">DO You need more tips?</article>
                    <article className="second">signup for free and get latest tips.</article>
                    <div className="third border border-1 border-success"><input type="text" placeholder="Your email" className="form-control" /> <button className="btn btn-success">Yes </button></div>
                </div>
            </div>
            <div className='father' >
                <div className='chidren'  >

                    <span><TbPhoneCall /></span>
                    <article>Call Us</article>
                    <article>09033948312</article>
                </div>
                <div className='chidren' onClick={()=>setToggle(false)}   data-bs-toggle="modal" data-bs-target="#messageModal" data-bs-whatever="@mdo">
                    <article>Message Us</article>
                    <button className='btn'><span><ImWhatsapp /></span></button>
                </div>
                <div className='chidren' onClick={()=>setToggle(true)}   data-bs-toggle="modal" data-bs-target="#messageModal" data-bs-whatever="@mdo">
                    <article>Send Us Mail</article>
                    <button className='btn '><AiOutlineMail /></button>
                </div>
            </div>

            <Link to="/admin/login" className='w-100' style={{padding:"30px 0px 20px 0px"}}> <button className='btn btn-primary'>Am an Admin </button> </Link>

            <div className="modal fade" id="messageModal" tabindex="-1" data-bs-backdrop="static"  aria-labelledby="messageModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="messageModalLabel">Your message</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                                {
                                    loading?<>{messageStatus?<div className='alert alert-success text-center' style={{fontSize:"23px"}}> {message}</div>:<>Loading.....</> }</>:
                           
                            <form>
                                <div className="mb-3">
                                    <label for="fullname" className="col-form-label">Your Fullname</label>
                                    <input type="text" className={`form-control ${formik.touched.fullname?formik.errors.fullname? "is-invalid":"is-valid":""}`} onChange={formik.handleChange} onBlur={formik.handleBlur} id="fullname" value={formik.values.fullname} name='fullname'/>
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="col-form-label">{Toggle?"Your Email Address":"Your Phone-Number"}</label>
                                    <input type={Toggle?"text":"number"} className={`form-control ${formik.touched.email?formik.errors.email? "is-invalid":"is-valid":""}`} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" name="email" value={formik.values.email}/>
                                </div>
                                <div className="mb-3">
                                    <label for="message-text" className="col-form-label"> {Toggle?"Mail:":"Message:"}</label>
                                    <textarea className={`form-control ${formik.touched.message?formik.errors.message? "is-invalid":"is-valid":""}`} onChange={formik.handleChange} onBlur={formik.handleBlur} id="message-text" name="message" value={formik.values.message}></textarea>
                                </div>
                            </form> }
                        </div>
                        <div className="modal-footer">
                            {
                                !messageStatus?<>
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={formik.handleSubmit}>Send message</button>
                                </>:<>
                                <button type="button" className="btn btn-secondary" onClick={finnally} data-bs-dismiss="modal">Close</button>
                                </>
                            }
                          
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
const Container = styled.section`
width:100%;
.slider-man{
    height:350px;
    display:flex;
    align-items:center;
    width:100%;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
    box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
    justify-content:center;
    .slider-child{
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
        box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
        width:60%; 
        background-repeat:no-repeat;
        background-size:cover;
        height:100%;
        border-radius:10px;
        color:white;
        -webkit-text-stroke: 1px black ;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:25px;
        .first{
            font-size:30px;
            color:white;
            width:100%;
            text-align:center;
            border:none;
            text-transform:uppercase;
            font-weight:600;
        }
        .second{
            font-size:17px;
            color:white;
            width:100%;
            text-align:center;
            border:none;
            text-transform:uppercase;
            font-weight:600;
        }
        .third{
            display:flex;
            border-radius:15px;
            -webkit-text-stroke:none ;
            width:60%;
            background-color:#ffff;
            input{
                border-radius:15px;
            }
            button{
                border-radius:15px;
            }
        
        }
    }
}
@media screen and (max-width:913px) and (min-width:517px){

    .slider-child{
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
        box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
        width:80%; 
        background-repeat:no-repeat;
        background-size:cover;
        height:100%;
        border-radius:10px;
        color:white;
        -webkit-text-stroke: 1px black ;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:25px;
        .first{
            font-size:30px;
            color:white;
            width:100%;
            text-align:center;
            border:none;
            text-transform:uppercase;
            font-weight:600;
        }
        .second{
            font-size:17px;
            color:white;
            width:100%;
            text-align:center;
            border:none;
            text-transform:uppercase;
            font-weight:600;
        }
        .third{
            display:flex;
            border-radius:15px;
            -webkit-text-stroke:none ;
            width:60%;
            background-color:#ffff;
            input{
                border-radius:15px;
            }
            button{
                border-radius:15px;
            }
        
        }
    }
}
}
@media screen and (max-width:516px) and (min-width:57px){
    .slider-man{
        height:400px;
    .slider-child{
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
        box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
        width:100%; 
        background-repeat:no-repeat;
        background-size:cover;
        height:100%;
        border-radius:10px;
        color:white;
        -webkit-text-stroke: 1px black ;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:25px;
        .first{
            font-size:30px;
            color:white;
            width:100%;
            text-align:center;
            border:none;
            text-transform:uppercase;
            font-weight:600;
        }
        .second{
            font-size:17px;
            color:white;
            width:100%;
            text-align:center;
            border:none;
            text-transform:uppercase;
            font-weight:600;
        }
        .third{
            display:flex;
            border-radius:15px;
            -webkit-text-stroke:none ;
            width:60%;
            background-color:#ffff;
            input{
                border-radius:15px;
            }
            button{
                border-radius:15px;
            }
        
        }
   } }
}
}
.father{
    margin:30px 0;
    display:flex;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
    box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
    justify-content:space-around;
    text-align:center;
    height:120px;
    .chidren{
        width:26%;
        cursor:pointer;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        border-radius:10px;
        border:1px solid blue;
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
            box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
    }
}
@media screen and (max-width:641px) and (min-width:503px){
    .father{
        display:flex;
        justify-content:space-around;
        text-align:center;
        height:120px;
        .chidren{
            width:29%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            border-radius:10px;
            border:1px solid blue;
            -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
                box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
        }
    }

}
@media screen and (max-width:502px) and (min-width:5px){
    .father{
        display:flex;
        justify-content:space-around;
        text-align:center;
        flex-direction:column;
        height:400px;
        align-items:center;
        .chidren{
            height:30%;
            width:80%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            border-radius:10px;
            border:1px solid blue;
            -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
                box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
        }
    }

}
`
export default Footer