import { Label } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Container } from '@mui/system';
import { Button } from 'bootstrap';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Navbar/Header';
import { FaMoneyBillAlt } from "react-icons/fa"
import { MdHighQuality } from "react-icons/md"
import { BsCardImage } from "react-icons/bs"
import NavbarForAdmin from './NavbarForAdmin';
import { useFormik } from 'formik';
import * as yup from "yup"
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector,useDispatch } from 'react-redux';
import { AdminState } from "./AdminRedux"
import { useParams } from 'react-router-dom';
import { selectById } from '../../ProductAction/ProductSlice';
import { useEditGoodMutation,useGetProductsQuery } from '../../ProductAction/ProductSlice';
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';

const UpdateGoods = () => {
    const navigate=useNavigate();
    const { detail: user } = useSelector(AdminState);
    const [editGood, { isSuccess, isError, isLoading }] = useEditGoodMutation()
    const {refetch} =useGetProductsQuery()
    const { id } = useParams();
    const dispatch=useDispatch();
    const good = useSelector((state) => selectById(state, id))
    const [uploadLoading, setUploadLoading] = useState(false)
    const [image, setImage] = useState(good && good.image);

    const formik = useFormik({
        initialValues: {
            name: good && good.name,
            Amount: good && good.Amount,
            quantity: good && good.quantity,
            description: good && good.description,
        },
        onSubmit:async (values, { resetForm }) => {
            if (!image) {
                toast.error("Kindly upload the product image ");
                return
            }
           else{
            try{
                setUploadLoading(true)
              let result =  await editGood({...good,...values,id,image}).unwrap();
             if(result?.status){
                toast.success("Product edit successfuly");
                refetch();
                navigate("/admin/dashboard/product")
             }else{
                toast.error("error");
             }

            }catch(err){
                console.log(err.message +" hello am the error")
            }finally{
                setUploadLoading(false)
            }

           }
        },
        validationSchema: yup.object({
            Amount: yup.number().required("Product must have amount"),
            description: yup.string().required().min(10),
            quantity: yup.number().required(),
            name: yup.string().required().min(3),
        })
    })
    const imageChange = (e) => {
        const file = e.target.files[0]
        const READER = new FileReader;
        READER.readAsDataURL(file);
        READER.onload = () => {
            setImage(READER.result)
        }
    }
    const HandleSubmit=(e)=>{
        e.preventDefault();
        console.log(formik.errors)
        formik.handleSubmit()
    }
    return (
        <>
            <Containere>

                <div><Header /></div>
                {good ?
                    <main className='main'>
                        <NavbarForAdmin />

                        <main id="overflow" >
                            <header id='headerForUploadProductPage' className='w-100'>Edit Product <span className='text-muted'>page</span></header>
                            <div className='container-fluid d-flex  legwork justify-content-center w-100 '>
                                <div className='iyawidth'>
                                    <div className="mb-3 w-100">
                                        <div className='w-100 d-flex justify-content-center mb-3'>
                                            <img src={image} alt="uploadimage" id='imageUploadImage' className={` border border-2 border-primary ${image ? "d-block" : "d-none"}`} />
                                        </div>
                                        <input type="file" className="form-control" onChange={(e) => imageChange(e)} name="" id="imageUpload" placeholder="" accept='image/*' hidden />
                                        <label htmlFor='imageUpload' className='btn w-100 btn-primary' id='headerForUploadProductButton'><BsCardImage />  {!image ? `Upload image` : `change image`} </label>
                                    </div>
                                    <form onSubmit={(e)=>HandleSubmit(e)}>
                                        <div className='mb-3'>
                                            <label htmlFor='name' className=''>Product Name </label>
                                            <input type="text" id='name' value={formik.values.name} onBlur={formik.handleBlur} name='name' className={`form-control rounded ${formik.touched.name ? formik.errors.name ? " form-control is-invalid " : "form-control is-valid" : ""}`} onChange={formik.handleChange} />
                                        </div>

                                        <div className='mb-2'>
                                            <label htmlFor='Amount' className=''>Product Amount </label>
                                            <div className='input-group border rounded'>
                                                <div className='input-group-prepend '>
                                                    <div className='input-group-text w-100  h-100 d-flex justify-content-between '>
                                                        <span style={{ textDecoration: "line-through double" }} className="ms-2">N</span>
                                                    </div>
                                                </div>
                                                <input type="text" id='Amount' value={formik.values.Amount} name='Amount' onBlur={formik.handleBlur} onChange={formik.handleChange} className={`form-control rounded p-2 ${formik.touched.Amount ? formik.errors.Amount ? " form-control is-invalid " : "form-control is-valid " : ""}`} />
                                            </div>
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='quantity' className=''>Product Quantity </label>
                                            <input type="text" id='quantity' value={formik.values.quantity} onBlur={formik.handleBlur} name='quantity' className={`form-control rounded ${formik.touched.quantity ? formik.errors.quantity ? " form-control is-invalid " : "form-control is-valid" : ""}`} onChange={formik.handleChange} />
                                        </div>
                                        <div className='my-3'>
                                            <label htmlFor='ProductDescription44' className=''>Product Description </label>
                                            <div className='input-group'>
                                                <div className='input-group-prepend'>
                                                    <i className='icons44 input-group-text h-100'><MdHighQuality /></i>
                                                </div>
                                                <textarea type="text" value={formik.values.description} name='description' id='ProductDescription44' className={`form-control rounded ${formik.touched.description ? formik.errors.description ? " form-control is-invalid " : "form-control is-valid " : ""}`} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                            </div>
                                        </div>
                                        <div className='w-100 mb-5'>
                                            <button className='btn w-100 btn-primary' type='submit' disabled={uploadLoading}>{uploadLoading ? "Loading..." : 'Upload Product'}</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </main>

                    </main> : <div>Loading...</div>}
                <ToastContainer />
            </Containere>  </>
    )
}
const Containere = styled.div`
display:flex;
#ProductDescription44{
    min-height:60px;
}
.main{

    #overflow{
        overflow-y:scroll;
        height:630px;
      
    }
    #overflow::-webkit-scrollbar{
        width:20px;
    }
    width:100%;
    #headerForUploadProductPage{
        font-size:25px;
        text-transform:uppercase;
        font-weight:400;
    }
  main{
    width:100%;
        .legwork{
            width:100%;
            .iyawidth{
                width:40%;
                #imageUploadImage{
                    float:center;
                    max-width:80%;
                    min-width:80%;
                    max-height:180px;
                }
            }
            
        }
    }
}
@media screen and  (max-width:882px) {
    #overflow{
        overflow-y:scroll;
        height:700px;
      
    }
}

@media screen and  (max-width:882px) and  (min-width:769px){
// display:block;
.main{
    main{
        width:100%;
            .legwork{
                width:100%;
                .iyawidth{
                    width:75%;
                    #imageUploadImage{
                        float:center;
                        max-width:80%;
                        min-width:80%;
                        max-height:180px;
                    }
                }
                
            }
        }
    }

}

@media screen and  (max-width:768px) and  (min-width:751px){
// display:block;
.main{
    main{
        width:100%;
            .legwork{
                width:100%;
                .iyawidth{
                    width:79%;
                    #imageUploadImage{
                        float:center;
                        max-width:80%;
                        min-width:80%;
                        max-height:180px;
                    }
                }
                
            }
        }
    }

}
@media screen and  (max-width:750px) and  (min-width:457px){
    display:block;
.main{
    main{
        width:100%;
            .legwork{
                width:100%;
                .iyawidth{
                    width:60%;
                    #imageUploadImage{
                        float:center;
                        max-width:80%;
                        min-width:80%;
                        max-height:180px;
                    }
                }
                
            }
        }
    }

}
@media screen and  (max-width:456px) and  (min-width:4px){
    display:block;
.main{
    main{
        width:100%;
            .legwork{
                width:100%;
                .iyawidth{
                    width:90%;
                    #imageUploadImage{
                        float:center;
                        max-width:80%;
                        min-width:80%;
                        max-height:180px;
                    }
                }
                
            }
        }
    }

}

 `
// const Main = styled.main`
// width:100%;
// `

// const Holder=styled.div`
//     width:50%;
//     @media screen (max-width:1080px) and (min-width:750px){

//         width:100%;
//     }
// `

export default UpdateGoods