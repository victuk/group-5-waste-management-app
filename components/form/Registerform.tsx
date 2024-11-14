import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "../ui/CustomButton";

import { validateEmail, validatePassword } from "@/utils";
import { Link } from "expo-router";

export const Registerform = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const toggleSecure = () => setSecure(!secure);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };
  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setErrorEmail("Please enter a valid email address");
    }
    if (!validatePassword(password)) {
      setErrorPassword(
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    console.log({
      email,
      password,
    });

    setEmail("");
    setPassword("");
    setErrorEmail("");
    setErrorPassword("");
  };

  const disabled =
    fullName.trim() === "" || email.trim() === "" || password.trim() === "";

  return (
    <View style={styles.container}>
      <CustomInput
        label="Full Name"
        placeholder="Enter your full name"
        keyboardType="default"
        value={fullName}
        onChangeText={(text) => {
          setFullName(text);
        }}
        error={errorEmail}
      />
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
        error={errorEmail}
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        keyboardType="default"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry={secure}
        error={errorPassword}
        toggleSecure={toggleSecure}
        password
      />

      <CustomButton
        disabled={disabled}
        buttonTitle="Sign in"
        onPress={handleSubmit}
      />

      <View>
        <Link href="/login">Already have an account? Login</Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    marginTop: 20,
  },
});
