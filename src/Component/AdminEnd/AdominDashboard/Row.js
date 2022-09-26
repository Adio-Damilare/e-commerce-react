import React from 'react'
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
import styled from "styled-components" ;
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Deliver } from './AdminApi';
import { selectUsersById } from './UserSlice';  

const Row=(props)=> {
    const { row ,index} = props;
    const [open, setOpen] = React.useState(false);
    console.log(row);

    const user=useSelector((state)=>selectUsersById(state,row.userId))
    const deliver=(e)=>{
      axios.post(Deliver,e).then(res=>{
        console.log(res.data)
      }) 
    }
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className={row.deliveryStatus?"bg-success text-light":""}>
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
          <TableCell>
          {row.orderid}
          </TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{user.fullname}</TableCell>
          <TableCell align="right">
           {!row.deliveryStatus? <button className="btn btn-warning" onClick={()=>deliver({userId:row.userId,orderId:row.orderid,})} >Not deliver</button>:<article>Deliver</article>}
          </TableCell>
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
                      <TableCell align="right">Total price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.productdetail.map((historyRow) => (
                      <TableRow key={historyRow.name}>
                        <TableCell component="th" scope="row">
                          {historyRow.name}
                        </TableCell>
                        <TableCell>{historyRow.quantity}</TableCell>
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

export default Row