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
import { updateProfile, uploadResumeApi } from '../../api/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import config from '../../config';
import {Navbar} from "react-bootstrap"

const theme = createTheme();

export default function ProfileUpdate() {
  let navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"))

  const [userUpdate, setUserUpdate] = React.useState({ ...user, techStackUpdate: user.techStack.join(',') })
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name } = userUpdate
    if (name === "") {
      toast.error("Name is required")
    } else {
      if (selectedFile !== null) {
        uploadResume()
      } else {
        submit()
      }
    }
  };

  const uploadResume = () => {
    const formData = new FormData();
    formData.append('resume', selectedFile);
    uploadResumeApi(formData)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message || "Something went wrong when updating resume");
        } else {
          submit(res.data.fileName)
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data ? err.response.data.message : "Something went wrong when updating resume");
      });
  };

  const submit = (resumeFileName) => {
    const { linkedin, stackOverflow, githubID, name, location, techStackUpdate, previousProjects } = userUpdate
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
          user.resume = resumeFileName
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

  return (
    <>
    <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/" style={{}} >Dev Saathi</Navbar.Brand>
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
    <div className="wrapper" style={{zIndex:"1"}}>
                <input type="checkbox" id="btn" hidden />
                <label htmlFor="btn" className="menu-btn">
                <i className="fas fa-bars"></i>
                <i className="fas fa-times"></i>
                </label>
                <nav id="sidebar">
                    <div className="title">
                    Menu
                    </div>
                    <ul className="list-items">
                    <li><a href="/"><i className="fas fa-home"></i>Home</a></li>
                    <li><a href="#" onClick={() => {navigate("/profile-update")}}><i className="fas fa-user"></i>Profile</a></li>
                    <li><a href="/ProjectList"><i className="fas fa-sliders-h"></i>Projects</a></li>
                    {/* <li><a href="#"><i className="fas fa-envelope"></i>Messages</a></li> */}
                    {/* <li><a href="#"><i className="fas fa-cog"></i>Settings</a></li> */}
                    <li><a href="#"><i className="fas fa-book"></i>Learn</a></li>
                    {/* <li><a href="#"><i className="fas fa-phone"></i>Contact us</a></li> */}
                    <li><a href="#" onClick={() => {localStorage.removeItem("user") 
                        localStorage.removeItem("token")
                        navigate("/login")}}>
                        <i className="fas fa-sign-out-alt"></i>Log Out</a></li>
                    <div className="icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-github"></i></a>
                        <a href="#"><i className="fab fa-youtube"></i></a>
                    </div>
                    </ul>
                </nav>
            </div>
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
              <Grid item xs={12}>
                <label htmlFor="resume-upload" style={{ marginTop: "10px" }}>
                  Resume: &nbsp; &nbsp; &nbsp; &nbsp;
                  <input
                    id="resume-upload"
                    name="resume-upload"
                    type="file"
                    accept='.pdf'
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0])
                    }}
                  />
                </label>
                {user.resume !== "" && (
                  <label htmlFor="resume-upload" style={{ marginTop: "5px" }}>
                    <Link href={`${config.SERVER_API_URL}/download-resume/${user._id}`} variant="body2">
                      {"Previously uploaded"}
                    </Link>
                  </label>
                )}
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
    </>
  );
}