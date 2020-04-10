import React from "react";
import PropTypes from "prop-types";
import modules from "components";

const DefaultTemplate = ({ header, children, ...props }) => {
  const { Header } = modules;
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
