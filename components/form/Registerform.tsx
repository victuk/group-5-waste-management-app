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
import { Country, State, City } from "country-state-city";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "../ThemedText";

export const Registerform = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
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

      const { data } = await useRegister(firstName, lastName, email, password);

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

          <View>
            <Text style={[{ fontSize: 14, marginBottom: 10, fontWeight: "bold" }]}>
              Country
            </Text>
            <Picker
              selectedValue={country}
              onValueChange={(itemValue) => setCountry(itemValue)}
              style={{ color: "black", backgroundColor: "white" }}
            >
              <Picker.Item value="" label="Select" key={0} />
              {Country.getAllCountries().map((s, index) => (
                <Picker.Item value={s.isoCode} label={s.name} key={index + 1} />
              ))}
            </Picker>
          </View>

          <View>
            <Text style={[{ fontSize: 14, marginBottom: 10, fontWeight: "bold" }]}>
              State
            </Text>
            <Picker
              selectedValue={state}
              onValueChange={(itemValue) => setState(itemValue)}
              style={{ color: "black", backgroundColor: "white" }}
            >
              <Picker.Item value="" label="Select" key={0} />
              {State.getStatesOfCountry(country).map((s, index) => (
                <Picker.Item value={s.isoCode} label={s.name} key={index + 1} />
              ))}
            </Picker>
          </View>

          <View>
            <Text style={[{ fontSize: 14, marginBottom: 10, fontWeight: "bold" }]}>
              City
            </Text>
            <Picker
              selectedValue={city}
              onValueChange={(itemValue) => setCity(itemValue)}
              style={{ color: "black", backgroundColor: "white" }}
            >
              <Picker.Item value="" label="Select" key={0} />
              {City.getCitiesOfState(country, state).map((s, index) => (
                <Picker.Item value={s.stateCode} label={s.name} key={index + 1} />
              ))}
            </Picker>
          </View>

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
            <Link href="/login">Already have an account? Login</Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginVertical: 20,
  },
});
