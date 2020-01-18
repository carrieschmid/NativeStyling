import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors'

const MainButton = props => {
    return <TouchableOpacity onPress={props.onClick}>   
    <View style = {styles.button}>
        <Text style = {StyleSheet.buttonText}>
            {props.children}
            {/* our button should useable be such that we pass the text between the opening and losing tags of the component, props.children */}
        </Text>
        </View>
   </TouchableOpacity>

};

const styles = StyleSheet.create({
    buttons: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30 

    },

    buttonText:{
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18

    }
});

export default MainButton;