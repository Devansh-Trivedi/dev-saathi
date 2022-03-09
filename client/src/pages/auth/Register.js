import React, { useState } from 'react';
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
import MuiPhoneNumber from 'material-ui-phone-number';
import { toast } from 'react-toastify';
import { registerUserApi } from '../../api/auth';
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Regsiter(props) {
  let navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const email = data.get('email')
    const password = data.get('password')
    const userName = data.get('userName')
    const name = data.get('name')
    if (email === "" || password === "" || phoneNumber === "" || name === "" || userName === "") {
      toast.error("Please enter all information")
    } else {
      const phone = phoneNumber.replace(" ", "").replace('-', "")
      registerUserApi({ email, password, phoneNumber: phone, userName, name })
        .then((res) => {
          if (res.data.success) {
            setPhoneNumber("")
            toast.success("Successfully Registered. Please login");
            navigate('/');
          } else {
            toast.error(res.data.message || "Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toast.error(err.response.data ? err.response.data.message : "Something went wrong");
        });
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="UserName"
                  name="userName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber defaultCountry={'in'} onChange={(value) => {
                  setPhoneNumber(value)
                }} />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}