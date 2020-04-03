import React from "react";
import PropTypes from "prop-types";

const DefaultTemplate = ({ children, ...props }) => {
  return (
    <main {...props}>
      <section>{children}</section>
    </main>
  );
};

DefaultTemplate.propTypes = {
  children: PropTypes.any.isRequired
};

export default DefaultTemplate;
