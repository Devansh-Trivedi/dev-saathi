import React,{useState,useEffect} from 'react'
import '../UserGithubProfile.css'
import {Form, Button, Card} from 'react-bootstrap'
function UserProfilePage(){
    const [name, setName] =  useState('');
    const [userName, setuserName] =  useState('');
    const [followers, setsetFollowers] =  useState('');
    const [folloing, setFollowing] =  useState('');
    const [repos, setRepos] =  useState('');
    const [avatar, setAvatar] =  useState('');
    const [userInput, setUserInput] =  useState('');
    const [error, setError] =  useState('');

    const [url, setUrl] =  useState('');
    const [repoUrl, setRepoUrl] = useState('');

    useEffect(()=>{
        fetch("https://api.github.com/users/Devansh-Trivedi")
        .then(res=>res.json())
        .then(data=>{
            setData(data);
            // console.log(data);
        });
    },[]);


    
    const handleSearch = e =>{
        setUserInput(e.target.value);
    }

    const handleSubmit=()=>{
        fetch(`https://api.github.com/users/${userInput}`)
        .then(res=>res.json())
        .then(data=>{
            if(data=>{
                if(data.message){
                    setError(data.message);
                }
                else{
                    setData(data);  
                }
            });
        });
    }


    const setData = ({name,login, followers,following, public_repos,avatar_url, url, repos_url})=>{
        setName(name);
        setuserName(login);
        setsetFollowers(followers);
        setFollowing(following);
        setRepos(public_repos);
        setAvatar(avatar_url);
        setUrl(url);
        setRepoUrl(repos_url);
    }

    // const [Rname, setRName] =  useState('');
    // const [RFullname, setRFullName] =  useState('');
    // const [RHtmlUrl, setRHtmlUrl] =  useState('');
    // const [forks, setForks] = useState('');

    // useEffect(()=>{
    //     const RepoURI = repoUrl;
    //     fetch(RepoURI)
    //     .then(res=>res.json())
    //     .then(repodata=>{
    //         setRepoData(repodata);
    //         console.log(repodata);
    //     });
    // });

    // const setRepoData = ({name,full_name, html_url, forks})=>{
    //     setRName(name);
    //     setRFullName(full_name);
    //     setRHtmlUrl(html_url);
    //     setForks(forks);
    // }


    return(
        <div>
                {/* <div className='navbar'>
                    Github Search
                </div>
                <div className='search'>
                <Form onSubmit={handleSubmit}>
                    

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control placeholder="Github Username" name="userInput" onChange="handleSearch" />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Get data
                    </Button>
                </Form>
                </div> */}

            <div className='card' style={{margin:"auto", width:"50%"}}> 
            <Card>
            <Card.Img variant="top" src={avatar}  style={{height:"600px", width:"auto"}} />
            <Card.Body>
                <Card.Title>Name: {name}</Card.Title>
                <Card.Title>
                    following: {folloing}
                </Card.Title>
                <Card.Title>
                    followers: {followers}
                </Card.Title>
                <Card.Title>
                    Public Repositories: {repos}
                </Card.Title>
                <Card.Title>
                    Username: {userName}
                </Card.Title>
                <Card.Title>
                    Url: {url}
                </Card.Title>
                {/* <Card.Title>
                    Repo: {RHtmlUrl}
                </Card.Title>
                <Card.Text>{RFullname}</Card.Text>
                <Card.Text>{Rname}</Card.Text>
                <Card.Text>{forks}</Card.Text> */}

            
            </Card.Body>
            </Card>
            </div>
        </div>
    );
}

export default UserProfilePage;