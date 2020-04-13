import React from "react";
import classnames from "classnames";
import styles from "./input.css";

export const InputType = {
  TEXT: "text",
  TEXTAREA: "textarea",
  SELECT: "select",
};

export const InputSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

const Input = (props) => {
  const { type, size, className, disabled, children } = props;
  const classes = classnames(
    styles.input,
    styles[size],
    { [styles.disabled]: disabled },
    { [styles.isTextArea]: type === "textarea" },
    { [styles.isSelect]: type === "select" },
    className
  );
  if (type === "textarea") {
    return (
      <textarea cols="30" rows="10" {...props} className={classes}>
        {children}
      </textarea>
    );
  }
  return <input {...props} className={classes} />;
};

Input.defaultProps = {
  type: "text",
};

export default Input;
