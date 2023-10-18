
import React, { useState } from "react";
import "./Registration.css";

export default function Registration({setIsAuthenticated, toggleAutentication}) {
  // ---------------------------------STATE VARIABLES

  // Input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error messages related to validation
  const [passwordsMatchError, setPasswordsMatchError] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState("");
  const [passwordCriteriaError, setPasswordCriteriaError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordCriteriaPrompts, setPasswordCriteriaPrompts] = useState("");

  // Success messages for valid input
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);






 // ----------------Function to generate password criteria prompts
 const generatePasswordPrompts = (password) => {
  const prompts = [];

  if (password.trim().length < 6) {
    prompts.push("Password must be at least 6 characters");
  }

  if (!/(?=.*[a-z])/.test(password)) {
    prompts.push("Password must include at least one lowercase letter");
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    prompts.push("Password must include at least one uppercase letter");
  }

  if (!/(?=.*\d)/.test(password)) {
    prompts.push("Password must include at least one digit");
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    prompts.push("Password must include at least one special character");
  }

  return prompts.join("\n");
};




  // ---------------------------------  HANDLERS
  // -----------------------------------------------------------------

  // --------------------------------First Name Handler
  const handleFirstNameChange = (event) => {
    const newFirstName = event.target.value;
    setFirstName(newFirstName);

    const isFirstNameValid = newFirstName.trim().length > 1;
    setIsFirstNameValid(isFirstNameValid);
  };

  // ------------------------------------- Last Name Handler
  const handleLastNameChange = (event) => {
    const newLastName = event.target.value;
    setLastName(newLastName);

    const isLastNameValid = newLastName.trim().length > 1;
    setIsLastNameValid(isLastNameValid);
  };

  // ------------------------------------- Email Handler
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Email format validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|org|ca)$/;

    const isEmailValid = emailRegex.test(newEmail);

    setIsEmailValid(isEmailValid);

    if (!emailRegex.test(newEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  //------------------------------------ HANDLE PASSWORD

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);


    // Set password criteria prompts
  setPasswordCriteriaPrompts(generatePasswordPrompts(newPassword));

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      setPasswordsMatchError("Passwords do not match");
    } else {
      setPasswordsMatchError("");
    }

     // Check password length
  if (newPassword.trim().length < 6) {
    setPasswordLengthError("Password must be at least 6 characters");
  } else {
    setPasswordLengthError(""); // Clear the error message if the password is valid
  }

  const isPasswordValid =
    /(?=.*[a-z])/.test(newPassword) &&
    /(?=.*[A-Z])/.test(newPassword) &&
    /(?=.*\d)/.test(newPassword) &&
    /(?=.*[@$!%*?&])/.test(newPassword);

  setIsPasswordValid(isPasswordValid);
};



  //---------------------------------- HANDLE CONFIRM PASSWORD
  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check if the passwords match
    if (password !== newConfirmPassword) {
      setPasswordsMatchError("Passwords do not match");
    } else {
      setPasswordsMatchError("");
    }

    // Add success state for confirmPassword
    setIsConfirmPasswordValid(password === newConfirmPassword);
  };


  //  --------------------------------- HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    console.log('Form Data:', {
      firstName,
      lastName,
      email,
      confirmPassword,
    });

    if (
      passwordsMatchError ||
      passwordLengthError ||
      passwordCriteriaError ||
      emailError ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length < 6 ||
      confirmPassword.length < 6
    ) {
      // Do not submit the form if there are validation errors
      setFormSubmitted(true);
      setShowSuccessMessage(false);
      return;
    }

  
    

    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (response.ok) {
      // Clear form fields on successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFormSubmitted(false); // Reset the form submission state
      setShowSuccessMessage(true)

      setIsAuthenticated(true);
      toggleAutentication();

          // Reset input borders to black
    setIsFirstNameValid(false);
    setIsLastNameValid(false);
    setIsEmailValid(false);
    setIsPasswordValid(false);
    setIsConfirmPasswordValid(false);

    } else {
      console.error("Form submission failed");
    }
  };

  const showSuccessMessages =
  formSubmitted &&
  !passwordsMatchError &&
  !passwordLengthError &&
  !passwordCriteriaError &&
  !emailError &&
  isFirstNameValid &&
  isLastNameValid &&
  isEmailValid &&
  password.length >= 6 &&
  confirmPassword.length >= 6;


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">

        {/* ERROR SUMMARY AT TOP OF FORM */}
        <div className="error-summary">
            {/* Display each error message separately */}
            {passwordsMatchError && (
              <div className="error-message">{passwordsMatchError}</div>
            )}
            {passwordLengthError && (
              <div className="error-message">{passwordLengthError}</div>
            )}
            {passwordCriteriaError && (
              <div className="error-message">{passwordCriteriaError}</div>
            )}
            {emailError && <div className="error-message">{emailError}</div>}
            {/* ... (other error messages) */}
          </div>




        {/* -------------------------------- FIRST NAME */}
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
          className={`${
            firstName.trim().length === 0 && formSubmitted
              ? "error"
              : isFirstNameValid
              ? "success"
              : ""
          }`}
        />

        {/* Individual error message for First Name */}
        {formSubmitted && firstName.trim().length === 0 && (
          <span className="required">This field is required</span>
        )}





        {/* -------------------------------- LAST NAME */}
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
          className={formSubmitted && lastName.length === 0 ? "error" : isLastNameValid ? "success" : ""}
        />
        {formSubmitted && lastName.length === 0 && (
          <span className="required">This field is required</span>
        )}





        {/*--------------------------------- EMAIL */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className={
            (email.trim().length === 0 && formSubmitted) 
            ? "error" 
            :(isEmailValid && email.trim().length > 0) 
            ? "success" 
            : ""
          }
        />

        {formSubmitted && emailError && (
          <div className="error-message">{emailError}</div>
        )}
        {formSubmitted && email.length === 0 && (
          <span className="required">This field is required</span>
        )}



{/* ----------------------------------------PASSWORD */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className={
            formSubmitted && (confirmPassword !== password || confirmPassword.trim().length === 0)
              ? "error"
              : isPasswordValid
              ? "success"
              : ""
          }
          
        />

        {/* Individual error message for Password */}
        {formSubmitted && !isPasswordValid && (
          <div className="error-message">
            {/* Display grouped password criteria errors */}
            {passwordCriteriaPrompts.split("\n").map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}



{/* --------------------------------------CONFIRM */}
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={
            formSubmitted && (confirmPassword !== password || confirmPassword.trim().length === 0)
              ? "error"
              : isConfirmPasswordValid
              ? "success"
              : ""
          }
        />
         {/* Individual error message for Confirm Password */}
         {formSubmitted && !isConfirmPasswordValid && (
         <div className="error-message">
         {/* Display grouped password criteria errors */}
         Passwords do not match
       </div>
        )}

   {/* Conditionally render the success message here */}
   {showSuccessMessage && (
        <div className="success-message">Form submitted successfully!</div>
      )}
      

        <button className="btn-submit" type="submit">
        Register
      </button>
    </div>
  </form>
);
}


