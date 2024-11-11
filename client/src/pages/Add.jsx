import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import axiosInstance from '../axiosinterceptor';
import NavScrollExample from '../components/Nav';
import axios from 'axios';
const Add = () => {
  const [product, setProduct] = useState({
    pdtImage: '',
    pdtPrice: '',
    pdtName: '',
    pdtOwner: '',
    pdtDescription: '',
    pdtFeature: '',
    pdtDate: '',
    pdtLocation: '',
    pdtOwnerCount: '',
    expiryDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchValue = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          pdtImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!product.pdtName || !product.pdtPrice || !product.pdtDescription || !product.pdtLocation) {
      setError('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const sendData = () => {
    if (!validateForm()) return;
  
    setLoading(true);
    setError(null);
  
    axios
      .post('http://localhost:3000/app/add', product) // 'expiryDate' will be part of 'product' data
      .then((res) => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setError('There was an error adding the product. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  useEffect(() => {
    if (location.state != null) {
      const { product: locProduct } = location.state;
      setProduct({
        pdtName: locProduct.pdtName,
        pdtOwner: locProduct.pdtOwner,
        pdtPrice: locProduct.pdtPrice,
        pdtDate: locProduct.pdtDate,
        pdtDescription: locProduct.pdtDescription,
        pdtLocation: locProduct.pdtLocation,
        pdtOwnerCount: locProduct.pdtOwnerCount,
        pdtFeature: locProduct.pdtFeature,
        pdtImage: locProduct.pdtImage,
        expiryDate:locProduct.expiryDate
      });
    }
  }, [location.state]);

  const styles = {
    container: {
      padding: '24px',
      backgroundColor: '#f9f9f9',
    },
    header: {
      color: '#333',
    },
    errorMessage: {
      color: '#d32f2f',
      marginBottom: '16px',
    },
    imagePreview: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      marginTop: '8px',
    },
    submitButton: {
      marginTop: '16px',
      backgroundColor: '#1976d2',
      '&:hover': {
        backgroundColor: '#115293',
      },
    },
  };

  return (
    <>
      <NavScrollExample /><br /><br />

      <Box sx={styles.container}>
        <Typography variant="h4" gutterBottom sx={styles.header}>
          Sell Product
        </Typography>

        {error && <Typography sx={styles.errorMessage}>{error}</Typography>}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              onChange={fetchValue}
              name="pdtName"
              value={product.pdtName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Owner"
              variant="outlined"
              fullWidth
              onChange={fetchValue}
              name="pdtOwner"
              value={product.pdtOwner}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Price"
              variant="outlined"
              fullWidth
              onChange={fetchValue}
              name="pdtPrice"
              value={product.pdtPrice}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              label="Product Date"
              variant="outlined"
              fullWidth
              value={product.pdtDate}
              onChange={fetchValue}
              name="pdtDate"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Product Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              onChange={fetchValue}
              name="pdtDescription"
              value={product.pdtDescription}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              onChange={fetchValue}
              name="pdtLocation"
              value={product.pdtLocation}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Owner Count"
              variant="outlined"
              fullWidth
              onChange={fetchValue}
              name="pdtOwnerCount"
              value={product.pdtOwnerCount}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Product Features"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              onChange={fetchValue}
              name="pdtFeature"
              value={product.pdtFeature}
            />
          </Grid>

          <Grid item xs={12}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {product.pdtImage && (
              <div>
                <img
                  src={product.pdtImage}
                  alt="Product"
                  style={styles.imagePreview}
                />
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
  <TextField
    type="date"
    label="Expiration Date"
    variant="outlined"
    fullWidth
    value={product.expiryDate}
    onChange={fetchValue}
    name="expiryDate"
  />
</Grid>

        <Button
          variant="contained"
          color="primary"
          sx={styles.submitButton}
          onClick={sendData}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </Button>
      </Box>
   

    </>
  );
};

export default Add;
