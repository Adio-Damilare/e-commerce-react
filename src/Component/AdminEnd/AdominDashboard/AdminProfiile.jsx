import React from 'react'
import styled from 'styled-components'
import Header from '../Navbar/Header'
import BarChat from './BarChat'
import NavbarForAdmin from './NavbarForAdmin'

const AdminProfile = () => {
  return (
    <Container>
      <Header/>
      <Main>
      <NavbarForAdmin/>
      <div className='container-fluid'>
        
      </div>
      </Main>

    </Container>
  )
}

const Container=styled.div`
display:flex;
flex-direction:row;
`
const Main=styled.div`
width:100%;

`
export default AdminProfile