import React from "react";

const Label = ({ id, children, className }) => {
  return (
    <label htmlFor={id} className={className}>
      {children}
    </label>
  );
};

export default Label;
