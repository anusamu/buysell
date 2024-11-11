import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom'; 
import Form from 'react-bootstrap/Form'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

import axios from 'axios';
import AdminBar from '../components/AdminBar';

const UserListing = () => {
  const [user, setUser] = useState([]); // Array to store fetched products
  const [userRecords, setUserRecords] = useState([]); // Array to display filtered/unfiltered products

  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Admin/AdminDash');
        setUser(response.data);
        setUserRecords(response.data); // Initialize records with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount   


  const Filter = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredRecords = userRecords.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    setUserRecords(filteredRecords);
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/Admin//AdminDeleteUser/${_id}`);
      setRecords(userRecords.filter((record) => record._id !== _id)); // Remove deleted product from UI
      alert('Product deleted successfully!');
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

//   const handleUpdate = (record) => {
//     navigate('/add', { state: { record } }); // Pass selected product data to add.js for editing
//   };

  return (
    <>
    <AdminBar/> <br /><br />
      <Form className="d-flex">
        <Form.Control
          style={{ border: '1px solid #6F4FF2' }}
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={Filter}
        />
      </Form>
      <br />
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="right">profile pic</TableCell>
          <TableCell align="right">user ID</TableCell>
            <TableCell>USER NAME</TableCell>
            <TableCell align="right">email id</TableCell>
            <TableCell align="right">LOCATION</TableCell>
            <TableCell align="right">NUMBER</TableCell>
            <TableCell align="right">PIN CODE</TableCell>
            <TableCell align="right">ROLE</TableCell>
            <TableCell align="right">DELETE USER</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userRecords.map((row) => (
            <TableRow
              key={row.email}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <img
  style={{ width: '50px', height: '50px' }}
  className='rounded-full object-cover'
  src={row.avatar}
  alt='profile'
/>

              </TableCell>
             
              <TableCell align="right">{row._id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">{row.pinCode}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right"> <Button variant="contained" sx={{ backgroundColor: '#F95454' }} onClick={() => handleDelete(row._id)}>
                  DELETE
                </Button></TableCell>
              <TableCell align="right"> <Button variant="contained" onClick={() => handleUpdate(row)}>
                  EDIT
                </Button>
           </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
               
               
    </>
  );
};

export default UserListing;