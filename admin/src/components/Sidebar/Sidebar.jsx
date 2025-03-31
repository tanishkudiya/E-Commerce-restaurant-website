import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { List, ListOrdered, PlusCircle, Utensils, Home, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-header">
        <Utensils size={36} className="logo-icon" />
        <h2>Foodie Admin</h2>
      </div>

      {/* Navigation Options */}
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <PlusCircle size={30} />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <List size={30} />
          <p>All Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <ListOrdered size={30} />
          <p>Ordered Items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
