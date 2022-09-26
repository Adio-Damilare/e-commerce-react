import React from 'react'
import {FaArrowAltCircleRight,FaArrowAltCircleLeft,FaMonero} from "react-icons/fa"

const Slider = ({data}) => {
    const [current,setCurrent]=React.useState(0)
    const [displayIcon,setdisplayIcon]=React.useState(false)
    const [DataSlice,setDataSlice]=React.useState(data?.length<=5?data:data?.slice(0,5))
    const length= data.length
    setTimeout(()=>{
        prevSlide()
    },5000)
    const prevSlide=()=>{
        setCurrent(current==0?length-1:current-1   )
    }
    const nextSlide=()=>{
        setCurrent(current===length-1?0 :current+1)
    }
    
   const handleChange=(index)=>{
    setCurrent(index)
   }
  return (
    <div className='slider card slider_card2' onMouseEnter={()=>setdisplayIcon(true)}  onMouseLeave={()=>setdisplayIcon(false)} style={{backgroundImage:`url(${data[current].image})`, backgroundClip:"padding-box",backgroundPosition:"center", backgroundRepeat:"repeat no-repeat",backgroundSize:"cover",}}>

        { displayIcon &&( <><FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide}/>
        <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide}/> </>)}
    
    <div className='d-flex nigeria '>
        {DataSlice.map((val,index)=>(
            <button onClick={()=>handleChange(index)} className={`d-flex m-1 first ${current===index?"active":""} `  }key={index}>
            
            </button>
    ))}</div>
    </div>
  )
}

export default Slider