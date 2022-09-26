import React from 'react'
import { TiShoppingCart } from "react-icons/ti"
import { GrPhone } from "react-icons/gr"
import CustomizedBadges from './CustomizedBadge'
import { FiSearch } from "react-icons/fi"
import styled from 'styled-components'
import AccountBtn from './AccountBtn'
import { useSelector, } from 'react-redux';
import { SelectCurrentUser } from '../RegisterPagesForUsers/UserRedux';
import { SelectCurrentCart } from './CartRedux'
import ModalChild from './ModalChild'
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'

const Navbar = ({ home }) => {
  const { User } = useSelector(SelectCurrentUser);
  let { store, total } = useSelector(SelectCurrentCart)
  const Navigate = useNavigate();
  let length = store?.length
  const checkpage = () => {
    Navigate("/user/profile/checkout");
    localStorage.logindirection = JSON.stringify("checkoutd")
  }

  const Typewrite = () => {
    return (
      <Typewriter
        words={["WELCOME TO DARUZ STORE", "WELCOME TO DARUZ STORE", "WELCOME TO DARUZ STORE", "WELCOME TO DARUZ STORE"]}
        loop={40}
      />
    )
  }
  return (
    <Container  >
      <div className='container-fluid d-flex justify-content-between px-lg-5' id='nav_container'>
        <div>
          <Link className='text-decoration-none text-dark' to="/">
            <strong className='fs-2'>DARUZ</strong>
          </Link>
        </div>
        {
          home && <TypeForMe>
            <Typewrite />
          </TypeForMe>
        }

        <div className="d-flex justify-content-between " id='button_group'>
          <AccountBtn />
          <button className="btn contact activity"><GrPhone /> <span>contact</span></button>
          <button className="btn  contact" data-bs-toggle="modal" data-bs-target="#exampleTotalOder" > {store ? <CustomizedBadges length={length} /> : <TiShoppingCart />} </button>
        </div>
      </div>
      <div className="modal fade" id="exampleTotalOder" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog  modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header border bg-info">
              <div className='bg-info h-100 w-100 text-center fs-3 text-light'>Total Cart Product {`(${store ? store.length:0})`}</div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body card">
              {store && store.length > 0 ? store.map((good, index) => (
                <ModalChild key={index} good={good} index={index} />
              )) : <div className='NoCart text-center py-5'>No cart add</div>}
            </div>
            <div className='text-end ' style={{ padding: " 20px 30px" }}>Total amount : <span style={{ textDecoration: "line-through double" }}>N</span>{total}</div>
            <div className="modal-footer btn-group justity-content-around">
              <Link to="/" className='btn w-50'>
                <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">Continue shopping</button>
              </Link>
              {
                store && store.length > 0 ? <button type="button" className="btn btn-success" onClick={checkpage} data-bs-dismiss="modal">Check Out</button> : ''
              }
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const TypeForMe = styled.div`
margin-top:10px;
font-size:25px;
@media screen and (max-width:750px) and (min-width:8px){ 

 display:none;

}
`
const Container = styled.div`
background-color:rgb(202,239,237);
align-items:center;
height:60px;
display:flex;
width:100%;
padding:05px 0px ;
position:sticky;
top:0;
z-index:2000;
.modal-body{
  display:flex !important;
  align-items:center;
}
@media screen and (max-width:1128px) and (min-width:820px){ 
  .contact{
    height:80%;
    margin:5px;
    span{
      font-size:10px;
    }
    font-size:13px;
  }
}
@media screen and (max-width:819px) and (min-width:538px){
  
  .activity{
    display:none !important;
  }
  .contact{
    height:90%;
    margin:5px;
    font-size:13px;
  }
}
@media screen and (max-width:537px) and (min-width:70px){
  .displayNoneForMe{
    display:none
  }
  
  .contact{
    height:90%;
    // margin-top:-5px;
    font-size:12px;
  }
}


`

export default Navbar