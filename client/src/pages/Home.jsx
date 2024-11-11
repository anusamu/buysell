
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavScrollExample from '../components/Nav';
import Form from 'react-bootstrap/Form';

import axiosInstance from '../axiosinterceptor';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

import ExampleCarouselImage from '../components/ExampleCarouselImage';


const Home = () => {
    const [product, setProduct] = useState([]);
    const [records, setRecords] = useState([]);

    const Filter = (event) => {
        const searchText = event.target.value.toLowerCase();
        const filteredRecords = product.filter(item =>
            item.pdtName.toLowerCase().includes(searchText)
        );
        setRecords(filteredRecords);
    };

    useEffect(() => {
        axiosInstance.get('http://localhost:3000/app/')
            .then((res) => {
                setProduct(res.data);
                setRecords(res.data); // Initialize records with the fetched data
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const navigate = useNavigate();

    const handleUpdate = (record) => {
        navigate('/home/single', { state: { record } }); // Passing record data for editing
    };

    return (
        <>
            <NavScrollExample /><br /><br /> <br /><br />
            <Form className="d-flex">
                <Form.Control
                    style={{ border: '1px solid #6F4FF2' }}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={Filter}
                />
            </Form><br />

            <Carousel>
      <Carousel.Item interval={3000}>
        <ExampleCarouselImage text="First slide" 
         src="https://t4.ftcdn.net/jpg/04/72/54/69/360_F_472546926_K7hWWTSDxNlLjztygL0W9gevEP3kjzRY.jpg"
          alt="first slide" />
        
      </Carousel.Item>
      
      <Carousel.Item interval={3000}>
        <ExampleCarouselImage text="Third slide" src="https://cdnblog.webkul.com/blog/wp-content/uploads/2014/08/Woocommerce-Marketplace-Blog-Banner.png"
          alt="third slide" />
       
      </Carousel.Item>
      <Carousel.Item >
        <ExampleCarouselImage text="Second slide" src="https://www.constructionline.co.uk/wp-content/uploads/2022/06/093-CL-MARKETPLACE-HEADER-V3.1-1.png"
          alt="second slide" />
       
      </Carousel.Item>
    </Carousel>

      

            <Grid container spacing={3} sx={{ padding: 1 }}>
                {records.map((row) => (
                    <Grid item xs={12} sm={6} md={3} key={row._id}> {/* Replace with a unique ID if available */}
                        <div className="NftCard" style={{ width: 282, height: 433, position: 'relative' }}>
                            <div style={{ width: 282, height: 433, position: 'absolute', background: 'white', borderRadius: 18 }} />
                            <div onClick={() => handleUpdate(row)}  style={{  textAlign:'center',fontFamily: 'Poppins',
                                        fontWeight: '600',
                                        paddingTop: 10, fontSize: 16, color: 'white', width: 242, height: 40, position: 'absolute', left: 20, top: 372, background: '#6F4FF2', borderRadius: 9 }}>
                                {/* <Button
                                    variant="contained"
                                    // Passing individual record for editing
                                    style={{
                                        textAlign:'center',
                                        color: 'white',
                                        
                                        fontFamily: 'Poppins',
                                        fontWeight: '600',
                                        paddingTop: 10,
                                    }}
                                >
                            
                                </Button> */}view
                            </div>
                            <div style={{ width: 242, height: 19, position: 'absolute', left: 20, top: 323, display: 'flex', justifyContent: 'space-between', color: '#6C7AA0' }}>
                                {/* <div style={{ fontSize: 16, fontFamily: 'Poppins', fontWeight: '400' }}>FEATURES:</div>
                                <div style={{ fontSize: 16, fontFamily: 'Poppins', fontWeight: '400' }}>{row.pdtFeature}</div> */}
                            </div>
                            <div style={{ width: 242, position: 'absolute', left: 20, top: 277 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400' }}>
                                    <div style={{ color: 'black' }}>PRICE:</div>
                                    <div style={{ color: '#6F4FF2' }}>{row.pdtPrice}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontFamily: 'Poppins', fontWeight: '400' }}>
                                    <div style={{ color: 'black' }}>LOCATION:</div>
                                    <div style={{ color: '#6F4FF2' }}>{row.pdtLocation}</div>
                                </div>
                            </div>
                            <div style={{ width: 115, height: 20, position: 'absolute', left: 22, top: 237, color: 'black', fontSize: 18, fontFamily: 'Poppins', fontWeight: '600' }}>
                                {row.pdtName}
                            </div>
                            <img
                                src={row.pdtImage}
                                alt={row.pdtName}
                                style={{ width: 243, height: 187, position: 'absolute', left: 19, top: 20, borderRadius: 19 }}
                            />
                        </div>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Home;

