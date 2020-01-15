import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors'

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState(''); 
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        //we will validate before we set the entered value to the state
        setEnteredValue(inputText.replace(/[^0-9]/g, ' '));
        //regex, I'm taking anything that's not a number 0-9 and replacing it with an empty string

    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99)
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        //since this is not done until the next render cycle, it's just cued by React we can do this before we save the number value
        setSelectedNumber(parseInt(chosenNumber))

    };

    let confirmedOutput;
    // special output if confirmed

    if (confirmed) {
        // confirmed is the parameter passed into this function
        confirmedOutput = <Text>Chosen Number: {selectedNumber} </Text>
    }
    
    return(
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()
        }}>
        <View style = {styles.screen}>
            <Text style = {styles.title}> Start a New Game! </Text>
            <Card style={styles.inputContainer}>
            <View style = {styles.inputContainer}>
                <Text style = {styles.title}>Select a Number</Text>
                {/* this replaces TextInput, some styles should be setup in the place you actually use it */}
                <Input style = {styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false}keyboardType="number-pad" maxLength = {2} 
                // the props spread gives us access to these?
                onChangeText = {numberInputHandler}
                //this points a the handler and feeds the value back here:
                value={enteredValue}
                />
                <View style = {styles.buttonContainer}>
                    <View style = {styles.button}>
                    <Button title="Reset" 
                    onPress={resetInputHandler} color={Colors.accent}/>
                    </View>
                    <View style = {styles.button}>
                    <Button title="Confirm" onPress={} 
                    color={Colors.primary}/>
                    </View>
                </View>              
            </View>
            </Card>
            {confirmedOutput}
            {/* either undefined or the text */}
        </View>
        </TouchableWithoutFeedback>
        //when a touch happens, I want to dismiss the keyboard
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title:{
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: '100%',
        
    },
    buttonContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
        //position buttons according to View

    },
    button: {
        width: 100
    },
    input: {
        width: 20,
        textAlign: 'center'
    }
});

export default StartGameScreen;