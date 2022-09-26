import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectById } from '../ProductAction/ProductSlice';
import styled from "styled-components";
import Navbar from '../NavbarComponent/Navbar';
import { AiOutlineStar } from "react-icons/ai";
import { SelectCurrentUser } from '../RegisterPagesForUsers/UserRedux';
import { SelectCurrentCart, AddCart, RemoveCart, AddCartToDb, ChangeStatus, DeleteCartToDb } from '../NavbarComponent/CartRedux';
import { toast, ToastContainer } from 'react-toastify';
import { Typewriter } from "react-simple-typewriter"
import "react-toastify/dist/ReactToastify.css";
// import  Typewriter from "typewriter-effect"

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { User } = useSelector(SelectCurrentUser);
  const { store, status } = useSelector(SelectCurrentCart)
  const Good = useSelector((state) => selectById(state, productId));
  const [disableBtn, setDisableBtn] = useState(false)
  const [loading, setLoading] = useState(false)
  let found;
  if (store) {
    found = store.find(e => e.id === productId)
  }

  const Addtocart = async (e) => {
    try {
      setDisableBtn(true)
      setLoading(true)
      if (User) {
        await dispatch(AddCartToDb({ UserId: User._id, cartId: e, amount: Good.Amount })).unwrap();
        if (status == "success") {
          toast.success("successfuly add to cart");
        } else if (status == "failed") {
          toast.error("fail add to cart");
        }
      } else {
        dispatch(AddCart({ e, amount: Good.Amount }))
        toast.success("successfuly add to cart");
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      dispatch(ChangeStatus())
      setDisableBtn(false)
      setLoading(false)
    }

  }
  const Removetocart = async (e) => {
    try {
      setLoading(true)
      setDisableBtn(true)
      if (User) {
        await dispatch(DeleteCartToDb({ UserId: User._id, cartId: e, amount: Good.Amount })).unwrap()
        if (status == "success") {
          toast.success("successfuly  delete");
        } else if (status == "failed") {
          toast.error("fail to delete");
        }
      }
      else {
        dispatch(RemoveCart({ e, amount: Good.Amount }))
        toast.success("successfuly  delete");
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      dispatch(ChangeStatus())
      setDisableBtn(false)
      setLoading(true)
    }
  }
  const Loading = () => {
    return (
      <div>LOADING
        <span style={{ fontSize: "20px" }}>
          <Typewriter loop={50}
            words={["..........", "..........", "..........", "..........", "..........", "..........", "..........", "..........", ".........."]}
            delaySpeed={1000} />
        </span>
      </div>
    )
  }
  return (
    <Container>
      <Navbar />
      {Good ?
        <section className='section33 border'>
          <img className='imageTag' src={Good.image} alt={Good.name} />
          <div className='descriptionmain'>
            <article className='fw-bold' style={{fontSize:"20px",textTransform:"capitalize"}}>{Good.name}</article>
            <article className='text-muted' style={{ wordWrap: "break-word" }}>{Good?.description?.length>500?`${ Good.description?.substring(0,500)}........`: `${Good.description}`}</article>
            <div className='rating'><AiOutlineStar className='active2' /><AiOutlineStar /><AiOutlineStar /> <button className='btn'>see all reviews</button></div>
            <div className='mt-3'><span style={{ textDecoration: "line-through double" }}>N</span>{Good?.Amount}</div>
            { Good?.quantity<=0?"":<>
           {  found ?
              <button className='btn btn-danger w-100 mt-3' disabled={disableBtn} onClick={() => Removetocart(productId)}> {disableBtn?<Loading/>:'Remove Cart'}</button> : 
              <button className='btn btn-warning w-100 mt-3' disabled={disableBtn} onClick={() => Addtocart(productId)}> {disableBtn?<Loading/>:` Add Cart ` } </button>}
            </>
            }
            {
              User? <button className='btn btn-primary w-100 mt-3'>Add review</button>
:<div className='bg-warning mt-3 text-center rounded px-4'> 
  Login to add review
</div>
            }
           
          </div>
        </section> : <>Loading...</>}
      <ToastContainer />
    </Container>
  )
}

const Container = styled.main`
.section33{
  width:100%;
  max-height:70vh;
  margin-top:30px;
  padding:0 30px;
  display:flex;
  justify-content:space-between;
  .imageTag{
    width:50%;
    min-height:100%;
    max-height:100%;
    border:1px solid green;
    border-radius:10px;
  }
  .descriptionmain{
    width:48%;
    article{
      margin:20px 0px;
    }
    .rating{
      svg{
      font-size:30px;
      }
      svg path{
        color:yellow;
        background-color:yellow;
        font-size:30px;
      }
    }

  }
}
@media screen and (max-width:1044px) and (min-width:685px){
  .section33{
    width:100%;
    min-height:50vh;
    margin-top:30px;
    padding:0 30px;
    display:flex;
    justify-content:space-between;
    .imageTag{
      width:50%;
      min-height:100%;
      max-height:100%;
      border:1px solid green;
      border-radius:10px;
    }
    .descriptionmain{
      width: 48%;
      height:100%;
      article{
        margin:20px 0px;
      }
      .rating{
        svg{
        font-size:30px;
        }
        svg path{
          color:yellow;
          background-color:yellow;
          font-size:30px;
        }
      }
  
    }
  }
}
@media screen and (max-width:684px) and (min-width:68px){
  .section33{
    width:100%;
    min-height:80vh;
    max-height:300vh;
    margin-top:30px;
    padding:0 30px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    .imageTag{
      width:100%;
      min-height:50%;
      max-height:50%;
      border:1px solid green;
      border-radius:10px;
    }
    .descriptionmain{
      width:100%;
      height:48%;
      article{
        margin:20px 0px;
      }
      .rating{
        svg{
        font-size:30px;
        }
        svg path{
          color:yellow;
          background-color:yellow;
          font-size:30px;
        }
      }
  
    }
  }
}

`
export default SingleProduct