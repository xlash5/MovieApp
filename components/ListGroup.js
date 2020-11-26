import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MovieItem from '../components/MovieItem';
import { useNavigation } from '@react-navigation/native';
import { Palette } from '../constants/Colors';

const ListGroup = props => {
    const navigation = useNavigation();

    const getCategory = (categoryID) => {
        let category = props.categories.filter(category => category.id === categoryID)[0].name;

        return category;
    }

    return (
        <View style={styles.listGroup}>
            <View style={styles.topContainer}>
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={styles.categoryText}>{props.category}</Text>
                    <Text style={styles.descriptiveText}>Descriptive Text</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text onPress={props.clickOnMore} style={styles.moreText}>
                        More
                </Text>
                </View>
            </View>
            <View style={styles.movieListContainer}>
                <ScrollView style={{ width: '100%', height: '100%' }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {props.data.map((item, index) => (
                        <MovieItem
                            onPress={() => navigation.navigate("Details", { id: item.id, type: "movie" })}
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            category={getCategory(item.genre_ids[0])}
                            poster={item.poster_path} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listGroup: {
        width: '94%',
        height: 350,
        alignItems: "center",
    },
    topContainer: {
        paddingHorizontal: 15,
        height: '25%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryText: {
        color: Palette.textColor,
        fontWeight: '600',
        marginBottom: 10,
        fontSize: 18,
    },
    descriptiveText: {
        color: Palette.textColor,
    },
    moreText: {
        color: Palette.textColor,
        fontWeight: '600',
        fontSize: 24,
    },
    movieListContainer: {
        flexDirection: 'row',
        height: '75%',
        width: '100%',
        alignItems: "center",
    },
});

export default ListGroup;