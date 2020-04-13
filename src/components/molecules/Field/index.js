import React from "react";
import styles from "./field.css";
import modules from "components";

const Field = ({ type, error, name, label, placeholder, ...props }) => {
  const { Label, Input } = modules;
  const inputProps = {
    type,
    id: name,
    name,
    placeholder,
    "aria-describedby": `${name}Error`,
    ...props,
  };
  return (
    <div className={styles.root}>
      {(label || placeholder) && (
        <Label htmlFor={inputProps.id} className={styles.label}>
          {label || placeholder}
        </Label>
      )}
      <Input {...inputProps} />
      {error && (
        <span id={`${name}Error`} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
};

Field.defaultProps = {
  type: "text",
};

export default Field;
