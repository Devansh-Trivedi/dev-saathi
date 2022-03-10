import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

const Home = () => {
  let navigate = useNavigate();
  return (
    <>
      {/* <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/" style={{}} >Dev Saathi</Navbar.Brand>
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
        {/* </Container>
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
                    <li><a href="/"><i className="fas fa-home"></i>Home</a></li>
                    <li><a href="#" onClick={() => {navigate("/profile-update")}}><i className="fas fa-user"></i>Profile</a></li>
                    <li><a href="/ProjectList"><i className="fas fa-sliders-h"></i>Projects</a></li>
                    {/* <li><a href="#"><i className="fas fa-envelope"></i>Messages</a></li> */}
                    {/* <li><a href="#"><i className="fas fa-cog"></i>Settings</a></li> */}
                    <li><a href="#" onClick={() => {navigate("/learn")}}><i className="fas fa-book"></i>Learn</a></li>
                    {/* <li><a href="#"><i className="fas fa-phone"></i>Contact us</a></li> */}
                    <li><a href="#" onClick={() => {navigate("/UserGithubProfile")}}><i className="fab fa-github"></i>GitHub</a></li>
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

      <Container>
        <Row>
          <Col> 
          <div>
          <h1 style={{ margin: "auto", width: "20%", marginTop:"100px" }}>Dev-Saathi</h1>
          </div>
          <br />
          </Col>
        </Row>

        <Row>
          <Col>
              <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize:"20px"
             
            }}
          >
            <p>
              Good coders create amazing products, but great coders also interact
              with communities and promote their work. Being at an all-time high in
              demand activity for Open Source, it can be extremely difficult for
              developers to find collaborators for their projects and/or find people
              to discuss projects with. This platform is for developers enabling
              other developers to find projects to contribute to and project owners
              to find collaborators.
            </p>
          </div>  
          </Col>
        </Row>

        

      </Container>
      <Container style={{margin:"auto", width:"35%"}}>
      <Row>
            <Col>
            
            <br />
            <br />
            <div className="btn">
              <a href="ProjectForm">
                <span>I want a Collaborator</span>
              </a>
            </div>
            <br />
            
            </Col>
        </Row>
        <Row>
            <Col>
            <div>
            <p style={{margin:"auto", width:"10%"}}>OR</p>
            </div>
              
            </Col>
        </Row>

        <Row>
            <Col>
            <div >
            <div className="btn">
              <a href="ProjectList">
                <span>I want to Collaborate</span>
              </a>
            </div>
            </div>
            </Col>
        </Row>
      </Container>
      
      
      
    </>
  );
};

export default Home;
