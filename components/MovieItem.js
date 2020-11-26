import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Palette } from '../constants/Colors';
import {
    IMAGE_PATH
} from '../constants/Api';

const MovieItem = props => {

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.movieContainer}>
                <ImageBackground
                    source={{ uri: IMAGE_PATH + props.poster }}
                    style={styles.image}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.category}>{props.category}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    movieContainer: {
        height: '95%',
        width: 160,
        backgroundColor: Palette.primary,
        marginHorizontal: 10,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end"
    },
    textContainer: {
        backgroundColor: Palette.textBackground,
        marginBottom: 40,
    },
    title: {
        color: Palette.textColor,
        fontSize: 14,
        fontWeight: "bold",
        marginHorizontal: 5,
    },
    category: {
        color: Palette.textColor,
        fontSize: 12,
        fontWeight: "300",
        marginHorizontal: 5,
    },
});

export default MovieItem;