import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#20ceab",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          textAlign: "center",
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 5,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              break;

            case "payments":
              iconName = focused ? "cash" : "cash-outline";
              break;

            case "add":
              iconName = focused ? "add-circle" : "add-circle-outline";
              break;

            case "calender":
              iconName = focused ? "calendar" : "calendar-outline";
              break;

            case "more":
              iconName = focused ? "menu" : "menu-outline";
              break;

            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />

      <Tabs.Screen
        name="payments"
        options={({ navigation }) => ({
          title: "Payment",
          headerShown: true,
          headerTitle: "Payments",
          headerTitleStyle: {
            fontSize: 20,
            color: "#fff",
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#20ceab",
          },

          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={24}
              color="#fff"
              style={{ marginLeft: 12, alignItems: "center" }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                backgroundColor: "#20ceab",
                borderRadius: 50,
                width: 70,
                height: 70,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="add" size={35} color="#ffffff" />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="calender"
        options={({ navigation }) => ({
          title: "Calender",
          headerShown: true,
          headerTitle: "Calender",
          headerTitleStyle: {
            fontSize: 20,
            color: "#fff",
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#20ceab",
          },

          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={24}
              color="#fff"
              style={{ marginLeft: 12, alignItems: "center" }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Tabs.Screen
        name="more"
        options={({ navigation }) => ({
          title: "More",
          headerShown: true,
          headerTitle: "Full Name ",
          headerTitleStyle: {
            fontSize: 20,
            color: "#fff",
          },
          headerTitleAlign: "start",
          headerStyle: {
            backgroundColor: "#20ceab",
            height: 180,
            borderBottomRightRadius: 45,
            borderBottomLeftRadius: 45,
          },

          headerLeft: () => (
            <Ionicons
              name="person-circle"
              size={80}
              color="#fff"
              style={{
                marginLeft: 30,
              }}
            />
          ),
        })}
      />
    </Tabs>
  );
}
