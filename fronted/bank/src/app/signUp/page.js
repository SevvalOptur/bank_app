"use client";
import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import style from '../signIn/login.css'



const theme = createTheme();

export default function SignUp() {
  
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    const localStorageGet = localStorage.getItem("user");
    const user = JSON.parse(localStorageGet);
    
    if(data.get('firstName') == "" &&  data.get('lastName') == "" && data.get('email') == "" && data.get('password') == ""){
      setError("Lütfen boş alanları doldurunuz.");
    }else if(data.get('email') == user.email){
      setError("Bu mail adresi kullanılmaktadır.");
    }
    else{
      setError("Kayıt başarılı.");
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Kayıt Ol
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    InputProps={{
                    sx: {
                        color: 'black !important',
                        '&:focus-within fieldset, &:focus-visible fieldset': {
                        border: '2px solid #595959!important',
                        },
                    },
                    }}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    InputProps={{
                    sx: {
                        color: 'black !important',
                        '&:focus-within fieldset, &:focus-visible fieldset': {
                        border: '2px solid #595959!important',
                        },
                    },
                    }}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    InputProps={{
                        sx: {
                            color: 'black !important',
                            '&:focus-within fieldset, &:focus-visible fieldset': {
                            border: '2px solid #595959!important',
                            },
                        },
                    }}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    InputProps={{
                        sx: {
                            color: 'black !important',
                            '&:focus-within fieldset, &:focus-visible fieldset': {
                            border: '2px solid #595959!important',
                            },
                        },
                    }}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background:'black',
                '&:hover': {
                    backgroundColor: '#262626',
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
              },}}
            >
              Kayıt Ol
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2" sx={{color: 'black', textDecorationColor:'black', '&:hover': {
                     color: '#595959'}
                   }}>
                  Giriş İçin Tıklayınız
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography component="h4" variant="h5" className='alert' style={{ color:"red", background:"rgb(253, 237, 237)", padding:'0 10px', fontSize:'15px' }}>
                  {error}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}