import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
//Platform helps you find out the Platform of the device you're running on
import Colors from "../constants/colors";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          andriod: styles.headerAndroid
        })
      }}
    >
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    // backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
    //have different styles for different platforms
    alignItems: "center",
    justifyContent: "center"
    // borderBottomColor: Platform.OS === "ios" ? "#ccc" : "transparent",
    // borderBottomWidth: Platform.OS === "ios" ? 1 : 0
  },

  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },

  headerAndroid: {
    backgroundColor: Colors.primary
  },

  headerTitle: {
    color: "black",
    fontSize: 18
  }
});

export default Header;
