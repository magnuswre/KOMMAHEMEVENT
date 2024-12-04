import React, { useState } from "react";
import CreateEvent from "./CreateEvent/CreateEvent";
import "./Event.css";

const Event = () => {
  const [events, setEvents] = useState(true);
  return (
    <div className="event-container">
      {events && <p>Lista med mina Event</p>}
      <p>eller skapa event</p>
      <CreateEvent />
    </div>
  );
};

export default Event;
