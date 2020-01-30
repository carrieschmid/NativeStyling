import React, { useState, useRef, useEffect } from "react";
//these are hooks
//useRefs allows you to create a value that survives component re-render
//useEffect allows you to run logic after every render cycle
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
//FlatList is better if you don't know how many items you will have in there, lazy loading
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";

//this does not rely on props or state, it generates number between a min and max
const generateRandomBetween = (min, max, exclude) => {
  //Math.ceil ensures integers
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  //max-min makes sure we have a number between max and min
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
    //this is if the number is guessed on the first try
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    {/* no longer have to have key, done by ReactNaive in FlatList */}
    <Text>#{listLength - itemData.index}</Text>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  //this will only be initiated when state is empty, after guess is made it will be managed outside of the component
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  //add new guess to array whenever we generate a new random number in the nextGuessHandler
  //will not use intialGuess for subsequest renders, because react senses it, detached state handling, initalGuess will not be used
  // const [rounds, setRounds] = useState(0);
  //this will increment on each guess
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  //initialized once, stored detached from the component like state

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  //this is run after each render cycle
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
  //this is a second condition passed to useEffect. You have to specify any value that's coming from outside this useEffect function. Whenever a task changes after render cycle the effct will re-run, but only if they change, the props part of it is store above, this eliminate the re-running of the effect if any other prop changes.

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      //in both case we are giving an incorrect hint, this is to prevent the user from giving them
      Alert.alert("Don't lie!", "You know that this is wrong.", [
        { text: "Sorry!", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      //current max and min should adjust over time, if I'm telling the computer your current guess can't be higher than this one
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
      //else in the case is the greater buttin getting tapped
      //we add one bcause we need the number to be guarenteed to be unique since we're using it as our key, a new lower bourndary which can be generated in the future but we didn't generate before
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //now component will be re-rendered and it will output the next guess
    //this increments the rounds with each guess
    setPastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses
    ]);
    //we have to set our pervious guesses
    //this is set .toString to work with the FlatList
  };

  //best to put a Dimensions check here with an if statement
  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth > 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
            {/* found in directory  */}
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={listContainerStyle}>
          {/* <ScrollView contentContainerStyle={styles.list}> */}
          {/* contentContainerStyle controls content inside of ScrollView */}
          {/* {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card
        style={
          Dimensions.get("window").height > 600
            ? styles.buttonContainer
            : styles.buttonContainerSmall
        }
      >
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
          {/* found in directory  */}
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}> */}
        {/* contentContainerStyle controls content inside of ScrollView */}
        {/* {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    // we can set a flex direction here because we use a View in the card component
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    //this creates an if statement for hard coded styles based on breakpoints, if height is greater than 600 it goes to 20
    width: 300,
    maxWidth: "100%"
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center"
  },
  listContainer: {
    flex: 1,
    width: "60%"
  },
  listContainerBig: {
    flex: 1,
    width: "80%"
  },
  list: {
    flexGrow: 1,
    //makes sure items take up as much space you can, special for ScrollView
    justifyContent: "flex-end"
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }
});

export default GameScreen;
