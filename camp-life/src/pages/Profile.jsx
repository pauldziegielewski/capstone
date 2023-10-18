import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Registration from "../comps/Registration";
import Login from "../comps/Login";
import Benefit from "../comps/Benefits";

export default function Profile({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false); // State for registration toggle
  const [selectedItems, setSelectedItems] = useState([]);
  const userToken = localStorage.getItem("token");


  const toggleForm = () => {
    setIsRegistered(!isRegistered); // Toggle the registration state
  };

  const handleSelectItem = (itemName) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemName)) {
        return prevSelectedItems.filter((item) => item !== itemName);
      } else {
        return [...prevSelectedItems, itemName];
      }
    });
  };



  const handleSaveItems = async () => {
    if (isAuthenticated) {
      try {
       
        const response = await fetch("http://localhost:3000/api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": userToken,
          },
          body: JSON.stringify({
            userID: user.id,
            name: selectedItems,
            checked: true,
          }),
        });

        if (response.status === 201) {
          // Handle success if needed
        } else {
          // Handle the case when the response status is not 201
          // This might indicate a failure in saving items
        }
      } catch (error) {
        console.error("Saving items error:", error);
        // Handle the error
      }
    } else {
      alert("Please log in to save your selections.");
    }
  };

  const handleButtonClick = () => {
    navigate("/Dashboard");
  };


  // After successful login, store the token in Local Storage
localStorage.setItem("token", userToken);

// Include the token in your authenticated requests
const token = localStorage.getItem("token");
fetch("/api/protected", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-access-token": token,
  },
});


  return (
    <div className="terms">
      <h1>
        {isRegistered
          ? "Login to access benefits"
          : "Register to get the following benefits"}
      </h1>

      <Benefit
        // Pass the handleSelectItem function to Benefit component if needed
        handleSelectItem={handleSelectItem}
      />

      {isRegistered ? (
        <Login setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Registration
          setIsAuthenticated={setIsAuthenticated}
          toggleAuthentication={toggleForm}
        />
      )}

      <button onClick={toggleForm}>
        {isRegistered
          ? "Not registered? Register here"
          : "Already registered? Login here"}
      </button>
    </div>
  );
}
