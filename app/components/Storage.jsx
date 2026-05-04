import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "BILLS_DATA";

export const saveBill = async (newBill) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const bills = existing ? JSON.parse(existing) : [];

    bills.push(newBill);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bills));
  } catch (e) {
    console.log("Save error", e);
  }
};

export const getBills = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log("Fetch error", e);
    return [];
  }
};