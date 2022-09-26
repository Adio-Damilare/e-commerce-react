import React from 'react';
import styled from "styled-components";
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors';

const Widget = ({Admin,totalAmountOfSale,totalOrder,Goods}) => {

    return (
        < Container>
                <div className='text-center Lead'>
                    <Avatar sx={{ bgcolor: deepOrange[500],width:60,
                    height:60 }}>
                    </Avatar>
                    <div>{Admin?.fullname}</div>

                </div>
                <section className='Lead'>
                    <article>Total sale</article>
                    <strong >
                        <b id='tolasale'>N</b>{totalAmountOfSale}
                    </strong>
                </section>
                <section className='Lead'>
                    <article>Total Product</article>
                    <strong >
                        {Goods}
                    </strong>
                </section>
                <section className='Lead'>
                    <article>Total Orders</article>
                    <strong >
                        {totalOrder}
                    </strong>
                </section>
         
        </Container>
    )
}

const Container = styled.div`
    border-radius: 10px;
    margin-top:20px;
    justify-content: space-around;
    padding: 10px;
    height:100%;
    display:flex;
    width: 100%;
    flex-direction:row-reverse;
    flex-flow:wrap;
   
       .Lead{
            width:45%;
            -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
            box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
            height:40%;
            border-radius:10px;
            display:flex;
            flex-direction:column;
            justify-content:center;
            padding:20px;
            align-items:center;
      }
      section{
        strong{
            font-size:30px;
        }
      }
      #tolasale{
        text-decoration:line-through double;
      }
    

`


export default Widget