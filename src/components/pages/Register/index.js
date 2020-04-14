import React, { useState, useEffect } from "react";
import modules from "components";
import MailValidator from "services/validator";
import styles from "./register.css";
const Register = () => {
  const { Default, Form, Field, Button } = modules;
  const [input, setInput] = useState({});
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const validateEmail = (e) => {
    setIsProcessing(true);
    setTimeout(function () {
      setError(MailValidator(input));
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <Default>
      {/* Title component renders here */}
      <h1>Register form</h1>
      <Form className={styles.form}>
        <Field
          name="first-name"
          placeholder="First Name"
          onChange={handleInputChange}
        />
        <Field
          name="last-name"
          label="Last Name"
          onChange={handleInputChange}
        />
        <Field
          name="email"
          type="email"
          label="Email"
          error={error}
          onChange={handleInputChange}
        />
        <Button size="small" onClick={validateEmail}>
          {`${isProcessing ? "Validating..." : "Validate"}`}
        </Button>
      </Form>
    </Default>
  );
};

export default Register;
