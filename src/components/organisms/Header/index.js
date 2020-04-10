import React from "react";
import modules from "components";
const Header = () => {
  const { Navigation, Button } = modules;
  return (
    <header>
      <Navigation />
      <Button>Welcome</Button>
    </header>
  );
};

export default Header;
