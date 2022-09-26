import React, {useState} from 'react'
import Product from '../ProductComponent/SignleProduct';
import styled from "styled-components";
import ReactPaginate from "react-paginate"
const HomeContainer = ({products}) => {
  const [pageNumber,setpageNumber]=useState(0);
  const GoodsPerPage=20;
  const GoodSViews=pageNumber*GoodsPerPage;
  const displayGoods=products.slice(GoodSViews,GoodSViews+GoodsPerPage)
  const pageCount=Math.ceil(products.length/GoodsPerPage);
  const changePage=({selected})=>{
    setpageNumber(selected)
  }
  return (
    <>
    <Container >
       
          <>{
            displayGoods.map(id => {
              return (
                <div key={id.id} className='children border rounded' data-aos="fade-up" data-aos-offset="100" >
                  <Product GoodId={id.id} />
                </div>
              )
            })
          } </>
      </Container>
          <Main>
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
          </Main>
    </>
      )
}
const Container = styled.div`
display:flex;
flex-flow:wrap;
width:100%;
padding:0 10px;
justify-content:space-evenly;
.children{
    margin:20px 5px;
    width:22%;
    height:350px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0,0,0,0.47);
    box-shadow:2px 4px 10px 1px rgba(201,201,201,0.47) ;

}
@media screen and (max-width:1000px) and (min-width:810px){
    .children{
        margin:20px 5px;
        width:30%;
        height:350px;
    
    }
}
@media screen and (max-width:809px) and (min-width:513px){
    .children{
        margin:20px 5px;
        width:45%;
        height:350px;
    
    }
}
@media screen and (max-width:512px) and (min-width:60px){
    .children{
        margin:20px 5px;
        width:100%;
        height:350px;
    
    }
}
`

const Main=styled.div`
display:flex;
align-items:center;
justify-content:center;
margin:20px 0; 
.paginationBtns{
  bos-sizing:border-box;
  display:flex;
  height:40px;
  gap:10px;
  list-style:none;
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
`
export default HomeContainer