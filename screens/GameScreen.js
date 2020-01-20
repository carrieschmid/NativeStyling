import React, { useState, useRef, useEffect } from 'react';
//these are hooks
//useRefs allows you to create a value that survives component re-render
//useEffect allows you to run logic after every render cycle
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons';

//this does not rely on props or state, it generates number between a min and max
const generateRandomBetween = (min, max, exclude) => {
    //Math.ceil ensures integers
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    //max-min makes sure we have a number between max and min
    if (rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
        //this is if the number is guessed on the first try
    } else {
        return rndNum;
    }
};

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1 , 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    //this will only be initiated when state is empty, after guess is made it will be managed outside of the component
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    //add new guess to array whenever we generate a new random number in the nextGuessHandler
    //will not use intialGuess for subsequest renders, because react senses it, detached state handling, initalGuess will not be used
    const [rounds, setRounds] = useState(0);
    //this will increment on each guess
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    //initialized once, stored detached from the component like state
    
    const { userChoice, onGameOver } = props;

    //this is run after each render cycle
    useEffect(() => {
        if (currentGuess === userChoice) {
          onGameOver(pastGuesses.length);
        }
      }, [currentGuess, userChoice, onGameOver]);
      //this is a second condition passed to useEffect. You have to specify any value that's coming from outside this useEffect function. Whenever a task changes after render cycle the effct will re-run, but only if they change, the props part of it is store above, this eliminate the re-running of the effect if any other prop changes.

    const nextGuessHandler = direction => { 
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
        //in both case we are giving an incorrect hint, this is to prevent the user from giving them
            Alert.alert('Don\'t lie!', 'You know that this is wrong.', [{text: 'Sorry!', style: 'cancel'}])
        return;

    }
    if (direction === 'lower') {
        //current max and min should adjust over time, if I'm telling the computer your current guess can't be higher than this one
        currentHigh.current = currentGuess;
    
    } else {
       currentLow.current = currentGuess + 1;
       //else in the case is the greater buttin getting tapped
       //we add one bcause we need the number to be guarenteed to be unique since we're using it as our key, a new lower bourndary which can be generated in the future but we didn't generate before

    }
    const nextNumber = generateRandomBetween ( currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    //now component will be re-rendered and it will output the next guess

    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    //this increments the rounds with each guess
    setPastGuesses(curPastGuesses => [nextNumber,...curPastGuesses])
    //we have to set our pervious guesses
};



return (
    <View>
        <Text>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
            <Card style = {styles.buttonContainer} >
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}> 
                <Ionicons name="md-remove" size ={24} color = "white"/>
                {/* found in directory  */}
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name="md-add" size ={24} color = "white"/>
                </MainButton>
                
            </Card>
            <ScrollView>
                {pastGuesses.map(guess => (<View key= {guess}><Text>{guess}</Text></View>
                ))}
            </ScrollView>
    </View>
);

};
const styles =StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        // we can set a flex direction here because we use a View in the card component 
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '100%'
    }
});

export default GameScreen;