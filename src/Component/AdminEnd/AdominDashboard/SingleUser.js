import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { selectUsersById } from './UserSlice';
import { useSelector } from 'react-redux';

const SingleUser = ({userId}) => {
  const user=useSelector((state)=>selectUsersById(state,userId))
  return (
            <Container className="card w-100 h-100" >
                <Avatar className='card-img-top '/>
                    <div className="card-body">
                        <h5 className="card-title">{user.fullname}</h5>
                        <p className="card-text">{user.email}</p>
                
                    </div>
            </Container>
  )
}
const Container =styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
padding: 20px 0 0 0 ;
.card-img-top{
height:120px;
width:40%;
}
`

export default SingleUser