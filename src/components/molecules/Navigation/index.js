import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="http://www.google.com">Google</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
