import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Palette } from '../constants/Colors';

const PlayButton = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.circleButton}>
                <AntDesign name="caretright" size={34} color="white" />
            </View>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    circleButton: {
        width: 75,
        height: 75,
        borderRadius: 100 / 2,
        backgroundColor: Palette.blueButtonColor,
        alignItems: "center",
        justifyContent: 'center',
    },
})

export default PlayButton;