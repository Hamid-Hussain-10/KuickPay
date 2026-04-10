import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CountryPicker from "react-native-country-picker-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  const [countryCode, setCountryCode] = useState("PK");
  const [callingCode, setCallingCode] = useState("92");
  const [phone, setPhone] = useState("");

  const isValid = phone.length === 10;

  const handleContinue = () => {
    const fullNumber = `+${callingCode}${phone}`;
    console.log("Phone:", fullNumber);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../images/icon.png")} style={styles.img} />
        <Text style={styles.text}>KuickPay</Text>
      </View>

      <Text style={styles.text1}>Welcome!</Text>

      <View style={styles.signContainer}>
        <Text style={styles.text2}>Enter phone number to login or signup</Text>

        <View style={styles.phoneRow}>
          <View style={styles.codeContainer}>
            <CountryPicker
              countryCode={countryCode}
              withFlag
              withFilter
              withCallingCode={false}
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]);
              }}
            />
            <Text style={styles.codeText}>+{callingCode}</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="300XXXXXXX"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
            maxLength={10}
          />
        </View>

        {phone.length > 0 && !isValid && (
          <Text style={styles.error}>Enter valid 10-digit number</Text>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isValid ? "#5c5c5d" : "#2E7DFF" },
          ]}
          disabled={!isValid}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.touchContainer}>
          <MaterialCommunityIcons
            name="fingerprint"
            size={22}
            color="#000000"
          />{" "}
          <Text style={styles.text3}>Login With TouchID</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    top: 100,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  img: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 15,
  },

  text1: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 40,
  },

  signContainer: {
    width: "80%",
    alignItems: "center",
  },

  text2: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 40,
    textAlign: "center",
  },

  phoneRow: {
    flexDirection: "row",
    marginTop: 20,
    width: "90%",
    paddingVertical: 8,
  },

  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fcfbfb",
    borderRadius: 10,
    paddingHorizontal: 10,
    // paddingVertical: 10,
    marginRight: 10,
  },

  codeText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
  },

  input: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
  },

  error: {
    color: "red",
    marginTop: 8,
    fontSize: 14,
  },

  button: {
    width: "100%",
    marginTop: 25,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  touchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  text3: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});
