import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styled from "styled-components" 
import Row from "./Row"




export default function LatestOrderadmin({orders}) {
  return (
    <Container className='border rounded'>
      <artivle className="d-block text-center oderee text-white bg-primary w-100">Latest Oders</artivle>
      <div>
      <Table aria-label="collapsible table" className='border bordered h-100'>
        <TableHead>
          <TableRow>
            <TableCell >S/N</TableCell>
            <TableCell>
              toggle
            </TableCell>
            <TableCell>List Of Ids</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>date</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row,index) => (
            <Row key={index} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
      </div>
    </Container>
  );
}
const Container=styled.div`
positon:relative;
width:100%;
.oderee{
    width:100%;
    position:sticky;
    top:0px;
    padding:20px 0;
    
}
`
