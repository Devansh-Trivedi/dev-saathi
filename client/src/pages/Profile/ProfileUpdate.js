import * as React from 'react';
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
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { updateProfile } from '../../api/user';
import ReactQuill from 'react-quill';
import InputLabel from '@mui/material/InputLabel';
import 'react-quill/dist/quill.snow.css';

const theme = createTheme();

export default function ProfileUpdate() {

  const user = JSON.parse(localStorage.getItem("user"))
  let navigate = useNavigate();

  const [userUpdate, setUserUpdate] = React.useState({ ...user, techStackUpdate: user.techStack.join(',') })

  const handleSubmit = (event) => {
    event.preventDefault();
    const { linkedin, stackOverflow, githubID, name, location, techStackUpdate, previousProjects } = userUpdate
    if (name === "") {
      toast.error("Name is required")
    } else {
      let tech = []
      console.log(techStackUpdate)
      if (techStackUpdate !== '') {
        tech = techStackUpdate.split(',')
      }
      updateProfile({ linkedin, stackOverflow, githubID, name, location, techStack: tech, previousProjects })
        .then((res) => {
          if (res.data.success) {
            toast.success("Successfully updated Profile.");
            user.linkedin = linkedin
            user.stackOverflow = stackOverflow
            user.githubID = githubID
            user.name = name
            user.location = location
            user.techStack = tech
            user.previousProjects = previousProjects
            localStorage.setItem("user", JSON.stringify(user))
            navigate("/");
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
            Update Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                  value={userUpdate.name}
                  onChange={(e) => {
                    setUserUpdate({ ...userUpdate, name: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                  value={userUpdate.location}
                  onChange={(e) => {
                    setUserUpdate({ ...userUpdate, location: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="githubID"
                  label="Github Profile Link"
                  id="githubID"
                  value={userUpdate.githubID}
                  onChange={(e) => {
                    setUserUpdate({ ...userUpdate, githubID: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="linkedin"
                  label="Linkedin Profile Link"
                  id="linkedin"
                  value={userUpdate.linkedin}
                  onChange={(e) => {
                    setUserUpdate({ ...userUpdate, linkedin: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="stackOverflow"
                  label="Stack Overflow Profile Link"
                  id="stackOverflow"
                  value={userUpdate.stackOverflow}
                  onChange={(e) => {
                    setUserUpdate({ ...userUpdate, stackOverflow: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="techStack"
                  label="Enter Tech Stacks Sepearted By , (commas)."
                  id="techStack"
                  value={userUpdate.techStackUpdate}
                  onChange={(e) => {
                    setUserUpdate({ ...userUpdate, techStackUpdate: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                Previous Projects:
                <ReactQuill value={userUpdate.previousProjects}
                  onChange={(e) => {
                    setUserUpdate({ ...userUpdate, previousProjects: e })
                  }} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Go Back to Dashboard"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}