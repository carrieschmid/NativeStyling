import React, { useState } from 'react';
import { View, Text, Stylesheet, Button } from 'react-native';
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

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
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1 , 100, props.userChoice)
    );
    //this will only be initiated when state is empty, after guess is made it will be managed outside of the component



return (
    <View>
        <Text>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <Button title = "LOWER" onPress={() => {}}/>
                <Button title = "GREATER" onPress={() => {}}/>
            </Card>
    </View>
);

};
const styles =StyleSheet.create({});

export default GameScreen;