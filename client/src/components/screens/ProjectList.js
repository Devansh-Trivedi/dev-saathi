import React,{useState,useEffect,useContext} from 'react'
import {BrowserRouter,Route,Switch,useHistory, useNavigate} from 'react-router-dom'
import { Navbar, Nav, Container, Row, Col, Card, Button } from 'react-bootstrap';
import Preview from  "./preview.jpg";
import { listProjectApi } from '../../api/user';
import { toast } from 'react-toastify';
function ProjectList(){
    const [data,setData] = useState([])
    let navigate = useNavigate();

    useEffect(()=>{
        listProjectApi().then(res=>{
            if(res.data.success){
toast.success("Projects Fetched")
setData(res.data.projects)
            }else{
toast.error("Something went wrong when fecthing projects")
            }
        }).catch(err=>{
            toast.error("Something went wrong when fecthing projects")

        })
    },[])

    return(

        <div>
            {/* <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="#home">Dev Saathi</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                </Container>
            </Navbar> */}

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
                    <li><a href="#"><i className="fas fa-home"></i>Home</a></li>
                    <li><a href="#" onClick={() => {navigate("/profile-update")}}><i className="fas fa-user"></i>Profile</a></li>
                    <li><a href="#"><i className="fas fa-sliders-h"></i>Projects</a></li>
                    <li><a href="#"><i className="fas fa-envelope"></i>Messages</a></li>
                    <li><a href="#"><i className="fas fa-cog"></i>Settings</a></li>
                    <li><a href="#"><i className="fas fa-book"></i>Learn</a></li>
                    <li><a href="#"><i className="fas fa-phone"></i>Contact us</a></li>
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

            {
                data.map(item=>{
                    return(
                        <Container style={{marginTop:"100px"}}>
                            <Col key={item._id}>
                                <Row style={{marginTop:"30px", marginBottom:"30px"}}> 
                                    <Card border="secondary" style={{ width: '80rem' }}>
                                        <Card.Img variant="top" src={Preview} style={{width:"580px", marginLeft:"auto",marginRight:"auto"}} />
                                        <Card.Header>{item.nameProj}</Card.Header>
                                        <Card.Body>
                                        <Card.Title>Description:</Card.Title>
                                        <Card.Text>
                                            {item.projectDetails}
                                        </Card.Text>
                                        <Card.Title>Tags:</Card.Title>
                                        <Card.Text>
                                            {item.requirements}
                                        </Card.Text>
                                        <Button variant="primary" href="/ProjectDetails"  target="_blank">View Details</Button>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Col>
                        </Container>
                    )
                })
            }
            
        </div>
        

        // <h1>ProjectList</h1>
    );
}

export default ProjectList;