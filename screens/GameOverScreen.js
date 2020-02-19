import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView
} from "react-native";
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from "../constants/colors";
import BodyText from "../components/BodyText";

const GameOverScreen = (props) => {
  return (
    <SafeAreaView>
      {/* Avoids things that would hide it like the notch */}
      <ScrollView>
        <View style={styles.screen}>
          <Text>The Game is Over! </Text>
          <View style={styles.imageContainer}>
            <Image
              // fadeDuration option here
              // source = {require('../assets/success.png')}
              //size of this iamge is known
              source={{
                uri:
                  "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500"
              }}
              //always have to st width and height on network images
              style={styles.image}
              resizeMode="cover"
              // maintains aspect ratio but doesnt shrink image to fit it
            />
          </View>
          <BodyText style={styles.resultText}>
            Your phone needed{" "}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
          {/* you can nest text within text, and the children receive the style set up on the outter text, text does not use flexBox */}
          <Text>Number was: {props.userNumber}</Text>
          <Button title="NEW GAME" onPress={props.onRestart} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.07,
    borderRadius: (Dimensions.get("window").width * 0.07) / 2,
    //this must be half width and height to get a perfect circle
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 20
  },
  highlight: {
    color: colors.primary
  },
  resultsContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 40
  },
  //   use this to do text wrapping, you could do some margin spacing
  //this is in relationship with image container
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height / 20
  }
});

export default GameOverScreen;
