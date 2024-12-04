import React from "react";
import "./DashboardComponent.css";
import Event from "../Event/Event";
import Driver from "../Driver/Driver";
import Passenger from "../Passenger/Passenger";

const DashboardComponent = ({ user }) => {
  return (
    <div>
      <h1>Hello {user.email}</h1>
      <Event />
      <Driver />
      <Passenger />
    </div>
  );
};

export default DashboardComponent;
