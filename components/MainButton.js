import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';

const MainButton = props => {
    return <TouchableOpacity onPress={props.onPress}>   
    <View style = {styles.button}>
        <Text style = {styles.buttonText}>
            {props.children}
            {/* our button should useable be such that we pass the text between the opening and losing tags of the component, props.children */}
        </Text>
        </View>
   </TouchableOpacity>

};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30 

    },

    buttonText:{
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18

    }
});

export default MainButton;