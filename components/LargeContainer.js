import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Palette } from '../constants/Colors';

const LargeContainer = props => {
    const shortenOverview = (overview) => {
        return overview.slice(0, 80) + '...'
    }
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.largeContainer}>
                <ImageBackground source={props.imageURL} style={styles.image}>
                    <View style={styles.textContainer}>
                        <Text style={styles.description}>{shortenOverview(props.description)}</Text>
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    largeContainer: {
        width: Dimensions.get('window').width - 35,
        height: 240,
        backgroundColor: Palette.primary,
        justifyContent: 'flex-end',
        marginRight: 10,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end"
    },
    title: {
        color: Palette.textColor,
        fontSize: 28,
        fontWeight: "bold",
    },
    description: {
        color: Palette.textColor,
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 5,
    },
    textContainer: {
        backgroundColor: Palette.textBackground,
        padding: 10,
    }
});

export default LargeContainer;