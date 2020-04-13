import React, { useState, useEffect } from "react";
import modules from "components";
import MailValidator from "services/validator";
import styles from "./login.css";
const Login = () => {
  const { Default, Form, Field, Button } = modules;
  const [input, setInput] = useState({});
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  useEffect(() => {
    MailValidator(input);
  }, [input]);

  return (
    <Default>
      {/* Title component renders here */}
      <h1>Login form</h1>
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
          onChange={handleInputChange}
        />
        <Button size="small">Validate</Button>
      </Form>
    </Default>
  );
};

export default Login;
