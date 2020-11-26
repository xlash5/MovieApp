import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Dimensions } from 'react-native';
import {
    BASE_URL,
    API_KEY,
    IMAGE_PATH
} from '../constants/Api';
import { Palette } from '../constants/Colors';
import PlayButton from '../components/PlayButton';
import LanguageBox from '../components/LanguageBox';

class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.route.params.id,
            type: props.route.params.type,
            loadingData: true,
        };
    };


    componentDidMount() {
        this.fetchData();
    };

    fetchData() {
        fetch(BASE_URL + `${this.state.type}/` + this.state.id + API_KEY, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson,
                    loadingData: false,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            this.state.loadingData ?
                <View style={styles.screen}><ActivityIndicator /></View>
                :
                <View style={styles.screen}>
                    <ScrollView style={{ backgroundColor: Palette.primary }} showsVerticalScrollIndicator={false}>
                        <View style={styles.imageContainer}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{
                                    uri: IMAGE_PATH + this.state.data.poster_path,
                                }}
                            />
                            <View style={styles.buttonContainer}>
                                <PlayButton onPress={
                                    () => this.props.navigation.navigate('Player', {
                                        title: this.state.type === 'tv' ?
                                            this.state.data.name :
                                            this.state.data.original_title,
                                    })
                                } />
                            </View>
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>
                                    {this.state.type === 'tv' ?
                                        this.state.data.name :
                                        this.state.data.original_title}
                                </Text>
                                <View style={styles.languages}>
                                    {this.state.data.spoken_languages.map((language, index) => (
                                        <LanguageBox
                                            key={language.iso_639_1 + index}
                                            language={language.iso_639_1}
                                        />
                                    ))}
                                </View>
                                <Text style={styles.overview}>
                                    {this.state.data.overview}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Palette.primary,
        // justifyContent: 'center',
    },
    imageContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.8,
    },
    infoBox: {
        width: '100%',
        paddingHorizontal: 10,
    },
    textContainer: {
        marginTop: 5,
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: -50,
    },
    title: {
        marginRight: 100,
        fontWeight: "700",
        fontSize: 24,
        color: Palette.textColor,
    },
    languages: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 5,
    },
    overview: {
        color: Palette.textColor,
        fontWeight: "500",
        fontSize: 24,
        marginBottom: 20,
    }
})

export default DetailsScreen;