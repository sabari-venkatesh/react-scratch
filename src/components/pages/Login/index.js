import React from "react";
import modules from "components";
import styles from "./login.css";
const Login = () => {
  const { Default, Form, Field, Button } = modules;
  return (
    <Default>
      {/* Title component renders here */}
      <h1>Login form</h1>
      <Form className={styles.form}>
        <Field name="first-name" placeholder="First Name" />
        <Field name="last-name" label="Last Name" />
        <Field name="email" type="email" label="Email" />
        <Button size="small">Validate</Button>
      </Form>
    </Default>
  );
};

export default Login;
