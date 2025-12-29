import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { api } from "../api/api";

type OtpProps = StackScreenProps<RootStackParamList, "Otp">;

export default function OtpScreen({ route, navigation }: OtpProps) {
  const { userId } = route.params;
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      const res = await api.post("/verify_otp.php", {
        userid: userId.toString(),
        otp,
      });

      if (res.data.status) {
        navigation.navigate("Dashboard", { token: res.data.token });
      } else {
        Alert.alert("Error", "Invalid OTP");
      }
    } catch (err) {
      Alert.alert("Error", "OTP verification failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter OTP</Text>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
}
