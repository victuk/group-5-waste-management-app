import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "../ui/CustomButton";

import { validateEmail, validatePassword } from "@/utils";
import { Link, Redirect, useRouter } from "expo-router";
import { useRegister } from "@/app/tanstack/queries";

export const Registerform = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const toggleSecure = () => setSecure(!secure);
  const [registerButtonLoading, setRegisterButtonLoading] = useState(false);

  const router = useRouter();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };
  const handleSubmit = async () => {
    try {

      setRegisterButtonLoading(true);

      Keyboard.dismiss();

      if (!validateEmail(email)) {
        setErrorEmail("Please enter a valid email address");
      }
      // if (!validatePassword(password)) {
      //   setErrorPassword(
      //     "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      //   );
      //   return;
      // }
  
      const {data} = await useRegister(firstName, lastName, email, password);
  
      ToastAndroid.show("Registration Successful", ToastAndroid.SHORT);

      
  
      // console.log(data);
  
      // console.log({
      //   email,
      //   password,
      // });
  
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setErrorEmail("");
      setErrorPassword("");

      router.push("/login");

    } catch (error: any) {
      console.log(error);
      ToastAndroid.show(error.response.data.errorMessage, ToastAndroid.SHORT);
    } finally {
      setRegisterButtonLoading(false);
    }
    
  };

  const disabled =
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "";

  return (
    <View>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <CustomInput
            label="First Name"
            placeholder="Enter your first name"
            keyboardType="default"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
            }}
            error={errorEmail}
          />
          <CustomInput
            label="Surname Name"
            placeholder="Enter your surname"
            keyboardType="default"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
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
          isLoading={registerButtonLoading}
            disabled={disabled}
            buttonTitle="Register"
            onPress={handleSubmit}
          />

          <View>
            <Link href="/login" style={{marginTop: -60}}>Already have an account? Login</Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 80,
    marginTop: 20,
  },
});
