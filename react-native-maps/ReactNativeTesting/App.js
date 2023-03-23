import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from 'expo-location';

export default function App() {
const [location, setLocation] = useState();
const [address, setAddress] = useState();

useEffect(() => {
  const getPermissions = async () => {
    let{status}=await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted'){
      console.log('please grant location permissions')
      return;
    }
    let currentLocation =  await Location.getCurrentPositionAsync({});

    setLocation({latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude})
    console.log('location:', currentLocation);
  
  };
  getPermissions();
}, [])
console.log('location >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', location, JSON.parse(location));




const geocode = async  () =>  {
  const geocodedLocation = await Location.geocodeAsync(address);
  console.log('Geocoded Address:', geocodedLocation);
}

  return (
    <View style={styles.container}>
      {/* <Text>hi</Text> */}
      <TextInput placeholder='Address' value={address} onChangeText={setAddress}/>
      <Button title='Geocode Address' onPress={geocode}/>
      <MapView style={styles.map} 
      initialRegion={location}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "50%",
    height: "50%",
  },
});
