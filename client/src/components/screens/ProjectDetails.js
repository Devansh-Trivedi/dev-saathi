import React, {useState, useEffect} from 'react';
import {BrowserRouter,Route,Switch,useHistory,useNavigate} from 'react-router-dom'
import { Navbar, Nav, Container, Row, Col, Card, Button,Form } from 'react-bootstrap';
// import {USER_ID, TEMPLATE_ID} from "../EmailKey"
// import{ init } from '@emailjs/browser';
// init("ybsRwsRKyMaaX77Y8");

import emailjs from "emailjs-com"

import Preview from  "./preview.png";
function ProjectList(){
    let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     emailjs.sendForm(`gmail`, apiKey.TEMPLATE_ID, e.target, apiKey.USER_ID)
    //     .then((result) => {
    //     alert("Message Sent, We will get back to you shortly", result.text);
    //     },
    //     (error) => {
    //     alert("An error occurred, Please try again", error.text);
    //     });
    // };

    function sendEmail(e){
        e.preventDefault();
        

    emailjs.sendForm('service_9k6158q','template_3hz53ld',e.target,'ybsRwsRKyMaaX77Y8')
        .then((result)=>{
            console.log(result.text);
        },(error)=>{
            console.log(error.text);
        });
        e.target.reset()
    }
    return(

        <div>
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="/">Dev Saathi</Navbar.Brand>
                <Nav className="me-auto">
                {/* <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
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
                    <li><a href="#"><i className="fas fa-home"></i>Home</a></li>
                    <li><a href="#" onClick={() => {navigate("/profile-update")}}><i className="fas fa-user"></i>Profile</a></li>
                    <li><a href="#"><i className="fas fa-sliders-h"></i>Projects</a></li>
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

            <Container style={{marginTop:"100px"}}>
                <Col>
                    <Row style={{marginTop:"30px", marginBottom:"30px"}}> 
                        <Card border="secondary" style={{ width: '80rem' }}>
                            <Card.Img variant="top" src={Preview} style={{width:"580px", marginLeft:"auto",marginRight:"auto"}} />
                            <Card.Header>Project name</Card.Header>
                            <Card.Body>
                            <Card.Title>Description:</Card.Title>
                            <Card.Text>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
                            </Card.Text>
                            <Card.Title>Tags:</Card.Title>
                            <Card.Text>
                                Reactjs, Nodejs, MongoDB
                            </Card.Text>
                            <Card.Title>Github Link:</Card.Title>
                            <Card.Text style={{color:"blue"}}>
                                <Button variant="light" href="https://github.com/rishank-shah/food-delivery-app" target="_blank" >https://github.com/rishank-shah/food-delivery-app</Button> 
                            </Card.Text>
                            <Card.Title>Let the Project owner know that you are interested in his Project and share your view:</Card.Title>
                            <form onSubmit={sendEmail}>
                                <div className="row pt-5 mx-auto">
                                    <div className="col-8 form-group mx-auto">
                                        <input type="text" className="form-control" placeholder="Name" name="name" />
                                    </div>
                                    <div className="col-8 form-group pt-2 mx-auto">
                                        <input type="email" className="form-control" placeholder="Email" name="email" />
                                    </div>
                                    <div className="col-8 form-group pt-2 mx-auto">
                                        <input type="text" className="form-control" placeholder="Phone Number" name="phoneNumber" />
                                    </div>
                                    <div className="col-8 form-group pt-2 mx-auto">
                                        <textarea className="form-control" id='' cols="30" rows="8" placeholder="Your messsage" name="message"></textarea>
                                    </div>
                                    <div className="col-8 pt-3 mx-auto">
                                        <input type="submit" className="btn btn-info" value="Send Message"></input>
                                    </div>
                                    
                                </div>
                                

                            </form>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
            </Container>
        </div>
        

        // <h1>ProjectList</h1>
    );
}

export default ProjectList;