import React, { useEffect } from 'react';
import { selectById } from '../ProductAction/ProductSlice';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components"
import { GiCancel } from "react-icons/gi"
import { SelectCurrentCart } from './CartRedux';
import { SelectCurrentUser } from '../RegisterPagesForUsers/UserRedux';
import { toast, ToastContainer } from "react-toastify";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import "react-notifications/lib/Notification";
import 'react-notifications/lib/notifications.css';
import { Typewriter } from 'react-simple-typewriter';
import { AddCart, RemoveCart, MinusCart, AddCartToDb, DeleteCartToDb, MinusCartToDb } from './CartRedux';
const ModalChild = ({ good, index }) => {
  const dispatch = useDispatch();
  const currentGood = useSelector((state) => selectById(state, good.id))
  let { store, total, status } = useSelector(SelectCurrentCart);
  const { User } = useSelector(SelectCurrentUser)
  const [loading, setLoading] = React.useState(false)
  let total1 = good.total;

  const addCart = async (e) => {
    try {
      setLoading(true)
      if (User) {
        await dispatch(AddCartToDb({ UserId: User._id, cartId: e, amount: currentGood.Amount })).unwrap();
        if (status == "success") {
          toast.success("successfuly add to cart");
        } else if (status == "failed") {
          toast.error("fail add to cart");
        }
      }
      else {
        dispatch(AddCart({ e, amount: currentGood.Amount }))
        toast.success("successfuly add to cart");
      }
    } catch (err) {
      console.log(err.message)
    }finally{
      setLoading(false)
    }

  }
  const removecart = async (e) => {
    try {
      setLoading(true)
      if (User) {
        await dispatch(DeleteCartToDb({ UserId: User._id, cartId: e, amount: currentGood.Amount })).unwrap()
        if (status == "success") {
          toast.success("successfuly  delete");
        } else if (status == "failed") {
          toast.error("fail to delete");
        }
      }
      else {
        dispatch(RemoveCart({ e, amount: currentGood.Amount }));
        toast.success("successfuly add to cart");
      }
    } catch (err) {
      console.log(err.message)
    }finally{
      setLoading(false)
    }
  }
  const minus = async (e) => {
    try {
      setLoading(true)
      if (User) {
        await dispatch(MinusCartToDb({ UserId: User._id, cartId: e, amount: currentGood.Amount })).unwrap()
        if (status == "success") {
          toast.success("successfuly  delete");
        } else if (status == "failed") {
          toast.error("fail to delete");
        }
      }
      else {
        dispatch(MinusCart({ e, amount: currentGood.Amount }));
        toast.success("successfuly add to cart");
      }
    } catch (err) {
      console.log(err.message)
    }finally{
      setLoading(false)
    }
  }


  const Loading = () => {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>LOADING
        <span style={{ fontSize: "20px" }}>
          <Typewriter loop={50}
            words={["..........", "..........", "..........", "..........", "..........", "..........", "..........", "..........", ".........."]}
            delaySpeed={1000} />
        </span>
      </div>
    )
  }

  return (
    <>{
      loading ? <Loading /> :
        <ModalContainer className=' shadow-sm border'>
          <NotificationContainer />
          <GiCancel onClick={() => removecart(good.id)} className='cancel' />
          <img src={currentGood && currentGood.image} alt="love" />
          <b>{currentGood && currentGood.name}</b>
          <div className='chard'>
          <article>Quantity <span className='span'>:</span></article> 
          <article className='number'>{good.total}</article>
          </div>
          <div className='btnFather'>
            {
             total1 > 0 ? <button className='btn ' onClick={() => minus(good.id)} >-</button> : ""
            }
            {
              currentGood && currentGood.quantity > total1 ? <button className='btn' onClick={() => addCart(good.id)} >+</button> : ""
            }

          </div>
          <div className='john'>
            <b className=''>Subtotal  <span className='span'>:</span></b>
            <b><span style={{textDecoration:"line-through double"}}>N</span> {currentGood && currentGood.Amount}</b>
          </div>
          <ToastContainer />
        </ModalContainer>
    }
    </>
  )
}

const ModalContainer = styled.div`
width:70%;
display:flex;
margin:10px 0px ;
min-height:200px;
position:relative;
padding:0 30px;
justify-content:space-between;
border-radius:10px;
align-items:center;
.cancel{
 position:absolute;
 left:-13px;
 top:24px;
 color:red;
 font-size:25px;
 cursor:pointer;

}
.btnFather{
  .btn{
    font-size:30px;
  }
}
.chard{
  .span{
   visibility:collapse;
  }
  text-align:center ;
  gap:10px;
}
.john{
  display:flex;
  flex-direction:column;
  text-align:center;
  .span{
    visibility:collapse;
  }
  b{
    font-size:13px;
  }
}
img{
 min-height:80%;
 max-height:80%;
 width:200px;
 border-radius:10px;
}

@media screen and (max-width:1302px) and (min-width:1134px){ 
  width:80%;
}
@media screen and (max-width:1132px) and (min-width:946px){ 
  width:90%;
}
@media screen and (max-width:945px) and (min-width:690px){ 
  width:100%;
  padding:0 10px;
  img{
    min-height:80%;
    max-height:80%;
    width:150px
   }

}
@media screen and (max-width:689px) and (min-width:530px){ 
  width:70%;
  padding:10px 10px;
  flex-direction:column;
  min-height:400px;
  .chard{
    display:flex;

      .span{
       visibility:visible;
      }
     
      gap:6px;
    
  }
  .btnFather{
    display:flex;
    justify-content:space-between;
    width:60%;
    .btn{
      font-size:20px;
      height:40px;
    }
  }
  .john{
    display:flex;
    flex-direction:column;
    text-align:center;
    b{
      font-size:13px;
    }
  }
  img{
    min-height:50%;
    max-height:50%;
    width:85%;
   }

}
@media screen and (max-width:529px) and (min-width:406px){ 
  width:80%;
  padding:10px 10px;
  flex-direction:column;
  min-height:400px;
  .chard{
    display:flex;

      .span{
       visibility:visible;
      }
     
      gap:6px;
    
  }
  .btnFather{
    display:flex;
    justify-content:space-between;
    width:60%;
    .btn{
      font-size:20px;
      height:40px;
    }
  }
  .john{
    display:flex;
    flex-direction:row;
    text-align:center;
    gap:6px;
    .span{
      visibility:visible;
    }
    b{
      font-size:13px;
    }
  }
  img{
    min-height:50%;
    max-height:50%;
    width:85%;
   }

}
@media screen and (max-width:405px) and (min-width:40px){ 
  width:90%;
  padding:10px 10px;
  flex-direction:column;
  min-height:400px;
  .chard{
    display:flex;

      .span{
       visibility:visible;
      }
     
      gap:6px;
    
  }
  .btnFather{
    display:flex;
    justify-content:space-between;
    width:60%;
    .btn{
      font-size:20px;
      height:40px;
    }
  }
  .john{
    display:flex;
    flex-direction:row;
    text-align:center;
    gap:6px;
    .span{
      visibility:visible;
    }
    b{
      font-size:13px;
    }
  }
  img{
    min-height:50%;
    max-height:50%;
    width:85%;
   }

}

`

export default ModalChild