import { Label } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Container } from '@mui/system';
import { Button } from 'bootstrap';
import React, { useState } from 'react';
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
import { AdminState } from "./AdminRedux";
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation, useGetProductsQuery } from '../../ProductAction/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';

const UploadProduct = () => {
    const { detail: user } = useSelector(AdminState);
    const [addProduct, { isSuccess, isError, isLoading }] = useAddProductMutation();
    const { refetch,data } = useGetProductsQuery()
    const [uploadLoading, setUploadLoading] = useState(false)
    const navigate=useNavigate()
    const [image, setImage] = useState(undefined);
    const formik = useFormik({
        initialValues: {
            ProductDescription: "",
            ProductAmount: "",
            ProductQuantity: "",
            ProductName: "",
        },
        onSubmit: async (values, { resetForm }) => {
            if (!image) {
                toast.error("Kindly upload the product image ");
                return
            } else {
                setUploadLoading(true);
                try {
                    let uploadAdmin = user._id;
                    let result = await addProduct({ ...values, image, uploadAdmin }).unwrap()
                    if (result?.status) {
                        resetForm({ values: "" });
                        toast.success("upload successfully");
                        refetch();
                        navigate("/admin/dashboard/product")
                    } else {
                        toast.error("upload failed")
                    }

                } catch (err) {
                    console.log(err.message)
                } finally {
                    setUploadLoading(false)
                }
            }


        },
        validationSchema: yup.object({
            ProductAmount: yup.number().required("Product must have amount"),
            ProductDescription: yup.string().required().min(10),
            ProductQuantity: yup.number().required(),
            ProductName: yup.string().required().min(3),
        })
    })
    const HandleSubmitBtn=()=>{
        formik.handleSubmit();
    }

    const imageChange = (e) => {
        const file = e.target.files[0]
        const READER = new FileReader;
        READER.readAsDataURL(file);
        READER.onload = () => {
            setImage(READER.result)
        }
    }
    return (
        <Containere>
            <div><Header /></div>
            <main className='main'>
                <NavbarForAdmin />
                <main id="overflow" >
                    <header id='headerForUploadProductPage' className='w-100'>Upload Product <span className='text-muted'>page</span></header>
                    <div className='container-fluid d-flex  legwork justify-content-center w-100 '>
                        <div className='iyawidth'>
                            <div className="mb-3 w-100">
                                <div className='w-100 d-flex justify-content-center mb-3'>
                                    <img src={image} alt="uploadimage" id='imageUploadImage' className={` border border-2 border-primary ${image ? "d-block" : "d-none"}`} />
                                </div>
                                <input type="file" className="form-control" onChange={(e) => imageChange(e)} name="" id="imageUpload" placeholder="" accept='image/*' hidden />
                                <label htmlFor='imageUpload' className='btn w-100 btn-primary' id='headerForUploadProductButton'><BsCardImage />  {!image ? `Upload image` : `change image`} </label>
                            </div>
                            <div onSubmit={formik.handleSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='ProductName' className=''>Product Name </label>
                                    <input type="text" id='ProductName' value={formik.values.ProductName} onBlur={formik.handleBlur} name='ProductName' className={`form-control rounded ${formik.touched.ProductName ? formik.errors.ProductName ? " form-control is-invalid " : "form-control is-valid" : ""}`} onChange={formik.handleChange} />
                                </div>

                                <div className='mb-2'>
                                    <label htmlFor='ProductAmount' className=''>Product Amount </label>
                                    <div className='input-group border rounded'>
                                        <div className='input-group-prepend '>
                                            <div className='input-group-text w-100  h-100 d-flex justify-content-between '>
                                                <span style={{ textDecoration: "line-through double" }} className="ms-2">N</span>
                                            </div>


                                        </div>
                                        <input type="text" id='ProductAmount' value={formik.values.ProductAmount} name='ProductAmount' onBlur={formik.handleBlur} onChange={formik.handleChange} className={`form-control rounded p-2 ${formik.touched.ProductAmount ? formik.errors.ProductAmount ? " form-control is-invalid " : "form-control is-valid " : ""}`} />
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='ProductQuantity' className=''>Count in stock </label>
                                    <input type="text" id='ProductQuantity' value={formik.values.ProductQuantity} onBlur={formik.handleBlur} name='ProductQuantity' className={`form-control rounded ${formik.touched.ProductQuantity ? formik.errors.ProductQuantity ? " form-control is-invalid " : "form-control is-valid" : ""}`} onChange={formik.handleChange} />
                                </div>
                                <div className='my-3'>
                                    <label htmlFor='ProductDescription44' className=''>Product Description </label>
                                    <div className='input-group'>
                                        <div className='input-group-prepend'>
                                            <i className='icons44 input-group-text h-100'><MdHighQuality /></i>
                                        </div>
                                        <textarea type="text" value={formik.values.ProductDescription} name='ProductDescription' id='ProductDescription44' className={`form-control rounded ${formik.touched.ProductDescription ? formik.errors.ProductDescription ? " form-control is-invalid " : "form-control is-valid " : ""}`} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                                    </div>
                                </div>
                                <div className='w-100 mb-5'>
                                    <button className='btn w-100 btn-primary' onClick={HandleSubmitBtn} disabled={uploadLoading}>{uploadLoading ? "Loading..." : 'Upload Product'}</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>

            </main>
            <ToastContainer />
        </Containere>
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

export default UploadProduct