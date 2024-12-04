import React, { useContext, useState } from "react";
import { checkIfEmpty } from "../../Validation";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { ApiContext } from "../../context/ApiContext";
// import TermsOfUse from "../../../components/data/TermsOfUse";
// import UserCondition from "../../../components/data/UserCondition";

const initState = {
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const { registerUser } = useContext(ApiContext);
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState(initState);
  const [showTerms, setShowTerms] = useState(false);

  const [error, setError] = useState({
    email: "",
    // phone: "",
    password: "",
    // confirmPassword: "",
    // terms: "",
  });

  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowTerms((prev) => !prev);
  };

  const handleChangeInput = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });

    if (name === "terms") {
      setTermsAccepted(checked);
      if (checked) {
        setError((prevError) => {
          return {
            ...prevError,
            terms: "",
          };
        });
      }
    } else {
      setError((prevError) => {
        return {
          ...prevError,
          [name]: "",
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    // navigate("/login");

    e.preventDefault();

    // let hasError = false;

    // if (checkIfEmpty(formData.email)) {
    //   setError((data) => {
    //     return {
    //       ...data,
    //       email: "Du behöver ange en e-postadress",
    //     };
    //   });
    //   hasError = true;
    // }

    // if (checkIfEmpty(formData.phone)) {
    //   setError((data) => {
    //     return {
    //       ...data,
    //       phone: "Du behöver ange ett telefonnummer",
    //     };
    //   });
    //   hasError = true;
    // }

    // if (checkIfEmpty(formData.password)) {
    //   setError((data) => {
    //     return {
    //       ...data,
    //       password: "Du behöver ange ett lösenord",
    //     };
    //   });
    //   hasError = true;
    // }

    // if (formData.password !== formData.confirmPassword) {
    //   setError((data) => {
    //     return {
    //       ...data,
    //       confirmPassword: "Lösenorden matchar inte",
    //     };
    //   });
    //   hasError = true;
    // }

    // if (!termsAccepted) {
    //   setError((data) => {
    //     return {
    //       ...data,
    //       terms: "Du måste acceptera användarvillkoren",
    //     };
    //   });
    //   hasError = true;
    // }

    // if (hasError) return;

    // const { confirmPassword, terms, ...userDataToSend } = formData;

    // registerUser(userDataToSend)
    //   .then(() => {
    //     console.log("User registered successfully");
    //     navigate("/login");
    //   })
    //   .catch((error) => {
    //     console.error("Error registering user:", error);
    //   });

    // setFormData(initState);

    registerUser(formData)
      .then(() => {
        console.log("User registered successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="register-container">
      <div className="register-create-form">
        <form className="register-form" onSubmit={handleSubmit}>
          <p className="register-form-text">Registrera ditt konto här:</p>
          <div className="register-form-group">
            <label htmlFor="email">E-post*</label>
            <input
              type="email"
              name="email"
              className="register-input"
              id="email"
              value={formData.email}
              onChange={handleChangeInput}
            />
            <p className="register-error-text">{error.email}</p>
          </div>
          <div className="register-form-group">
            <label htmlFor="phone">Telefonnummer*</label>
            <input
              type="text"
              name="phone"
              className="register-input"
              id="register-phone"
              value={formData.phone}
              onChange={handleChangeInput}
            />
            <p className="register-error-text">{error.phone}</p>
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Lösenord*</label>
            <input
              type="password"
              name="password"
              className="register-input"
              id="register-password"
              value={formData.password}
              onChange={handleChangeInput}
            />
            <p className="register-error-text">{error.password}</p>
          </div>
          <div className="register-form-group">
            <label htmlFor="confirmPassword">Bekräfta lösenordet*</label>
            <input
              type="password"
              name="confirmPassword"
              className="register-input"
              id="register-confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChangeInput}
            />
            <p className="register-error-text">{error.confirmPassword}</p>
          </div>
          <div className="register-form-group-terms">
            <div className="register-form-group-input-btn">
              <input
                className="register-checkbox"
                type="checkbox"
                name="terms"
                checked={termsAccepted}
                onChange={handleChangeInput}
              />
              <button onClick={handleTermsClick} className="register-text">
                Jag har läst och accepterar användarvillkoren
              </button>
            </div>
            <div>
              <p className="register-error-text">{error.terms}</p>
            </div>
          </div>
          {showTerms && (
            <div className="modal-InformationText" onClick={handleTermsClick}>
              <div
                className="modal-content-InformationText"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <UserCondition />
                  <TermsOfUse />
                </div>
                <button
                  className="modal-close-InformationText"
                  onClick={handleTermsClick}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <button id="register-Btn">Godkänn</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
