import React, { useEffect, useState } from "react";
import "../CSS/Header.css"; // Adjust the path if needed
import  headerImage from "../Images/ImageForHeader/Header.png";

const Header = () => {
  return (
    <div className="headerContainer">
      <img src={headerImage} alt="Header" className="headerImage" />
    </div>
  );
};
export default Header;