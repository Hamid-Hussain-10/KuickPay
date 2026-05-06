import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import CountryPicker from "react-native-country-picker-modal";
import * as LocalAuthentication from "expo-local-authentication";

const FirstLogin = () => {
  const [countryCode, setCountryCode] = useState("PK");
  const [callingCode, setCallingCode] = useState("92");
  const [phone, setPhone] = useState("");
  const [touchId, setTouchId] = useState(false);

  const router = useRouter();

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware) {
      Alert.alert("Error", "Device does not support Fingerprint");
      return false;
    }

    if (!isEnrolled) {
      Alert.alert("Error", "No fingerprint found. Please set it in setting.");
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authentication with fingerprint",
    });

    return result.success;
  };

  return (
    <View style={styles.root}>
      {/* Background Images */}
      <View style={styles.bgContainer}>
        <Image
          source={require("../../assets/images/bg1.png")}
          style={styles.topRight}
        />
        <Image
          source={require("../../assets/images/bg1.png")}
          style={styles.bottomLeft}
        />
      </View>

      {/* Main UI */}
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/icon1.png")}
            style={styles.logo}
          />
          <Text style={styles.text}>kuickpay</Text>
        </View>
        <View>
          <Text style={styles.text1}>Welcome!</Text>
        </View>

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
                withCallingCode
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

          {/* Continue Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#2E7DFF" }]}
            onPress={() => router.replace("/home")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          {/* Touch ID */}
          <View style={styles.touchRow}>
            <View style={styles.touchLeft}>
              <MaterialCommunityIcons
                name={touchId ? "fingerprint" : "fingerprint-off"}
                size={24}
                color={touchId ? "#2E7DFF" : "#000"}
              />
              <Text style={styles.touchText}>
                {touchId ? "TouchID Enabled" : "Login With TouchID"}
              </Text>
            </View>

            <Switch
              value={touchId}
              onValueChange={async (value) => {
                if (value) {
                  const success = await handleBiometricAuth();

                  if (success) {
                    setTouchId(true);
                    router.replace("/home");
                  } else {
                    setTouchId(false);
                    Alert.alert("Failed", "Authentication failed");
                  }
                } else {
                  setTouchId(false);
                }
              }}
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
    backgroundColor: "#fff",
  },

  bgContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  topRight: {
    position: "absolute",
    top: -40,
    right: -50,
    width: 220,
    height: 220,
  },

  bottomLeft: {
    position: "absolute",
    bottom: -30,
    left: -50,
    width: 220,
    height: 220,
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
    fontSize: 30,
    fontWeight: 600,
    marginRight: 10,
  },

  text1: {
    fontSize: 26,
    fontWeight: 300,
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
    width: "90%",
  },

  codeContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 12,
    marginRight: 10,
    backgroundColor: "#f0e9e9",
  },

  codeText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "500",
  },

  input: {
    flex: 1,
    backgroundColor: "#f0e9e9",
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },

  button: {
    width: "50%",
    marginTop: 30,
    paddingVertical: 14,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 14,
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
