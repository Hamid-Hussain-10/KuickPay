import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import React, { useState } from "react";
import CountryPicker from "react-native-country-picker-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useRouter } from "expo-router";


const FirstLogin = () => {
  const [countryCode, setCountryCode] = useState("PK");
  const [callingCode, setCallingCode] = useState("92");
  const [phone, setPhone] = useState("");
  const [touchId, setTouchId] = useState(true);
  
  const router = useRouter();
  // const isValid = phone.length === 10;

  // const handleContinue = () => {
  //   const fullNumber = `+${callingCode}${phone}`;
  //   console.log("Phone:", fullNumber);
  // };

  return (
    <View style={styles.root}>
      {/* Background Images */}
      <View style={styles.bgContainer}>
        <Image source={require("../images/bg1.png")} style={styles.topRight} />
        <Image
          source={require("../images/bg1.png")}
          style={styles.bottomLeft}
        />
      </View>

      {/* Main UI */}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require("../images/icon1.png")} style={styles.logo} />
          <Text style={styles.text}>kuickpay</Text>
        </View>

        <Text style={styles.text1}>Welcome!</Text>

        {/* Content */}
        <View style={styles.signContainer}>
          <Text style={styles.text2}>
            Enter phone number to login or signup
          </Text>

          {/* Phone Row */}
          <View style={styles.phoneRow}>
            <View style={styles.codeContainer}>
              <CountryPicker
                countryCode={countryCode}
                withFlag
                withFilter
                withCallingCode={true}
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

          {/* {phone.length > 0 && !isValid && ( */}
            {/* <Text style={styles.error}>Enter valid 10-digit number</Text> */}
          {/* )} */}

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#2E7DFF"  },
            ]}
            // disabled={!isValid}
            onPress={() => router.replace("/(tabs)/home")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          {/* Touch ID */}
          <View style={styles.touchRow}>
            <View style={styles.touchLeft}>
              <MaterialCommunityIcons
                name="fingerprint"
                size={24}
                color="#000"
              />
              <Text style={styles.touchText}>Login With TouchID</Text>
            </View>

            <Switch
              value={touchId}
              onValueChange={setTouchId}
              trackColor={{ false: "#ccc", true: "#2E7DFF" }}
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FirstLogin;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  bgContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },

  topRight: {
    position: "absolute",
    top: -40,
    right: -50,
    width: 220,
    height: 220,
    opacity: 1,
  },

  bottomLeft: {
    position: "absolute",
    bottom: -30,
    left: -50,
    width: 220,
    height: 220,
    opacity: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 110,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  text: {
    fontSize: 28,
    fontWeight: "bold",
  },

  text1: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 40,
  },

  signContainer: {
    width: "80%",
    alignItems: "center",
  },

  text2: {
    fontSize: 16,
    marginTop: 40,
    textAlign: "center",
    color: "#444",
  },

  phoneRow: {
    flexDirection: "row",
    marginTop: 25,
    paddingVertical: 4,
    width: "100%",
  },

  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 16,
    paddingHorizontal: 12,
    // paddingVertical: 12,
    marginRight: 10,
  },

  codeText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "500",
  },

  input: {
    flex: 1,
    backgroundColor: "#f0e9e9",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },

  error: {
    color: "red",
    marginTop: 8,
    fontSize: 14,
    alignSelf: "flex-start",
  },

  button: {
    width: "100%",
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  touchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 25,
  },

  touchLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  touchText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});
