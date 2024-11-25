import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  ToastAndroid,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "../ui/CustomButton";

import { validateEmail, validatePassword } from "@/utils";
import { Link } from "expo-router";
import Wrapper from "../ui/Wrapper";
import { useLogin } from "@/app/tanstack/queries";
import { useUserStore } from "@/store/authStore";

export const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const toggleSecure = () => setSecure(!secure);
  const [loginButtonLoading, setLoginButtonLoading] = useState(false);

  const setUser = useUserStore(state => state.createUser);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };
  const handleSubmit = async () => {

    try {
      setLoginButtonLoading(true);
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
      

      const {data} = await useLogin(email, password);

      setUser({
        email: data.user.email,
        fullName: data.user.fullName,
        token: data.token
      });

      // console.log(data);
  
      console.log({
        email,
        password,
      });
  
      setEmail("");
      setPassword("");
      setErrorEmail("");
      setErrorPassword("");
    } catch (error: any) {
      ToastAndroid.show(error.response.data.errorMessage, ToastAndroid.SHORT);
    } finally {
      setLoginButtonLoading(false);
    }

  };

  const disabled = email.trim() === "" || password.trim() === "";

  return (
    <View>
      <KeyboardAvoidingView>
        <View style={styles.container}>
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
            keyboardType="email-address"
            onChangeText={handlePasswordChange}
            value={password}
            secureTextEntry={secure}
            error={errorPassword}
            toggleSecure={toggleSecure}
            password
          />

          <CustomButton
            isLoading={loginButtonLoading}
            disabled={disabled}
            buttonTitle="Sign in"
            onPress={handleSubmit}
          />

          <Link href="/register" style={{marginTop: -60}}>Don't have an account? Register</Link>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 80,
    // marginTop: 20,
  },
});
