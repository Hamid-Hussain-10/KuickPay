import React, { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { saveBill } from "../../assets/components/Storage";

const Add = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required</Text>
        <Pressable style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Allow</Text>
        </Pressable>
      </View>
    );
  }

  const takePicture = async () => {
    const result = await cameraRef.current.takePictureAsync();
    setPhoto(result.uri);
  };

  const handleSave = async () => {
    const newBill = {
      id: Date.now().toString(),
      name: "Utility Bill",
      type: "Utility",
      amount: 0,
      photo: photo,
      status: "Unpaid",
      paymentDate: new Date().toLocaleString(),
    };

    await saveBill(newBill);

    alert("Bill Saved in Unpaid Payment");
    setPhoto(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {!photo ? (
        <CameraView style={{ flex: 1 }} ref={cameraRef}>
          <View style={styles.overlay}>
            <Pressable style={styles.captureBtn} onPress={takePicture}>
              <Text style={styles.btnText}>Capture</Text>
            </Pressable>
          </View>
        </CameraView>
      ) : (
        <View style={{ flex: 1 }}>
          <Image source={{ uri: photo }} style={{ flex: 1 }} />

          <View style={styles.bottomBar}>
            <Pressable style={styles.retakeBtn} onPress={() => setPhoto(null)}>
              <Text style={styles.btnText}>Retake</Text>
            </Pressable>

            <Pressable style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.btnText}>Save Bill</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },

  captureBtn: {
    backgroundColor: "#20ceab",
    padding: 15,
    borderRadius: 50,
  },

  bottomBar: { flexDirection: "row" },

  retakeBtn: {
    flex: 1,
    backgroundColor: "#555",
    padding: 15,
    alignItems: "center",
  },

  saveBtn: {
    flex: 1,
    backgroundColor: "#20ceab",
    padding: 15,
    alignItems: "center",
  },

  btn: {
    marginTop: 10,
    backgroundColor: "#20ceab",
    padding: 10,
    borderRadius: 8,
  },

  btnText: { color: "#fff", fontWeight: "600" },
});
