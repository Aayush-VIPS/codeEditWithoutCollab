// frontend/src/pages/Dashboard.js
import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import CodeEditor from "../components/codeEditor";
import "./dashboard.js";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="workspace">
        <Sidebar />
        <div className="main-content">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
