import React from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap';
import SideDrawer from '../SideDrawer'
function projectList(){
    return(
        <Navbar bg="light" variant="light">
            <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            </Container>
            {/* <SideDrawer/> */}
        </Navbar>

     
    );
}

export default projectList;