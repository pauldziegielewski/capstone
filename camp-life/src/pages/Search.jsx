import React, { useState, useEffect } from "react";
import Map from "../comps/Map";
import ImageCarousel from "../comps/ImageCarousel";
import Packlist from "../comps/Packlist";
import { useNavigate } from 'react-router-dom';

const apiKey = "d397ee31b9be7ef80458dcf34da686ba";

function formatDate(dateString) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options).replace(/,/g, "");
}

// An array of objects
const parksData = [

  // 1st object with properties 

    { name: "Algonquin Park", latitude: 45.554959, longitude: -78.596983, 
    image: [
        "/images/algonquin.jpg",
    ]},
    { name: "Arrowhead Provincial Park", latitude: 45.39171092240731, longitude: -79.21470512220063, image: "/images/arrowhead.jpg" },
    { name: "Bon Echo Provincial Park", latitude: 44.897706999466095, longitude: -77.20865330689931, image: "/images/bonecho.jpg" },
    { name: "Bronte Creek Provincial Park", latitude: 43.40649550051575, longitude: -79.77129890678842, image: "/images/bronte.jpg" },
    { name: "Bruce Peninusla National Park", latitude: 45.22021141629171, longitude: -81.53076633570784, image: "/images/brucepeninsula.jpg" },
    { name: "Charleston Lake Provincial Park", latitude: 44.49723805435934, longitude: -76.04366614920696, image: "/images/charleston.jpg" },
    { name: "Chutes Provincial Park", latitude: 46.21824161558558, longitude: -82.07709517796935, image: "/images/chutes.jpg" },
    { name: "French River Provincial Park", latitude: 46.01729786165828, longitude: -80.58555900687827, image: "/images/chutes.jpg"},
    { name: "Frontenac Provincial Park", latitude: 44.54370803470368, longitude: -76.55291259207672, image: "/images/frontenac.jpg" },
    { name: "Grundy Lake Provincial Park", latitude: 45.93993825844964, longitude: -80.57476936453745, image: "/images/grundy.jpg" },
    { name: "Killarney Provincial Park", latitude: 46.01346762030402, longitude: -81.40170352788242,  image: "/images/killarneypark.jpg"},
    { name: "Long Point Provincial Park", latitude: 42.581604695751075, longitude: -80.39074880689202, image: "/images/long.jpg"  },
    { name: "Mississagi Provincial Park", latitude: 46.61859816183869, longitude: -82.6835512665924, image: "/images/mississagi.jpg"  },
    { name: "Neys Provincial Park", latitude: 48.77746766226136, longitude: -86.5848867562128,  image: "/images/neys.jpg" },
    { name: "Pinery Park", latitude: 43.248373, longitude: -81.822291, image: "/images/pinery.jpg" },
    { name: "Point Farms Provincial Park", latitude: 43.801510269203874, longitude: -81.70101800875172,  image: "/images/point.jpg"},
    { name: "Presqu'ile Provincial Park", latitude: 44.009947311469176, longitude: -77.74202030687906,  image: "/images/presqu.jpg" },
    { name: "Pukaskwa National Park", latitude: 48.59318321754693, longitude: -86.29342597990916,  image: "/images/puka.jpg" },
    { name: "Quetico Provincial Park", latitude: 48.675730227826705, longitude: -91.12640059640002,  image: "/images/quentico.jpg" },
    { name: "Rondeau Provincial Park", latitude: 42.31755049632067, longitude: -81.84715630875824,  image: "/images/rondeau.jpg" },
    { name: "Sandbanks Provincial Park", latitude: 43.90825363023725, longitude: -77.23922203254506,  image: "/images/sandbanks.jpg" },
    { name: "Sleeping Giant Provincial Park", latitude: 48.36948278599758, longitude: -88.80456963571996,  image: "/images/sleeping.jpg" },
    { name: "Wabakimi Provincial Park", latitude: 51.117888647383765, longitude: -89.43802559251698,  image: "/images/wabakimi.jpg" },
    { name: "Woodland Caribou Provincial Park", latitude: 51.116952899592675, longitude: -94.84939255136075,  image: "/images/woodland.jpg" },
  ];

// Sort the parks alphabetically by name
parksData.sort((a, b) => a.name.localeCompare(b.name));

export default function Search() {
  // STATE VARIABLES
const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [formattedSelectedDate, setFormattedSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
 

  const saveSelectedItems = (itemsToSave) => {
 saveSelectedItems(itemsToSave);

 navigate("/Dashboard");
  };

  const handleSaveToDashboard = () => {
    // Check if there are selected items to save
    if (selectedItems.length === 0) {
      // Use the `saveSelectedItems` function to save the selected items
      saveSelectedItems(selectedItems);
    } 
    return;
  };
  



  // ------------------HANDLERS (handlers are here to update any change performed by a user)
  const handleLocationChange = (event) => {

    // parks is selected by user via dropdown menu
    const selectedParkName = event.target.value;
    // selectedLocation state variable is updated here - if Bon Echo is selected then that park name is updated in selectedLocation
    setSelectedLocation(selectedParkName);
  };

  // Handle date change
  const handleDateChange = (event) => {

    // user selects a date and this selected date is updated in selectedDate state variable VIA setSelectedDate
    setSelectedDate(event.target.value);
    setDateError(""); // Clear any previous date error message
  };

  const handleSaveItems = (itemsToSave) => {
    // Use setSavedItems to update the saved items state
    setSavedItems([...savedItems, ...itemsToSave]);
  
    // Redirect to the Dashboard after saving items
    navigate("/Dashboard");
  };
  

  //---------------------------------  HANDLE SEARCH
  const handleSearch = async () => {
    try {
      setSearchClicked(true);

      setWeatherForecast(null);
      setFormattedSelectedDate("");
      setDateError("");

      


      // Validate that both location and date are selected
      if (selectedLocation === "Select Location" || !selectedDate) {
        console.error("Please select both location and date");
        return;
      }

      // Find the selected park based on the selected location
      const selectedPark = parksData.find((park) => park.name === selectedLocation);

      if (!selectedPark) {
     

        console.error("Selected park not found.");
        return (
          <p className="error-message">Selected park not found</p>
        );
      }

      // Set the selected coordinates based on the selected park
      setSelectedCoordinates({
        latitude: selectedPark.latitude,
        longitude: selectedPark.longitude,
      });

      // API Call URL for weather forecast using coordinates
      const forecastApiCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCoordinates.latitude}&lon=${selectedCoordinates.longitude}&appid=${apiKey}`;

      // Make an API request to fetch weather forecast data
      const forecastResponse = await fetch(forecastApiCall);

      // Check if the response status is OK (200)
      if (forecastResponse.ok) {
        const forecastData = await forecastResponse.json();

        // Find the forecast entry for the selected date
        const selectedDateForecast = forecastData.list.find((item) => {
          // Convert the forecast timestamp to a Date object
          const forecastDate = new Date(item.dt * 1000);

          // Compare the forecast date to the selected date (ignoring time)
          return (
            forecastDate.toDateString() ===
            new Date(selectedDate).toDateString()
          );
        });

        // Check if the selected date is outside the 5-day forecast
        const currentDate = new Date();
        const fiveDaysFromNow = getFiveDaysFromNow();
        if (
          selectedDate < currentDate || // Selected date is in the past
          selectedDate > fiveDaysFromNow// Selected date is beyond the 5-day forecast

        ) {
          setWeatherForecast(null); // Clear the forecast data
          setFormattedSelectedDate(
            "Weather is not yet available for this date."
          );
          setDateError(""); // Clear any previous date error message
        } else {
          // Handle the data and update the state with weather forecast information
          if (selectedDateForecast) {
            setWeatherForecast(selectedDateForecast); // Update the forecast state

            // Update the formatted date for h2 display
            const formattedDate = formatDate(selectedDate);
            setFormattedSelectedDate(formattedDate);

             // Reset selections after a successful search
            // setSelectedLocation("Select Location");
             setSelectedDate(""); // Set the default date value
          } else {
            console.error("Forecast data not available for the selected date.");
          }
        }
      } else {
        console.error(
          "Error fetching weather forecast data:",
          forecastResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };






  // Function to get the date 5 days from now
  function getFiveDaysFromNow() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);
    return currentDate;
  }

  useEffect(() => {
    // Set default location and coordinates
    if (parksData.length > 0) {
      setSelectedLocation("Select Park");
      setSelectedCoordinates({
        latitude: parksData[0].latitude,
        longitude: parksData[0].longitude,
      });
    }
  }, []);


  // Extract images for the selected park
  const selectedLocationImage = selectedLocation
    ? parksData.find((park) => park.name === selectedLocation)?.image || []
    : null;









  // -------------------------- RETURN BLOCK
  return (
    <div className="deets">
      <div className="title-icon">

        <h1 className="check-weather-title">Check Weather</h1>
        <div className="icon-sun">
            <ion-icon name="sunny-outline"></ion-icon>
        </div>
      
      </div>
      <p>Select a park AND date</p>

      {/* -------------------FORM INPUT */}
      <div className="park-date-box">
                     {/* LOCATION */}
        <div className="dropdown-container">

          <label className="dropdown-search"htmlFor="location">Select a Location:</label>

          <select
            name="location"
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
            className="dropdown-parks"
          >
            <option value="">Select Location</option>
            {parksData.map((park) => (
              <option key={park.name} value={park.name}>
                {park.name}
              </option>
            ))}
          </select>
        </div>

        {/* DATE */}
        <div className="dropdown-container">
          <label className="dropdown-search"htmlFor="date">Select a Date:</label>
          <input
            name="date"
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="dropdown-date"
          />
        </div>
        </div>



    {/* ---------------------------BUTTON */}
          <button onClick={handleSearch} className="btn-search">
            Search Weather
  
          </button>


  {/* ---------THIS IS WHAT DISPLAYS AFTER SEARCH */}
      {/* WEATHER API DETAILS */}
      {searchClicked && weatherForecast && (
        <div className="weather-info">
          <h2>Weather Information for {formattedSelectedDate}</h2>
          {dateError ? (
            <p className="error-message">{dateError}</p>
          ) : (
            <>
              {/* LOCATION */}
              {searchClicked && (
              <p>Location: {selectedLocation}</p>
              )}

              {/* TEMP */}
              <p>Temperature: {(weatherForecast.main.temp - 273.15).toFixed(0)} °C</p>

              {/* DESCRIPTION */}

              <p>Description: {weatherForecast.weather[0].description}</p>

              {/* WEATHER ICON */}
              <img
                src={`https://api.openweathermap.org/img/w/${weatherForecast.weather[0].icon}.png`}
                alt="Weather Icon"
              />
            </>
          )}

          {/* Display images and map */}
          {searchClicked && weatherForecast && selectedCoordinates && (
            <div className="map-img-box">

              {/* PARK IMAGE */}
              <div className="park-img-box">
                {/* Renders image carousel */}
                <ImageCarousel  images={[selectedLocationImage]} />
              </div>

              {/* MAP */}
              <div className="map-container">
                <Map
                  latitude={selectedCoordinates.latitude}
                  longitude={selectedCoordinates.longitude}
                />
              </div>

            </div>
            
          )}

           {/* PACKLIST */}
              <div className="packlist-div"> 
              <Packlist 
  weatherForecast={weatherForecast}
  onItemChange={(item, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    }
  }}
/>
<button onClick={handleSaveToDashboard} className="btn-save-to-dashboard">
  Save to Dashboard
</button>

              </div>

        </div>
      )}
    </div>
  );
}
