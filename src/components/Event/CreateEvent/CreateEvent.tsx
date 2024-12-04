import "./CreateEvent.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const initState = {
    position: { lat: "", lng: "", address: "" },
    TypeOfEvent: "",
    customEvent: "",
    title: "",
    description: "",
    startTime: "00:00",
    endTime: "00:00",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initState);
  const [error, setError] = useState({
    position: "",
    date: "",
    TypeOfEvent: "",
    customEvent: "",
    title: "",
    description: "",
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    console.log("Start Date:", date);
    setStartDate(date);
    if (endDate < date) {
      setError((prevError) => ({
        ...prevError,
        date: "Slutdatum kan inte vara före startdatum",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        date: "", // Clear any previous date errors
      }));
    }
  };

  const handleEndDateChange = (date) => {
    console.log("End Date:", date);
    if (date < startDate) {
      setError((prevError) => ({
        ...prevError,
        date: "Slutdatum kan inte vara före startdatum",
      }));
    } else {
      setEndDate(date);
      setError((prevError) => ({
        ...prevError,
        date: "",
      }));
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    const newError = { ...error };

    if (!formData.position) {
      newError.position = "Du behöver ange en plats";
      hasError = true;
    }

    if (!formData.TypeOfEvent) {
      newError.TypeOfEvent = "Du behöver välja en typ av event";
      hasError = true;
    }

    if (formData.TypeOfEvent === "other" && !formData.customEvent) {
      newError.customEvent = "Du behöver ange en eventtyp";
      hasError = true;
    }

    if (!formData.title) {
      newError.title = "Du behöver ange en rubrik";
      hasError = true;
    }

    if (!formData.description) {
      newError.description = "Du behöver ange en beskrivning";
      hasError = true;
    }

    setError(newError);

    if (hasError) return;

    try {
      const response = await fetch("http://localhost:3004/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          position: formData.position,
          TypeOfEvent: formData.TypeOfEvent,
          customEvent: formData.customEvent,
          title: formData.title,
          description: formData.description,
          startDate,
          endDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong while creating the event");
      }

      const newEvent = await response.json();
      console.log("New event created:", newEvent);

      setFormData(initState);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="create-event-container">
      <div className="create-event-create-form">
        <form className="create-event-form" onSubmit={handleSubmit}>
          <p className="create-event-form-text">Skapa event:</p>
          <div className="create-event-form-group">
            <label htmlFor="position">Plats:</label>
            {/* You can implement the actual EventMapComponent later */}
            <input
              type="text"
              name="position"
              placeholder="Enter a location"
              onChange={handleChangeInput}
              value={formData.position.address}
            />
            {error.position && (
              <p className="create-event-error-message">{error.position}</p>
            )}
          </div>
          <div className="create-event-form-group">
            <label htmlFor="date">Startdatum:</label>
            {/* Example for date picker */}
            <input
              type="date"
              name="startDate"
              value={startDate.toISOString().substring(0, 10)}
              onChange={(e) => handleStartDateChange(new Date(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="">Starttid:</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="create-event-form-group">
            <label htmlFor="date">Slutdatum:</label>
            <input
              type="date"
              name="endDate"
              value={endDate.toISOString().substring(0, 10)}
              onChange={(e) => handleEndDateChange(new Date(e.target.value))}
            />
            {error.date && (
              <p className="create-event-error-message">{error.date}</p>
            )}
          </div>
          <div>
            <label htmlFor="">Sluttid:</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="create-event-form-group">
            <label htmlFor="TypeOfEvent">Typ av event:</label>
            <select
              name="TypeOfEvent"
              id="TypeOfEvent"
              onChange={handleChangeInput}
              value={formData.TypeOfEvent}
              className="event-form-select"
            >
              <option value="">Välj typ av event</option>
              <option value="wedding">Bröllop</option>
              <option value="party">Fest</option>
              <option value="birthday">Födelsedag</option>
              <option value="corporate">Företagsevent</option>
              <option value="funeral">Begravning</option>
              <option value="other">Annan</option>
            </select>
            {error.TypeOfEvent && (
              <p className="create-eventerror-message">{error.TypeOfEvent}</p>
            )}
            {formData.TypeOfEvent === "other" && (
              <>
                <input
                  type="text"
                  name="customEvent"
                  value={formData.customEvent}
                  onChange={handleChangeInput}
                  placeholder="Ange eventtyp"
                />
                {error.customEvent && (
                  <p className="create-event-error-message">
                    {error.customEvent}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="create-event-form-group">
            <label htmlFor="title">Rubrik:</label>
            <textarea
              name="title"
              value={formData.title}
              onChange={handleChangeInput}
              placeholder="Rubrik"
              className="event-form-textarea"
            ></textarea>
            {error.title && (
              <p className="create-event-error-message">{error.title}</p>
            )}
          </div>
          <div className="create-event-form-group">
            <label htmlFor="description">Beskrivning:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChangeInput}
              placeholder="Beskrivning"
              className="event-form-textarea"
            ></textarea>
            {error.description && (
              <p className="create-event-error-message">{error.description}</p>
            )}
          </div>
          <button id="create-event-btn">Godkänn</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
