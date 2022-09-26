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
import {AiFillDelete} from "react-icons/ai";
import {useSelector} from "react-redux";
import {SelectCurrentUser} from "./UserRedux"


function Row(props) {
  const { row ,index} = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={row.deliveryStatus?"bg-success ":" "}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
          >
            {index+1}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderid}
        </TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.deliveryStatus?"deliver":"not deliver"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                List  Of goods
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.productdetail.map((historyRow) => (
                    <TableRow key={historyRow.name}>
                      <TableCell component="th" scope="row">
                      {historyRow.name}
                      </TableCell>
                      <TableCell> {historyRow.quantity}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                      {historyRow.quantity*historyRow.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function OrderList() {
  const {User}=useSelector(SelectCurrentUser);
  const {totalOrders}=User.orders;

  return (
    <Container className='border rounded'>
            <article className="d-block text-center oderee bg-primary">LIST OF ORDERS</article>
      <Table aria-label="collapsible table" className='border '>
        <TableHead>
          <TableRow>
            <TableCell >S/N</TableCell>
            <TableCell>Toggle</TableCell>
            <TableCell> Orders ids</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {totalOrders.map((row,index) => (
            <Row key={index} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
const Container=styled.div`
positon:relative;
height:100%;
overflow:scroll;
&::-webkit-scrollbar{
    width:5px;
}
&::-webkit-scrollbar:horizontal{
    height:5px;
   
}
&::-webkit-scrollbar-thumb{
    background-color:grey;
    border-radius:20px;
}
.oderee{
  width:100%;
    position:sticky;
    top:0px;
    padding:20px 0;
    
}
`
