import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { api } from "../api/api";

type DashboardProps = StackScreenProps<RootStackParamList, "Dashboard">;

export default function DashboardScreen({ route }: DashboardProps) {
  const { token } = route.params;
  const [data, setData] = useState<any>(null);

  const loadData = async () => {
    try {
      const res = await api.post(
        "/dashboard.php",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);
    } catch (err) {
      Alert.alert("Error", "Failed to load dashboard");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!data) return <Text style={{ padding: 20 }}>Loading...</Text>;

  const dynamicColor = data.dashboard.color.dynamic_color;

  return (
    <ScrollView style={{ flex: 1 }}>

      
      <View style={{ padding: 20, backgroundColor: dynamicColor }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>
          Welcome, {data.user?.name}
        </Text>
        <Text>User ID: {data.user?.userid}</Text>
        <Text>Mobile: {data.user?.mobile}</Text>
      </View>

     
      {/* <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10, marginLeft: 10 }}>
        Carousel
      </Text> */}

      {data.dashboard.carousel.map((img: string, i: number) => (
        <Image
          key={i}
          source={{ uri: img }}
          style={{
            height: 220,
            margin: 10,
            borderRadius: 10,
            objectFit: "cover",
          }}
        />
      ))}

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Students</Text>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}> Boys: {data.dashboard.student.Boy}</Text>
          <Text style={{ fontSize: 16 }}> Girls: {data.dashboard.student.Girl}</Text>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Amount Summary</Text>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}> Total: ₹{data.dashboard.amount.Total}</Text>
          <Text style={{ fontSize: 16 }}> Paid: ₹{data.dashboard.amount.Paid}</Text>
          <Text style={{ fontSize: 16 }}> Due: ₹{data.dashboard.amount.due}</Text>
        </View>
      </View>

    </ScrollView>
  );
}
