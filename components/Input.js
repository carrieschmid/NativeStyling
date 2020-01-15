import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
    return <TextInput {...props} 
    //I want to have more flexibility by setting up base styling and configuring it in the place that we use it instead of in core wrapper. So, I spread the props on the component. I'm setting is on the Input custom component here.
    
    style = {{...styles.input, ...props.styles}}
    //this style will overwrite the previous style above.
    />
};

const styles = StyleSheet.create({
    input:{
        height: 30,
        borderBottomColor:'gray',
        borderBottomWidth: 1,
        marginVertical: 10

    }
});

export default Input;