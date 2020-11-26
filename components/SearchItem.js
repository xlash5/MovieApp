import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
    IMAGE_PATH
} from '../constants/Api';
import StarRating from 'react-native-star-rating';
import { Palette } from '../constants/Colors';

const SearchItem = props => {

    const trancuate = (text) => {
        if (props.title.length > 40) {
            return text.slice(0, 120) + '...'
        } else {
            return text.slice(0, 140) + '...'
        }
    }

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={styles.searchItem}>
                <View style={styles.searchItemLeft}>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={{
                            uri: IMAGE_PATH + props.poster,
                        }}
                    />
                </View>
                <View style={styles.searchItemRight}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                    <Text style={styles.text}>
                        {trancuate(props.overview,)}
                    </Text>
                    <View style={styles.bottomRatings}>
                        <StarRating
                            fullStarColor={Palette.textColor}
                            emptyStarColor={Palette.textColor}
                            starSize={28}
                            disabled={true}
                            maxStars={5}
                            rating={props.rating / 2}
                            selectedStar={(rating) => { }}
                        />
                        <AntDesign name="staro" size={28} color={Palette.textColor} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    searchItem: {
        height: 200,
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: Palette.primary,
    },
    searchItemLeft: {
        height: '100%',
        width: '40%',
    },
    searchItemRight: {
        height: '100%',
        width: '70%',
        padding: 10,
        paddingRight: 50,
        justifyContent: 'space-between',
    },
    bottomRatings: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Palette.textColor,
    },
    text: {
        color: Palette.textColor,
    }
})

export default SearchItem;