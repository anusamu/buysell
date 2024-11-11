import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import Form from 'react-bootstrap/Form'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import axiosInstance from '../axiosinterceptor';
import axios from 'axios';
import AdminBar from '../components/AdminBar';

const Dashboard = () => {
  const [product, setProduct] = useState([]); // Array to store fetched products
  const [records, setRecords] = useState([]); // Array to display filtered/unfiltered products

  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Admin/AdminProduct');
        setProduct(response.data);
        setRecords(response.data); // Initialize records with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once on component mount   


  const Filter = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredRecords = product.filter((item) =>
      item.pdtName.toLowerCase().includes(searchText)
    );
    setRecords(filteredRecords);
  };

  const handleDelete = async (_id) => {
    try {
      const response = await axiosInstance.delete(`http://localhost:3000/Admin/AdminDelete/${_id}`);
      setRecords(records.filter((record) => record._id !== _id)); // Remove deleted product from UI
      console.log('Product deleted successfully!');
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleUpdate = (record) => {
    navigate('/add', { state: { record } }); // Pass selected product data to add.js for editing
  };

  return (
    <>
    <AdminBar/>
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
      <Grid container spacing={3} sx={{ padding: 2 }}>
        {records.map((row) => (
          <Grid item xs={12} sm={6} md={4} key={row._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                sx={{ height: 180 }}
                image={row.pdtImage}
                title={row.pdtName}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 700 }}>
                  PRODUCT NAME: {row.pdtName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  LOCATION: {row.pdtLocation}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Price: {row.pdtPrice} INR
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {row.pdtDescription}
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: '#F95454' }} onClick={() => handleDelete(row._id)}>
                  DELETE
                </Button>
                <Button variant="contained" onClick={() => handleUpdate(row)}>
                  EDIT
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;