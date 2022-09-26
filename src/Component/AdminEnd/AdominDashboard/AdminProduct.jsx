import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../Navbar/Header'
import BarChat from './BarChat'
import NavbarForAdmin from './NavbarForAdmin'
import { useNavigate } from 'react-router-dom'
import { GetProducts } from "./AdminApi";
import { selectIds } from '../../ProductAction/ProductSlice';
import { useSelector } from 'react-redux'
import Errormanage from './ERROR.Mange';
import ReactPaginate from "react-paginate"

const AdminProduct = () => {
  const GoodsId = useSelector(selectIds)
  const navigate = useNavigate();
  const back = () => navigate(-1)
  const [pageNumber, setpageNumber] = useState(0);
  const GoodsPerPage = 6;
  const GoodsViews = GoodsPerPage * pageNumber;
  const DisplayGoods = GoodsId.slice(GoodsViews, GoodsViews + GoodsPerPage);
  const pageCount = Math.ceil(GoodsId.length / GoodsPerPage);
  const changePage = ({ selected }) => {
    setpageNumber(selected)
  }

  return (
    <Container>
      <Header />
      <Main>
        <NavbarForAdmin />
        <div className='container-fluid pt-2'>
          <div className='px-1'>
            <div className='d-flex p-2 mt-4' style={{ justifyContent: "space-between" }}>
              <article id="article33">Products</article>
              <button className='btn btn-success text-light d-sm-block d-none' onClick={back} >back</button>
            </div>
          </div>
          <div className='helpmedisplayNone'>
            <Link to="/admin/dashboard/uploadproduct" className='text-decoration-none'>
              <button className='btn rounded-1 mt-3 btn-primary' >Add New</button>
            </Link>
            <div className='d-flex ' style={{ width: "70%", alignItems: "center" }}>
              <input className='form-control' type="search" placeholder='search Product' style={{ height: "40px" }} />
              <button className='btn'>search</button>
            </div>
          </div>
          <div className='singleProduction'>
            {
              GoodsId && DisplayGoods.map(good => (
                <div className='mapProduct' key={good}><Errormanage goodId={good} /></div>
              ))
            }

          </div>
            <div className='d-block jhare'>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBtns"}
              previousLinkClassName={"previous"}
              nextLinkClassName={"next"}
              activeClassName={"activePage"}
            />
            </div>

        </div>
      </Main>


    </Container>
  )
}

const Container = styled.div`
display:flex;
flex-direction:row;
#article33{
  font-size:30px;
}
.helpmedisplayNone{
  display:flex;
  margin-top:20px;
  justify-content:space-between;
  align-items:center;
}
.jhare{
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
   
  .paginationBtns{
    bos-sizing:border-box;
    display:flex;
    height:40px;
    gap:10px;
    list-style:none;
    margin-top:20px;
    a{
      padding:10px;
      margin:8px;
      border-radius:5px;
      border:1px solid #2b2eff;
      color:#2b2eff;
      text-decoration:none;
      &:hover{
        color:white;
        background-color:#2b2eff;
      }
    }
  }
  .activePage a{
    color:white;
    background-color:#2b2eff;
  }
}
.singleProduction{
  display:flex;
  flex-flow:wrap;
  height:405px;
  justify-content:space-around;
  overflow-y:scroll;
 
  ::-webkit-scrollbar{
    width:5px;
}
&::-webkit-scrollbar-thumb{
    background-color:grey;
    border-radius:20px;
}
    .mapProduct{
      height:290px;
      margin:10px;
      width:30%;
      -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
      box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
    }
}
@media screen and  (max-width:750px) and  (min-width:8px){
  .helpmedisplayNone{
    display:none;
  }
}
@media screen and  (max-width:827px) and  (min-width:613px){
  .singleProduction{
    display:flex;
    flex-flow:wrap;
    height:405px;
    overflow-y:scroll;
    ::-webkit-scrollbar{
      width:5px;
  }
  &::-webkit-scrollbar-thumb{
      background-color:grey;
      border-radius:20px;
  }
      .mapProduct{
        height:290px;
        margin:10px;
        width:40%;
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
        box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
      }
  }
}
@media screen and  (max-width:612px) and  (min-width:6px){
  .singleProduction{
    display:flex;
    flex-flow:wrap;
    height:505px;
    overflow-y:scroll;
    ::-webkit-scrollbar{
      width:5px;
  }
  &::-webkit-scrollbar-thumb{
      background-color:grey;
      border-radius:20px;
  }
      .mapProduct{
        height:290px;
        margin:10px;
        width:80%;
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
        box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;
      }
  }
}
`
const Main = styled.div`
width:100%;

`
export default AdminProduct