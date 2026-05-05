import { StyleSheet } from "react-native";
import React from "react";
import PaymentTabs from "../components/PaymentTabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Payment = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PaymentTabs />
    </GestureHandlerRootView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
