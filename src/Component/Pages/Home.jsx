import React from 'react'
import Navbar from '../NavbarComponent/Navbar'
import Product from '../ProductComponent/SignleProduct'
import Slider from '../Slidercomponent/Slider'
import Aos from 'aos'
import "aos/dist/aos.css"
import ScrollTop from '../ScrollTop/ScrollTop'
import { useGetProductsQuery, selectIds, selectAll } from "../ProductAction/ProductSlice";
import { useSelector } from 'react-redux';
import styled from "styled-components"
import Footer from '../RegisterPagesForUsers/Footer';
import ReactPaginate from "react-paginate"
import HomeContainer from './HomeContainer'

export const Home = () => {
    const GoodIds = useSelector(selectAll);
    const data = GoodIds.slice(0, 5)
    const { isLoading, isSuccess } = useGetProductsQuery()
    React.useEffect(() => {
        Aos.init();
        Aos.refresh()
    }, [])
    return (<>
            <Navbar home={"home"} />
            <div className='' >
                <div className='main_slider' style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", margin: "40px 0 0 0" }}>
                    <Slider data={data} />
                </div>
                <HomeContainer products={GoodIds} />

            </div>
     
        <Footer />
        <ScrollTop />
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