import React from 'react';
import {Text, StyleSheet} from 'react-native';
//this wrapper always sets this text family
//Could also use TitleText
//spread operator to merge with props.style
//you can also use a default styles sheet
const BodyText = props => <Text style={StyleSheet.body}>{props.children}</Text>;

const styles = StyleSheet.create({
    body:{
        fontFamily: 'open-sans-bold'
    }
});

export default BodyText;