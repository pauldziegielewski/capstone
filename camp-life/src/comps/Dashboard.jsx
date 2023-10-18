import React, { useState } from 'react';
import Logout from '../comps/Logout';
import Packlist from '../comps/Packlist';

export default function Dashboard() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [updateItem, setUpdateItem] = useState(null);

  // Add item
  const handleItemAdd = (items) => {
    console.log('Items to add:', items);
    setSelectedItems([...selectedItems, ...items]);
  };

  // Update item
  const handleItemUpdate = (updatedItem) => {
    const updatedItems = selectedItems.map((item) =>
      item.name === updatedItem.name ? updatedItem : item
    );
    setSelectedItems(updatedItems);
    setUpdateItem(null);
  };

  // Delete item
  const handleItemDelete = (itemName) => {
    const updatedItems = selectedItems.filter((item) => item.name !== itemName);
    setSelectedItems(updatedItems);
  };

  return (
    <div>
      <h1 className="dash-welcome">Welcome, friend</h1>

      <Packlist 
        selectedItemsProp={selectedItems}
        onItemAdd={handleItemAdd}
        onItemUpdate={handleItemUpdate}
        onItemDelete={handleItemDelete}
      />

      <div>
        <h2>Selected Items</h2>
        <ul>
          {selectedItems.map((item, index) => (
            <div key={index}>
              <span>{item.name}</span>
              <button onClick={() => setUpdateItem(item)}>Edit</button>
              <button onClick={() => handleItemDelete(item.name)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>

      <Logout />
    </div>
  );
}
