import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
const AdminBar= () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate=useNavigate()
  let clearUser=()=>{
    localStorage.removeItem("token");
    navigate('/login')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{backgroundColor: '#6F4FF2'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 900}}>
            BUYSELL
          </Typography>
          
          <Link to={'/dashboard'} style={{color: 'white'}}><Button color="inherit" sx={{ margin: 1, '&:hover': { border: 'none', 
          backgroundColor: 'white', color: '#86D293'},'&:focus': {outline: 'none'}}}>Dashboard</Button></Link>

        <Link to={'/userListing'} style={{color: 'white'}}><Button color="inherit" sx={{  margin:2,'&:hover': { border: 'none', 
        backgroundColor: 'white', color: '#86D293'},'&:focus': {outline: 'none'}}}>Uers</Button></Link>
        {/* <Button color="inherit" sx={{ '&:hover': { border: 'none', 
        backgroundColor: 'white', color: '#86D293'},'&:focus': {outline: 'none'}}} onClick={clearUser}>logout</Button> */}
{/* <Link to={'/register'} style={{color: 'white'}}><Button color="inherit" sx={{  margin:2,'&:hover': { border: 'none', 
        backgroundColor: 'white', color: '#86D293'},'&:focus': {outline: 'none'}}}>register</Button></Link> */}
         <Link to={'/adminAdd'} style={{color: 'white'}}><Button color="inherit" sx={{  margin:2,'&:hover': { border: 'none', 
        backgroundColor: 'white', color: '#86D293'},'&:focus': {outline: 'none'}}}>ADDadmin</Button></Link>
              <Link to={'/login'} style={{color: 'white'}}><Button color="inherit" sx={{  margin:2,'&:hover': { border: 'none', 
        backgroundColor: 'white', color: '#86D293'},'&:focus': {outline: 'none'}}}>login</Button></Link>
        
        <Link to='/profile'>
  {currentUser ? (
    <img
      className='rounded-full h-7 w-7 object-cover'
      src={currentUser.avatar}
      alt='profile'
    />
  ) : (
    <li className='text-slate-700 hover:underline'>Login</li>
  )}
</Link>

        </Toolbar>
      
      </AppBar>
    </Box>
  )
}

export default AdminBar