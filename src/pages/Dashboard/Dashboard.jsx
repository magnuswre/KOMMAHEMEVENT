import React from "react";
import "./Dashboard.css";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import { ApiContext } from "../../context/ApiContext";

const Dashboard = () => {
  const { user } = useContext(ApiContext);
  return (
    <div>
      <DashboardComponent user={user} />
    </div>
  );
};

export default Dashboard;
