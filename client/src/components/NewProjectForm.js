import React, { useState } from "react";
import "./NewProjectForm.css";

const NewProjectForm = () => {
  const [details, setDetails] = useState({
    nameProj: "",
    requirements: "",
    repo: "",
    url: "",
    projdetails: "",
  });

  let name, value;
  const handleForm = (e) => {
    name = e.target.name;
    value = e.target.value;

    setDetails({ ...details, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
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
              value={details.projdetails}
              onChange={handleForm}
              name="projdetails"
              required
            ></textarea>
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
          <p class="copyright">
            Designed by{" "}
            <a href="https://colorlib.com" target="_blank" title="Colorlib">
              Colorlib
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default NewProjectForm;
