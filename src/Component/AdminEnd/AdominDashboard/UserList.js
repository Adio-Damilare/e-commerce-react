import axios from 'axios'
import React from 'react'
import styled from "styled-components"
import Header from '../Navbar/Header'
import NavbarForAdmin from './NavbarForAdmin'
import SingleUser from './SingleUser' ;
import { useSelector } from 'react-redux';
import { selectUsersIds} from './UserSlice'  
    
const UserList = () => {
    
    const Users=useSelector(selectUsersIds)
    
    return (
        <Container>
            <Header />
            <Main>
                <NavbarForAdmin />
                <div className='container-fluid fatherOfAll'>
                    <div className='job' style={{ height: "50%" }}>
                        <article className='text-center'>Dashbord/<b className='text-muted'>Users list</b></article>
                       <main className='mains'>
                        {
                        Users&&Users.map(user=>( 
                            <div className='MakeLighter'>
                             <SingleUser userId={user}/>
                            </div>
                            ))
                            }
                           
                    
                       </main>
                            

                    </div >
                </div>
            </Main>

        </Container>

    )
}
const Container = styled.section`
display:flex;
`
const Main = styled.div`
width:100%;
.fatherOfAll{
    .job{
        .mains{
            width:100%;
            overflow-y:scroll;
            height:85vh;
            display:flex;
            flex-flow:wrap;
            &::-webkit-scrollbar{
                width:5px;  
            }
            &::-webkit-scrollbar-thumb{
                background-color:grey;
                border-radius:20px;
            }
            .MakeLighter{
                width:32%;
                height:200px;
                margin: 15px 5px;
            }
           
        }
    }
}
`

export default UserList