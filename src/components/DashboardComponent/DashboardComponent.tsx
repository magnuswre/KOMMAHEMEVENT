import React from "react";
import "./DashboardComponent.css";
import Event from "../Event/Event";
import Driver from "../Driver/Driver";
import Passenger from "../Passenger/Passenger";

const DashboardComponent = ({ userId }) => {
  return (
    <div>
      <h1>Hello {userId}</h1>
      <Event />
      <Driver />
      <Passenger />
    </div>
  );
};

export default DashboardComponent;
