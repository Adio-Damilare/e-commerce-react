import React from 'react'
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectById } from '../ProductAction/ProductSlice';
const Product = ({ GoodId }) => {
  const Good = useSelector((state) => selectById(state, GoodId));
  return (
    <Container>
      <div className='hard' >
        <Link to={`/product/${GoodId}`} >
          <img src={Good.image} className="card-image2" alt="shoe" />
        </Link>
        <div className='FatherAbraham'>
        <div className='card-body ps-2'>
          <Link style={{textDecoration:"none",color:"black"}} to={`/product/${GoodId}`}>
            {
              Good?.quantity<=0?<s className='card-title text-center pt-1 d-block'>{Good?.name?.length > 50 ? `${Good?.name.substring(0, 50)}..` : Good?.name}</s>:<p className='card-title text-center pt-1'>{Good?.name?.length > 50 ? `${Good?.name.substring(0, 50)}..` : Good?.name}</p>
            }
          </Link>
          <b className='card-subtitle'><span style={{ textDecoration: "line-through double" }}>N</span>{Good?.Amount}</b>
        </div>
        <div className='subway'>
          <article>{Good?.quantity} items left</article>
          <div className="progress">
            <div className="progress-bar bg-warning" role="progressbar" style={ Good?.quantity<=25?{width:"25%"}:Good?.quantity<=50?{width:"50%"}:Good?.quantity<=75?{width:"75%"}:{width:"100%"}} aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
        </div>

    </Container>

  )
}
const Container = styled.div`
height:100%;
width:100%;
margin: 0 0 20px 0;
.hard{
  width:100%;
  height:100%;
  a{
    height:60%;
    width:100%;
    .card-image2{
      height:70%;
      width:100%;
    }
  }
  .FatherAbraham{
    height:38%;
    .subway{
      margin-top:10px;
      padding:0 10px;
      .progress{
        height:8px;
      }
    }
  }
}

`

export default Product