"use client";
import * as React from 'react';
import { useState } from "react";
import { useRouter } from 'next/navigation';
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
import style from './login.css'



const theme = createTheme();

export default function SignIn() {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    console.log("user", userData);

    if(data.get('email') == "" || data.get('password') == ""){
      setError("Lütfen boş alanları doldurunuz.");
     }
    else{
      setError("");
      const localStorageGet = localStorage.getItem("user");
      const user = JSON.parse(localStorageGet);
      if(user.email == data.get('email') && user.password == data.get('password')){
        console.log("oleyyy");
        router.push('/page')

      }else{
        setError("Lütfen bilgileri kontrol ediniz.")
      }
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
            Giriş
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField 
              InputProps={{
                sx: {
                  color: 'black !important',
                  '&:focus-within fieldset, &:focus-visible fieldset': {
                    border: '2px solid #595959!important',
                  },
                },
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
            InputProps={{
              sx: {
                color: 'black !important',
                '&:focus-within fieldset, &:focus-visible fieldset': {
                  border: '2px solid #595959!important',
                },
              },
            }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 , background:'black',
              '&:hover': {
                backgroundColor: '#262626',
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
              },}}
            >
              Giriş
            </Button>
            <Grid container>
              <Grid item xs>
              
              </Grid>
              <Grid item>
                <Link href="/signUp"  variant="body2" sx={{color: 'black', textDecorationColor:'black'}}>
                  {"Üye Değil misiniz?"}
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