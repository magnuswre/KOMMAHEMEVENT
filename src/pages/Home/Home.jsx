import React from "react";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="Links">
        <Link className="" to="/register">
          Registrera
        </Link>
        <Link className="" to="/login">
          Logga in
        </Link>
      </div>
    </div>
  );
};

export default Home;
