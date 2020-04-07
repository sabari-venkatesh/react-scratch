import React from "react";
import classnames from "classnames";
import styles from "./styles.css";

export const ButtonType = {
  BUTTON: "button",
  RESET: "reset",
  SUBMIT: "submit",
};

export const ButtonTheme = {
  DEFAULT: "default",
  ROUNDED: "rounded",
};

export const ButtonSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

const Button = (props) => {
  const { type, onClick, children, theme, size, className, disabled } = props;

  const classes = classnames(
    styles.button,
    styles[theme],
    styles[size],
    { [styles.disabled]: disabled },
    className
  );

  console.log(classes);

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: ButtonType.BUTTON,
  theme: ButtonTheme.DEFAULT,
  size: ButtonSize.MEDIUM,
};

export default Button;
