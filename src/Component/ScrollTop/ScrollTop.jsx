import React from 'react'
import {BiUpArrowAlt} from "react-icons/bi"
import styled from 'styled-components'


const ScrollTop = () => {
    const [backToTopButton,setBackToTopButton]=React.useState(false)
    React.useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>=100){
                setBackToTopButton(true)
            }else{
                setBackToTopButton(false) 
            }
        })
    },[])
    const scroltop=()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
  return (
    <>{
        backToTopButton&&(<Button className='btn d-flex align-items-center ' onClick={scroltop}><BiUpArrowAlt/></Button>)
    }
  
    </>
  )
}
const Button=styled.button`
position:fixed;
bottom:50px;
right:50px;
height:50px;
width:50px;
font-size:60px;
color:white;
background-color:dodgerblue;
    svg{
        font-size:30px;
        height:50px;
    }

`

export default ScrollTop