import React, { useState } from "react";
import axios from "axios";
import DashboardHeader from "../DashboardHeader";
import SideBar from "../SideBar";

const AddInventory = () => {
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const addInventory = async (e) => {
    e.preventDefault();
    const newInventory = {
      item_id: itemId,
      item_name: itemName,
      category,
      quantity: Number(quantity),
      price: Number(price),
    };

    axios
      .post(`http://localhost:8070/inventory/add`, newInventory)
      .then((res) => {
        alert("Inventory Item Added");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <DashboardHeader />

      <div className="main-container">
        <div className="nav-bar">
          <ul className="nav-list">
            <a href="/laboratory">
              <li className="nav-element">Laboratory</li>
            </a>
            <a href="/staff">
              <li className="nav-element">Staff Management</li>
            </a>
            <a href="/doctor">
              <li className="nav-element">Add Doctor</li>
            </a>
            <a href="/staffProfile">
              <li className="nav-element">Profile</li>
            </a>
            <a href="/inventory">
              <li className="nav-element active-element">Inventory</li>
            </a>
          </ul>
        </div>

        <div className="content">
          <div className="add-inventory-container">
            <form onSubmit={addInventory}>
              <h1>Add Inventory Item</h1>
              <input
                className="add-inventory-inputs"
                type="text"
                placeholder="Item ID"
                onChange={(e) => setItemId(e.target.value)}
              />
              <br />
              <input
                className="add-inventory-inputs"
                type="text"
                placeholder="Item Name"
                onChange={(e) => setItemName(e.target.value)}
              />
              <br />
              <input
                className="add-inventory-inputs"
                type="text"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
              />
              <br />
              <input
                className="add-inventory-inputs"
                type="number"
                placeholder="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <br />
              <input
                className="add-inventory-inputs"
                type="number"
                placeholder="Price"
                step="0.01"
                onChange={(e) => setPrice(e.target.value)}
              />
              <br />
              <button type="submit" id="add-inventory-button">
                Add Inventory
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInventory;
