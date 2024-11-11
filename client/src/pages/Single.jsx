// src/pages/Single.js

import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import NavScrollExample from '../components/Nav';

const Single = () => {
  const { state } = useLocation();
  const record = state?.record;

  return (
    <>
   < NavScrollExample/>
    <div style={styles.singlePage}>
      <div style={styles.row}>
        <div style={styles.col}>
          {/* Image Card */}
          <Card style={styles.imageCard}>
            <CardMedia
              component="img"
              image={record?.pdtImage}
              alt={record?.pdtName || "Product Image"}
              height="300"
              style={styles.imgFluid}
            />
          </Card>
        </div>

        <div style={styles.col}>
          {/* Details Card */}
          <Card style={styles.detailsCard}>
            <CardContent>
              <Typography variant="h5" style={styles.cardTitle}>
                {record?.pdtName}
              </Typography>
              <Typography variant="body1" style={styles.cardText}>
                {record?.pdtDescription}
              </Typography>
              <Typography variant="h6" style={styles.cardPrice}>
                Price: ${record?.pdtPrice}
              </Typography>
              <div style={styles.actionButtons}>
              <Link to={'/message'} style={{color: 'white'}}><Button  sx={{  margin:2,'&:hover': { border: 'none', 
        backgroundColor: 'white', color: '#86D293'},'&:focus': {outline: 'none'}}}>chat</Button></Link>
                {/* <Button
                  variant="contained"
                  color="warning"
                  href="#"
                  style={{ marginLeft: "10px" }}
                >
                  Add to Cart
                </Button>  */}
                 <Link to={'/message'} style={{color: 'white'}}><Button color="inherit" sx={{  margin:2,'&:hover': { border: 'none', 
        backgroundColor: 'white', color: '#86D293'},'&:focus': {outline: 'none'}}}>chat</Button></Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default Single;

const styles = {
  singlePage: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  col: {
    flex: "1 1 100%",
    maxWidth: "700px",
  },
  imageCard: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    overflow: "hidden",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  detailsCard: {
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    width: "100%",
  },
  imgFluid: {
    width: "100%",
    height: "auto",
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardText: {
    marginBottom: "20px",
    textAlign: "justify",
    color: "#555",
  },
  cardPrice: {
    color: "#ff5722",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  actionButtons: {
    display: "flex",
    gap: "10px",
  },
};
