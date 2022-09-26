import React from 'react'
import Navbar from '../NavbarComponent/Navbar'
import styled from "styled-components"
import { useFormik } from 'formik'
import * as yup from "yup"
import PaystackPop from "@paystack/inline-js";
import { useSelector, useDispatch } from 'react-redux';
import { SelectCurrentCart } from '../NavbarComponent/CartRedux';
import { SelectCurrentUser } from './UserRedux';
import { checkout } from "../Api/";
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { selectAll } from '../ProductAction/ProductSlice';
import { useNavigate } from 'react-router-dom'
import { CheckOutFinish } from '../NavbarComponent/CartRedux'
import axios from 'axios'
const CheckOut = () => {
    const navigate = useNavigate()
    const [change, setChange] = React.useState(false)
    const [ResultStatus, setResultStatus] = React.useState(false)
    const dispatch = useDispatch();
    window.scrollTo(0, 0);
    const { store, total } = useSelector(SelectCurrentCart);
    const { User } = useSelector(SelectCurrentUser);
    const Goods = useSelector(selectAll);

    const formik = useFormik({
        initialValues: {
            address: "",
            city: "",
            postalCode: "",
            country: "",

        },
        onSubmit: (values, { resetForm }) => {
            try {
                const paystack = new PaystackPop();
                console.log(paystack.newTransaction)
                paystack.newTransaction({
                    key: "pk_test_54968fe9a69cf7152ad5b6bb551a547093b6b541",
                    amount: total * 100,
                    email: User.email,
                    callback: function (response) {
                        setChange(true)
                        let productdetail = []
                        for (let i = 0; i < store.length; i++) {
                            let research = store[i].id;
                            let found = Goods.find(good => good.id == research);
                            let data = { name: found.name, image: found.image, quantity: store[i].total, amount: store[i].amount, id: research };
                            productdetail.push(data);
                        }
                        axios.post(`${checkout}/${User._id}`, { orderid: response.reference, orderAmount: total, productdetail, deliveryAddress: values }).then((res) => {
                            if (res?.data?.status) {
                                toast.success("Paid successfuly")
                                dispatch(CheckOutFinish())
                                // navigate("/")
                                setResultStatus(true)
                                resetForm({ values: '' })
                            }

                        })
                    }
                })
            } catch (err) {
                console.log(err.message)

            }

        },
        validationSchema: yup.object({
            address: yup.string().required().min(10),
            city: yup.string().required().min(3),
            postalCode: yup.string().required().min(5),
            country: yup.string().required(),
        })
    })
    return (
        <Container>
            <Navbar />
            <section className='contain1'>
                <div className='card'>
                    <b style={{ textTransform: "uppercase" }} className="text-center">Delivery Address</b>
                    <>
                            <input type="text" className={`form-control my-2 ${formik.touched.address ? formik.errors.address ? "is-invalid" : "is-valid" : ""}`} onChange={formik.handleChange} onBlur={formik.handleBlur} name="address" placeholder='Enter Address' value={formik.values.address} />
                            <input type="text" className={`form-control my-2 ${formik.touched.city ? formik.errors.city ? "is-invalid" : "is-valid" : ""}`} onChange={formik.handleChange} onBlur={formik.handleBlur} name="city" placeholder='Enter City' value={formik.values.city} />
                            <input type="text" className={`form-control my-2 ${formik.touched.postalCode ? formik.errors.postalCode ? "is-invalid" : "is-valid" : ""}`} onChange={formik.handleChange} onBlur={formik.handleBlur} name="postalCode" placeholder='Enter Postal code' value={formik.values.postalCode} />
                            <input type="text" className={`form-control my-2 ${formik.touched.country ? formik.errors.country ? "is-invalid" : "is-valid" : ""}`} onChange={formik.handleChange} onBlur={formik.handleBlur} name="country" placeholder='Enter Country' value={formik.values.country} />
                            {formik.errors.address||formik.errors.city||formik.errors.country||formik.errors.postalCode ||!formik.touched.address||!formik.touched.city||!formik.touched.country||!formik.touched.postalCode? <button type="button" className="btn btn-success" onClick={formik.handleSubmit}>Continue</button>:<button className='btn btn-block btn-success' data-bs-toggle="modal" data-bs-target="#checkoutPage" type="button">Continue</button>}
                        </>
                </div>
            </section>
            <ToastContainer />
            <div className="modal fade" id="checkoutPage" tabindex="-1" data-bs-backdrop="static" aria-labelledby="checkoutPagelLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header border">
                            <div className='h-100 w-100 text-center fs-3 text-primary'>Payment page</div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body card">
                {
                    change? !ResultStatus?<div className='text-center'>LOADING.......</div>:<div className='text-center'>Successfuly Paid</div>:
                <p> The total of balance of the Goods is <span style={{textDecoration:"line-through double"}}>N</span>{total}</p>
                }
                        </div>
                        <div className="modal-footer btn-group justity-content-around">
                           {ResultStatus?<button type="button" className="btn btn-success"  data-bs-dismiss="modal" aria-label="Close" onClick={()=>navigate("/")}>Go back to Home page</button>:<button type="button" className="btn btn-success" onClick={formik.handleSubmit}>PAY</button>
                           } 

                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
width:100%;
.contain1{
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    min-height:70vh;
    margin-top:30px;
    .card{
        width:30%;
        padding:14px;
        b{font-size:25px;}
        .form-control{
            height:60px;
        }
        .btn{
            margin:10px 0 0 0;
            height:60px; 
        }
    }
}
@media screen and (max-width:997px) and (min-width:787px){  
    .contain1{
        width:100%;
        .card{
            width:40%;
            padding:14px;
            b{font-size:25px;}
            .form-control{
                height:60px;
            }
            .btn{
                margin:10px 0 0 0;
                height:60px; 
            }
        }
    }
}
@media screen and (max-width:786px) and (min-width:601px){  
    .contain1{
        width:100%;
        .card{
            width:50%;
        
            padding:14px;
            b{font-size:20px;}
            .form-control{
                height:60px;
            }
            .btn{
                margin:10px 0 0 0;
                height:60px; 
            }
        }
    }
}
@media screen and (max-width:600px) and (min-width:467px){  
    .contain1{
        width:100%;
        .card{
            width:60%;
    
            padding:14px;
            b{font-size:20px;}
            .form-control{
                height:60px;
            }
            .btn{
                margin:10px 0 0 0;
                height:60px; 
            }
        }
    }
}
@media screen and (max-width:466px) and (min-width:375px){  
    .contain1{
        width:100%;
        .card{
            width:80%;
        
            padding:14px;
            b{font-size:20px;}
            .form-control{
                height:60px;
            }
            .btn{
                margin:10px 0 0 0;
                height:60px; 
            }
        }
    }
}
@media screen and (max-width:374px) and (min-width:277px){  
    .contain1{
        width:100%;
        .card{
            width:84%;
        
            padding:14px;
            b{font-size:17px;}
            .form-control{
                height:60px;
            }
            .btn{
                margin:10px 0 0 0;
                height:60px; 
            }
        }
    }
}
@media screen and (max-width:276px) and (min-width:7px){  
    .contain1{
        width:100%;
        .card{
            width:95%;
        
            padding:14px;
            b{font-size:17px;}
            .form-control{
                height:60px;
            }
            .btn{
                margin:10px 0 0 0;
                height:60px; 
            }
        }
    }
}

`

export default CheckOut