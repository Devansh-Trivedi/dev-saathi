import React, { useState } from "react";
import "./NewProjectForm.css";
import { formDataSubmit } from "../api/form";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { uploadImageApi } from "../api/user";
import {Form, Button , Navbar, Container} from "react-bootstrap"
const NewProjectForm = () => {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    nameProj: "",
    requirements: "",
    repo: "",
    url: "",
    projDetails: "",
  });
  const [image, setImage] = useState(null)

  let name, value;
  const handleForm = (e) => {
    name = e.target.name;
    value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { nameProj, requirements, repo, url, projDetails } = details;
    if (nameProj === "" || requirements === "" || projDetails === "") {
      toast.error("Name, requriements and project details are required.")
    } else if (image !== null) {
      const formData = new FormData();
      formData.append('projectImage', image);
      uploadImageApi(formData)
        .then((res) => {
          if (!res.data.success) {
            toast.error(res.data.message || "Something went wrong when uploading image.");
          } else {
            console.log(res.data.fileName)
            addProject(res.data.fileName)
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toast.error(err.response.data ? err.response.data.message : "Something went wrong when uploading image");
        });
    } else {
      addProject()
    }

  };

  const addProject = async (fileName) => {
    const { nameProj, requirements, repo, url, projDetails } = details;
    formDataSubmit({
      nameProj,
      requirements,
      repo,
      url,
      projDetails,
      imgURL: fileName
    }).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/")
      } else {
        toast.error(res.data.message)
      }
    }).catch(err => {
      toast.error('Something went wrong.')
    })
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


      <div class="container">
      
        <form id="contact" action="" method="post">
          <h3>Collaborator Form</h3>

          <fieldset>
            <input
              placeholder="Project Name"
              type="text"
              name="nameProj"
              tabindex="1"
              value={details.nameProj}
              onChange={handleForm}
              required
              autofocus
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Project Requirements"
              type="email"
              name="requirements"
              tabindex="2"
              value={details.requirements}
              onChange={handleForm}
              required
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Project Repository"
              type="tel"
              name="repo"
              tabindex="3"
              value={details.repo}
              onChange={handleForm}
              required
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Your Web Site (optional)"
              type="url"
              name="url"
              tabindex="4"
              value={details.url}
              onChange={handleForm}
              required
            />
          </fieldset>
          <fieldset>
            <textarea
              placeholder="Details about the Project"
              tabindex="5"
              value={details.projDetails}
              onChange={handleForm}
              name="projDetails"
              required
            ></textarea>
          </fieldset>
          <fieldset>
            <input type="file" accept='.png' onChange={(e) => setImage(e.target.files[0])} />
          </fieldset>
          <fieldset>
            <button
              name="submit"
              type="submit"
              id="contact-submit"
              data-submit="...Sending"
              onClick={submitForm}
            >
              Submit
            </button>
          </fieldset>
        </form>


        {/* <Form>
        <h3>Collaborator Form</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail" value={details.nameProj} onChange={handleForm}>
            <Form.Label>Project Name</Form.Label>
            <Form.Control  placeholder="Enter Project Name" name="nameProj"/>
            
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail" value={details.requirements}>
            <Form.Label>Project Requirements</Form.Label>
            <Form.Control name="requirements"  placeholder="Enter Project Requirements" />
            
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail" value={details.repo}>
            <Form.Label>Project Repository</Form.Label>
            <Form.Control name="repo"  placeholder="Enter Project Repository" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail" value={details.url}>
            <Form.Label>Your Web Site (optional)</Form.Label>
            <Form.Control name="url"  placeholder="Enter Your Web Site (optional)" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" value={details.projDetails}>
          <Form.Label>Details about the Project</Form.Label>
          <Form.Control name="projDetails"  as="textarea" rows={3} />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])}/>
          </Form.Group>
                  
          <Button variant="primary" name="submit" type="submit" onClick={submitForm}>
            Submit
          </Button>
      </Form> */}
      </div>
    </>
  );
};

export default NewProjectForm;
