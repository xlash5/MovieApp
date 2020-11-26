import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Palette } from '../constants/Colors';

const LanguageBox = props => {
    return (
        <View
            style={styles.languageContainer}>
            <Text style={styles.language}>
                {props.language}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    language: {
        fontWeight: "200",
        fontSize: 24,
        color: Palette.textColor,
    },
    languageContainer: {
        borderWidth: 1,
        borderColor: Palette.textColor,
        width: 40,
        alignItems: "center",
        marginRight: 10,
        marginBottom: 10,
    },
})

export default LanguageBox;