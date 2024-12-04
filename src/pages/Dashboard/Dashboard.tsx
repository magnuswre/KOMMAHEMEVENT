import React from "react";
import "./Dashboard.css";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { userId } = useParams();
  return (
    <div>
      <DashboardComponent userId={userId} />
    </div>
  );
};

export default Dashboard;
