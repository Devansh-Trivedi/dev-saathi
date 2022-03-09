import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userProfile } from '../../api/user';
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill';
import { Octokit } from "@octokit/core";
import 'react-quill/dist/quill.snow.css';
import GITHUB_TOKEN from '../../GITHUB_TOKEN'

const theme = createTheme();

export default function UserProfilePage() {
  const octokit = new Octokit({ auth: GITHUB_TOKEN.GITHUB_TOKEN });

  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get('userId');

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(true)
  const [userData, setUserData] = React.useState({})
  const [repos, setRepos] = React.useState([])
  const [topics, setTopics] = React.useState([])

  React.useEffect(() => {
    setLoading(true)
    userProfile(userId)
      .then(res => {
        if (res.data.success) {
          toast.success("User profile found")
          setUserData(res.data.userData)
          setLoading(false)
          setError(false)
          githubData(res.data.userData.githubID.replace("github.com/", ""))
        } else {
          setError(true)
          toast.error(res.data.message || "Profile not found")
          setLoading(false)
        }
      }).catch(err => {
        console.log(err)
        setError(true)
        setLoading(false)
        toast.error("Something went wrong when fetching user profile")
      })
  }, [])

  const githubData = async (githubName) => {
    const allRepos = await octokit.request(
      `GET /users/{user}/repos`, { user: githubName }
    );
    const items = allRepos.data.slice(0, 8)
    setRepos(items)
    let topicArray = []
    for (let i = 0; i < items.length; i++) {
      const element = items[i].topics;
      for (let j = 0; j < element.length; j++) {
        const topic_1 = element[j];
        console.log(topic_1)
        topicArray.push(topic_1)
      }
    }
    setTopics(topicArray)
  }

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <div
          style={{
            textAlign: 'center',
            padding: "50px"
          }}>
          <CircularProgress />
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Loading User Profile
          </Typography>
        </div>
      ) : error ? (
        <div
          style={{
            textAlign: 'center',
            padding: "50px"
          }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="red"
            gutterBottom
          >
            User Profile Not Found
          </Typography>
        </div>
      ) : (
        (
          <main>
            {/* Hero unit */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  {userData.name !== undefined ? userData.name : userData.email}
                </Typography>
                {userData.previousProjects !== "" && userData.previousProjects !== undefined && (
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Previous Projects
                    <ReactQuill
                      value={userData.previousProjects}
                      readOnly={true}
                      theme={"snow"}
                    />
                  </Typography>
                )}

                {userData.techStack.length > 0 && userData.techStack !== undefined && (
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Tech Stack: {userData.techStack.join(",")}
                  </Typography>
                )}

                {userData.githubID !== "" && userData.githubID !== undefined && (
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Github : {userData.githubID}
                  </Typography>
                )}

                {userData.linkedin !== "" && userData.linkedin !== undefined && (
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Linkedin : {userData.linkedin}
                  </Typography>
                )}
                {userData.stackOverflow !== "" && userData.stackOverflow !== undefined && (
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    StackOverflow : {userData.stackOverflow}
                  </Typography>
                )}
              </Container>
            </Box>
            <Container maxWidth="md">
              {/* End hero unit */}
              <Typography
                component="h3"
                variant="h5"
                align="center"
                color="text.primary"
                gutterBottom
              >
                User Repositories
              </Typography>
              <Grid container spacing={2}>
                {repos.map((card, key) => (
                  <Grid item key={key} xs={12} sm={6} md={3}>
                    <Card
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <CardMedia
                        component="img"
                        image="https://source.unsplash.com/random"
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.name}
                        </Typography>
                        <Typography>
                          {card.description}
                        </Typography>
                        <Typography>
                          Stars - {card.stargazers_count} Forks - {card.forks_count}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <a href={`${card.html_url}`}><Button size="small" >View</Button></a>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
            {topics.length > 0 && (
              <Container maxWidth="md" style={{ marginTop: '35px', marginBottom: '20px' }}>
                {/* End hero unit */}
                <Typography
                  component="h3"
                  variant="h5"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  User Interested Topics
                </Typography>
                {topics.join(", ")}
              </Container>
            )}
          </main>
        )
      )
      }

    </ThemeProvider >
  );
}