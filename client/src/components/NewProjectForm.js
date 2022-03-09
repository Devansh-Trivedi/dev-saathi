import React, { useState } from "react";
import "./NewProjectForm.css";
import { formDataSubmit } from "../api/form";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

const NewProjectForm = () => {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    nameProj: "",
    requirements: "",
    repo: "",
    url: "",
    projDetails: "",
  });
  const [imgURL,setImgURL] = useState("")

  let name, value;
  const handleForm = (e) => {
    name = e.target.name;
    value = e.target.value;

    setDetails({ ...details, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const { nameProj, requirements, repo, url, projDetails,imgURL } = details;
    formDataSubmit({
      nameProj,
      requirements,
      repo,
      url,
      projDetails,
      imgURL
    }).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/")
      } else {
        toast.error(res.data.message)
      }
    }).catch(err => {
      toast.success('Something went wrong.')
    })
  };

  return (
    <>
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
            <span>Uplaod Image</span>
            <input type="file" onChange={(e)=>setImgURL(e.target.files[0])} />
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
      </div>
    </>
  );
};

export default NewProjectForm;
