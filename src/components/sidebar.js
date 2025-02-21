// frontend/src/components/Sidebar.js
import React, { useEffect, useState } from "react";
import axios from "axios";

import "./sidebar.css";

const Sidebar = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    // Fetch projects from backend
    axios.get("http://localhost:5000/api/projects")
      .then((res) => {
        setProjects(res.data);
        if (res.data.length > 0) setCurrentProject(res.data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <aside className="sidebar">
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}
              onClick={() => setCurrentProject(project)}
              style={{ cursor: "pointer", fontWeight: project.id === (currentProject && currentProject.id) ? "bold" : "normal" }}>
            {project.name}
          </li>
        ))}
      </ul>
      {currentProject && (
        <>
          <h3>Folders</h3>
          <ul>
            {currentProject.folders.map((folder, idx) => (
              <li key={idx}>{folder}</li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
