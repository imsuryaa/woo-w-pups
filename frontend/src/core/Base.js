import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  className = "bg-dark text-white",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className={className}>{children}</div>
    </div>
    <footer className="footer position-absolute w-100 bg-dark mt-auto py-3">
      <div
        className="container-fluid text-dark text-center py-3"
        style={{ backgroundColor: "#E8BD0D" }}
      >
        <h4>If you got any questions, feel free to reach out</h4>
        <button
          className="btn btn-lg"
          style={{ backgroundColor: "#E92929", borderRadius: "12px" }}
        >
          Contact us
        </button>
      </div>
      <div className="container">
        <span className="text-muted">
          <span className="text-white">Woo W' Pups</span> built with MERN
          Stack
        </span>
      </div>
    </footer>
  </div>
);

export default Base;