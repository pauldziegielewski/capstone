


import React, { useState } from "react";

export default function Packlist({ weatherForecast, selectedItemsProp, onItemAdd}) {
  const [selectedItems, setSelectedItems] = useState([]);

  const packingItems = [
    { name: 'Umbrella', conditions: ['Rain', 'Thunderstorm','scattered clouds','Clouds'], image: "/images/umbrellapix.jpg" },
    { name: 'Sunscreen', conditions: ['Clear'], image: "/images/sunscreen.jpg" },
    // General
    { name: 'Tent', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Clouds', 'Overcast Clouds', 'Rain', 'Thunderstorm', 'Snow', 'Blizzard'], image: "/images/tent.jpg" },
    { name: 'Sleeping bag', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds', 'Overcast Clouds', 'Rain', 'Snow', 'Blizzard'], image: "/images/sleepingbag.jpg" },
  
  
    { name: 'Cookware', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds', 'Overcast Clouds', 'Rain', 'Snow', 'Blizzard'], image: "/images/cookware.jpg" },
    { name: 'First aid kit', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds', 'Overcast Clouds', 'Rain', 'Thunderstorm', 'Snow', 'Blizzard'], image: "/images/firstaidkit.jpg" },
    { name: 'Multi-tool or knife', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds', 'Overcast Clouds', 'Rain', 'Snow', 'Blizzard'], image: "/images/multitool.jpg" },
    { name: 'Headlamp/Flashlight', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds', 'Overcast Clouds', 'Rain', 'Thunderstorm', 'Snow', 'Blizzard'], image: "/images/flashlight.jpg" },
    { name: 'Trash bags', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds', 'Overcast Clouds', 'Rain', 'Snow', 'Blizzard'], image: "/images/trashbags.jpg" },
  
    // Clothing
    { name: 'T-shirts', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds'], image: "/images/tshirt.jpg" },
    { name: 'Long-sleeve shirts', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds', 'Overcast Clouds'], image: "/images/longsleeveshirt.jpg" },
    { name: 'Shorts', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds'], image: "/images/shorts.jpg" },
    { name: 'Pants', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds', 'Overcast Clouds'], image: "/images/pants.jpg" },
    { name: 'Sweater', conditions: ['Overcast Clouds', 'Rain'], image: "/images/sweater.jpg" },
    { name: 'Jacket', conditions: ['Rain', 'Thunderstorm', 'Snow', 'Blizzard'], image: "/images/jacket.jpg" },
    { name: 'Hat', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds'], image: "/images/hat.jpg" },
    { name: 'Socks', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds', 'Overcast Clouds'], image: "/images/socks.jpg" },
    { name: 'Underwear', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds', 'Overcast Clouds'], image: "/images/underwear.jpg" },
  
    // Footwear
    { name: 'Hiking boots', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds'], image: "/images/hikingboots.jpg" },
    { name: 'Sandals', conditions: ['Clear', 'Sunny', 'Few Clouds', 'Scattered Clouds'], image: "/images/sandals.jpg" },
    { name: 'Waterproof boots', conditions: ['Rain', 'Snow', 'Blizzard'], image: "/images/waterproofboots.jpg" },
    { name: 'Gaiters', conditions: ['Snow', 'Blizzard'], image: "/images/gaiters.jpg" },
  
    // Winter Camping
    { name: 'Snowshoes', conditions: ['Snow', 'Blizzard'], image: "/images/snowshoes.jpg" },
    { name: 'Winter Jacket', conditions: ['Snow', 'Blizzard'], image: "/images/winterjacket.jpg" },
    { name: 'Snow pants', conditions: ['Snow', 'Blizzard'], image: "/images/snowpants.jpg" },
    { name: 'Thermal underwear', conditions: ['Snow', 'Blizzard'], image: "/images/thermalunderwear.jpg" },
    { name: 'Mittens', conditions: ['Snow', 'Blizzard'], image: "/images/mittens.jpg" },
    { name: 'Winter hat', conditions: ['Snow', 'Blizzard'], image: "/images/hatwinter.jpg" },
    { name: 'Balaclava', conditions: ['Snow', 'Blizzard'], image: "/images/balaclava.jpg" },
  
    // Rainy Weather
    { name: 'Waterproof gloves', conditions: ['Rain', 'Thunderstorm'], image: "/images/waterproofgloves.jpg" },
    { name: 'Umbrella', conditions: ['Rain', 'Thunderstorm'], image: "/images/umbrellapix.jpg" },
  
    // Sunny and Hot
    { name: 'Sunscreen', conditions: ['Clear', 'Sunny', 'Few Clouds'], image: "/images/sunscreen.jpg" },
    { name: 'Sunglasses', conditions: ['Clear', 'Sunny', 'Few Clouds'], image: "/images/sunglasses.jpg" },
    { name: 'Swimwear', conditions: ['Clear', 'Sunny', 'Few Clouds'], image: "/images/swimtrunks.jpg" },
    { name: 'Hydration system', conditions: ['Clear', 'Sunny', 'Few Clouds'], image: "/images/hydration.jpg" },
  ];

  let suggestedItems = [];

  if (weatherForecast && weatherForecast.weather) {
    const weatherCondition = (weatherForecast.weather[0].description || "").toLowerCase();
    suggestedItems = packingItems.filter((item) =>
      item.conditions.some((condition) => weatherCondition.includes(condition.toLowerCase()))
    );
  }

  const handleItemSelection = (itemName) => {
    if (selectedItems.includes(itemName)) {
        setSelectedItems(selectedItems.filter((name) => name !== itemName));
      } else {
        setSelectedItems([...selectedItems, itemName]);
      }
    };

  const handleSaveItems = () => {
    const selectedItemsToSave = packingItems.filter((item) => selectedItems.includes(item.name));
    // Call the onItemAdd function with selected items
    onItemAdd(selectedItemsToSave);
    setSelectedItems([]);
  };
  

  return (
    <div className="packlist-container-main">
      <h2>Pack List for {weatherForecast?.weather[0]?.description || "Unknown"}</h2>
      <ul>
        <div className="packlist-container">
          {suggestedItems.map((item, index) => (
            <div className="packlist-item" key={index}>
              <label className="packlist-label">
                <input
                  className="checked-item"
                  type="checkbox"
                  checked={selectedItems.includes(item.name)}
                  onChange={() => handleItemSelection(item.name)}
                />{' '}
                <img className="packlist-img" src={item.image} alt={item.name} />
                <span className="packlist-text">{item.name}</span>
              </label>
            </div>
          ))}
        </div>
      </ul>
      <button className="save-button" onClick={handleSaveItems}>Save</button>
    </div>
  );

}


