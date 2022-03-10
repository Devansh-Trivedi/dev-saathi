import React, { useState } from "react";
import "./NewProjectForm.css";
import { formDataSubmit } from "../api/form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { uploadImageApi } from "../api/user";

const NewProjectForm = () => {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    nameProj: "",
    requirements: "",
    repo: "",
    url: "",
    projDetails: "",
  });
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);

  // const res = await fetch(
  //   `https://api.github.com/search/repositories?q=test+${details.requirements}+in:readme+stars:50`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const data = await res.json();

  // console.log(data.items[0].owner.login);

  let name, value;
  const handleForm = (e) => {
    name = e.target.name;
    value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  fetch(
    `https://api.github.com/search/repositories?q=test+${details.requirements}+in:readme+stars:50`
  ).then((res) => {
    res.json().then((data) => {
      console.log(data.items[0].owner.login);
      console.log(data.items);
      setData(data.items);
    });
  });

  const submitForm = async (e) => {
    e.preventDefault();
    const { nameProj, requirements, repo, url, projDetails } = details;
    if (nameProj === "" || requirements === "" || projDetails === "") {
      toast.error("Name, requriements and project details are required.");
    } else if (image !== null) {
      const formData = new FormData();
      formData.append("projectImage", image);
      uploadImageApi(formData)
        .then((res) => {
          if (!res.data.success) {
            toast.error(
              res.data.message || "Something went wrong when uploading image."
            );
          } else {
            console.log(res.data.fileName);
            addProject(res.data.fileName);
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          toast.error(
            err.response.data
              ? err.response.data.message
              : "Something went wrong when uploading image"
          );
        });
    } else {
      addProject();
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
      imgURL: fileName,
    })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong.");
      });
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
            <input
              type="file"
              accept=".png"
              onChange={(e) => setImage(e.target.files[0])}
            />
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

        <table id="customers">
          <tr>
            <th>Repo Name</th>
            
            <th>Username</th>
            <th>Github Profile</th>
            <th>Description</th>
            <th>Git Commit Url</th>
          </tr>

          {data.map((item) => {
            return (
              <tr>
                <td style={{ maxWidth: "10%" }}>{item.full_name}</td>
                
                <td>{item.owner.login}</td>
                <td>{item.owner.html_url}</td>
                <td>{item.description}</td>
                <td>{item.git_commits_url}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default NewProjectForm;
