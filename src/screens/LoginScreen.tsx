import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { api } from "../api/api";

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login.php", {
        userid,
        password,
      });

      if (response.data.status) {
        navigation.navigate("Otp", { userId: response.data.userid });
      } else {
        Alert.alert("Login Failed", response.data.msg);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>User ID</Text>
      <TextInput
        value={userid}
        onChangeText={setUserid}
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10 }}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
