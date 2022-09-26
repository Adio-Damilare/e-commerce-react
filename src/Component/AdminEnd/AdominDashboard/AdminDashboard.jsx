import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '../Navbar/Header'
import BarChat from './BarChat'
import NavbarForAdmin from './NavbarForAdmin'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/KeyboardArrowUp';
import Table from '@mui/material/Table';
import Widget from './Widget'
import axios from 'axios'
import { Getdashboard } from './AdminApi';
import { useSelector } from 'react-redux'
import { AdminState } from './AdminRedux'
import LatestOrderadmin from './LatestOderAdmin'
import {selectAllUsers} from "./UserSlice"
import { selectTotal } from '../../ProductAction/ProductSlice';

const AdminDashboard = () => {
  const {detail:Admin}=useSelector(AdminState)
  const UserS=useSelector(selectAllUsers)
  const Goods=useSelector(selectTotal)
  let totalAmountOfSale=0;
  let totalOrder=0;
  let orders=[];
  for(let i=0;i<UserS.length;i++){
      totalAmountOfSale+=UserS[i].orders. totalPurchase;
      if(UserS[i].orders.totalOrders.length>0){
          let totalOrders=UserS[i].orders.totalOrders
          totalOrder+=totalOrders.length;
          orders=[...orders,...totalOrders]
      }
  }
  return (
    <Container>
      <Header />
      <Main>
        <NavbarForAdmin />
        <div className='container-fluid fatherOfAll'>
          <div className='johnDoe1' >
            <Widget Admin={Admin} totalAmountOfSale={totalAmountOfSale} totalOrder={totalOrder} Goods={Goods} />
          </div>
          <div className='mt-5 john3'>
            <div><LatestOrderadmin orders={orders} /></div>
          </div>
        </div>
      </Main>

    </Container>
  )
}

const Container = styled.div`
display:flex;
flex-direction:row;
.fatherOfAll{
  height:60vh
}
`
const Main = styled.div`
width:100%;
.johnDoe1{
  height:260px;
}
.john3{
  height:280px;
  overflow-y:scroll;
  &::-webkit-scrollbar{
    width:5px;
}
&::-webkit-scrollbar:horizontal{
    height:5px;
   
}
&::-webkit-scrollbar-thumb{
    background-color:grey;
    border-radius:20px;
}

}

`
export default AdminDashboard