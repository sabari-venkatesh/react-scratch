import React from "react";
import PropTypes from "prop-types";

const DefaultTemplate = ({ header, children, ...props }) => {
  return (
    <main {...props}>
      <Header>{header}</Header>
      <section>{children}</section>
    </main>
  );
};

DefaultTemplate.propTypes = {
  children: PropTypes.any.isRequired,
};

export default DefaultTemplate;
