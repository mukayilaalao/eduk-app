import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Admin.css";

function Admin() {
  return (
    <div className="admin">
      <h1 id="admin-page-title">Welcome EDUK Admin!</h1>
      <br />
      {/* <div className="admin_nav">
        <Link to="/admin/pendings">Pending Lists</Link>

        <Link to="/admin/users">All Users</Link>
        <Link to="/admin/resources_usage">Resources Usage</Link>
      </div> */}

      <nav className="navbar navbar-light">
        <Link to="/admin/pendings">Pending Lists</Link>
        <Link to="/admin/users">All Users</Link>
        <Link to="/admin/resources_usage">Resources Usage</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default Admin;
