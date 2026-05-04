import { StyleSheet, Text, View } from "react-native";
import React from "react";

const transactions = [
  { id: 1, name: "Netflix", date: "12 Apr", amount: "-Rs 1,200" },
  { id: 2, name: "Salary", date: "10 Apr", amount: "+Rs 50,000" },
];


const RecentTransactions = () => {
  return (
    <View style={styles.container}>

      {transactions.map((item) => (
        <View key={item.id} style={styles.txnCard}>
          <View>
            <Text style={styles.txnName}>{item.name}</Text>
            <Text style={styles.txnDate}>{item.date}</Text>
          </View>

          <Text
            style={[
              styles.txnAmount,
              { color: item.amount.includes("+") ? "green" : "red" },
            ]}
          >
            {item.amount}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAll: {
    color: "#6483f1",
    marginRight: 3,
  },

  txnCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  txnName: {
    fontWeight: "500",
  },

  txnDate: {
    color: "#777",
    fontSize: 12,
  },

  txnAmount: {
    fontWeight: "600",
  },
});