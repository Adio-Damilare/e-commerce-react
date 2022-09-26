
import styled from "styled-components"
import React from 'react'
import image from "./burger.jpg"
import UserUpdate from "./UserUpdate"
import Navbar from "../NavbarComponent/Navbar";
import { Avatar } from '@mui/material'
import OrderList from "./OrderList";
import { useSelector } from "react-redux";
import { SelectCurrentUser } from "./UserRedux";
import { deepOrange } from "@mui/material/colors";
import ActiveUser from "./ActiveUser";
const UserProfile = () => {
    const { User: user } = useSelector(SelectCurrentUser);
    const [displays, setDisplays] = React.useState(false)


    return (
        <>
            <Navbar />
            <Container className='container-fluid '>

                <div className='some border rounded border-success'>
                    <div id="back" className="border bg-light">
                        <div id="avatar">
                        <ActiveUser name={user.fullname} />
                        </div>
                        <article>{user.fullname}</article>
                    </div>
                    <div className="loce  border border-4 bg-light ">
                        
                        <button  className={`btn w-100 rounded-1 bgscreen btn-primary ${displays ? "active" : ""}`} onClick={() => setDisplays(true)}>PROFILE SETTING</button>
                        <button className={`btn w-100 rounded-1 bgscreen btn-primary ${displays ? "" : "active"}`} onClick={() => setDisplays(false)} >ORDER LIST</button>

                        <button data-bs-toggle="modal" data-bs-target="#exampleModalOderList" className={`btn w-100 smallscreen rounded-1 btn-primary ${displays ? "active" : ""}`} onClick={() => setDisplays(true)}>PROFILE SETTING</button>
                        <button className={`btn w-100 rounded-1 smallscreen btn-primary ${displays ? "" : "active"}`} onClick={() => setDisplays(false)} data-bs-toggle="modal" data-bs-target="#exampleModalOderList">ORDER LIST</button>
                        
                    </div>

                </div>
                <div className="second">
                    {displays ? <UserUpdate /> : <OrderList />}
                </div>
                <div className="modal fade" id="exampleModalOderList" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog  modal-fullscreen">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            {displays ? <UserUpdate /> : <OrderList />}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        </>
    )
}
const Container = styled.section`
height:70vh;
justify-content:center;
align-items:center;
padding:0 30px;
display:flex;
gap:50px;
.modal{
    margin-top:70px;
}
.some{
    height:45vh;
    width:30%;
    padding:4rem 0 0 0 ;
    #back{
        display:flex;
        padding:0 20px;
        height:45%;
        justify-content:space-between;
        align-items:end;
        position:relative;
        #avatar{
            height:100px;
            width:100px;
            top:-40px;
            .name{
                font-size:50px;
            }
        }
    }
    .loce{
        margin-top:10px;
        display:flex;
        flex-direction:column;
        gap:20px;
        .smallscreen{
            display:none;
        }
        .active{
            background:linear-gradient(98.63deg,#f9a225 0%, #f95f35 100%,#0000 3%);
            // background:#EF5757;
            // background:#E1EA4A;
            // background:rgba(255,255,255,0.64);
            // background:#fca61f;
            transition: 3s ease-in-out;
        }
    }
}
@media screen and (max-width:1089px) and (min-width:889px){
    .some{
        height:40vh;
        width:35%;
        #back{
            height:40%;
            #avatar{
               
                top:-40px;
            }
        }
    }
    .second{
        width:40%;
       
    }
   
}
@media screen and (max-width:888px) and (min-width:690px){
 gap:20px;
 padding:0 20px 0 10px ;
    .some{
        height:40vh;
        width:45%;
        #back{
            height:40%;
            #avatar{
               
                top:-40px;
            }
        }
    }
    .second{
        width:50% !important;
    }
   
}
@media screen and (max-width:689px) and (min-width:580px){
 gap:20px;
 padding:20px 0px 0 0px ;
 flex-direction:column;
 min-height:100vh;
    .some{
        height:50vh;
        width:60%;
        #back{
            height:40%;
            #avatar{
               
                top:-40px;
            }
        }
        .loce{
            margin-top:10px;
            display:flex;
            flex-direction:column;
            gap:20px;
            .bgscreen{
                display:none;
            }
            .smallscreen{
                display:block;
            }
            .active{
                background:linear-gradient(98.63deg,#f9a225 0%, #f95f35 100%,#0000 3%);
                // background:#EF5757;
                // background:#E1EA4A;
                // background:rgba(255,255,255,0.64);
                // background:#fca61f;
                transition: 3s ease-in-out;
            }
        }
    }
    .second{
        display:none;
        width:60% !important;
    }
   
}
@media screen and (max-width:579px) and (min-width:422px){
 gap:20px;
 padding:20px 0px 0 0px ;
 flex-direction:column;
    .some{
        height:50vh;
        width:80%;
        #back{
            height:40%;
            #avatar{
               
                top:-40px;
            }
        }
        .loce{
            margin-top:10px;
            display:flex;
            flex-direction:column;
            gap:20px;
            .bgscreen{
                display:none;
            }
            .smallscreen{
                display:block;
            }
            .active{
                background:linear-gradient(98.63deg,#f9a225 0%, #f95f35 100%,#0000 3%);
                // background:#EF5757;
                // background:#E1EA4A;
                // background:rgba(255,255,255,0.64);
                // background:#fca61f;
                transition: 3s ease-in-out;
            }
        }
    }
    .second{
        display:none;
        width:60% !important;
    }
   
}
@media screen and (max-width:421px) and (min-width:1px){
 gap:20px;
 padding:20px 0px 0 0px ;
 flex-direction:column;
    .some{
        height:60vh;
        width:98%;
        #back{
            height:40%;
            #avatar{
               
                top:-40px;
            }
        }
        .loce{
            margin-top:10px;
            display:flex;
            flex-direction:column;
            gap:20px;
            .bgscreen{
                display:none;
            }
            .smallscreen{
                display:block;
            }
            .active{
                background:linear-gradient(98.63deg,#f9a225 0%, #f95f35 100%,#0000 3%);
                // background:#EF5757;
                // background:#E1EA4A;
                // background:rgba(255,255,255,0.64);
                // background:#fca61f;
                transition: 3s ease-in-out;
            }
        }
    }
    .second{
        display:none;
        width:60% !important;
    }
   
}
.second{
    width:39%;
    height:55vh;
    margin-top:100px;
}
`


export default UserProfile