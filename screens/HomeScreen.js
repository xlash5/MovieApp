import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, TextInput, TouchableWithoutFeedback } from 'react-native';
import LargeContainer from '../components/LargeContainer';
import ListGroup from '../components/ListGroup';
import SearchItem from '../components/SearchItem';
import {
    BASE_URL,
    API_KEY,
    IMAGE_PATH
} from '../constants/Api';
import { Palette } from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingTrendingData: true,
            loadingFamilyData: true,
            loadingCategoryData: true,
            loadingDocumentaryData: true,
            search: '',
            loadingQueryData: true,
        }
    };

    componentDidMount() {
        this.fetchTrendingData();
        this.fetchFamilyMovies();
        this.fetchCategories();
        this.fetchDocumentaries();
    };

    fetchTrendingData() {
        fetch(BASE_URL + 'trending/all/day' + API_KEY, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    trendingData: responseJson,
                    loadingTrendingData: false,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };

    fetchFamilyMovies() {
        fetch(BASE_URL + 'discover/movie/' + API_KEY + '&sort_by=popularity.desc&with_genres=10751', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    familyData: responseJson,
                    loadingFamilyData: false,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };

    fetchDocumentaries() {
        fetch(BASE_URL + 'discover/movie/' + API_KEY + '&sort_by=popularity.desc&with_genres=99', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    documentaryData: responseJson,
                    loadingDocumentaryData: false,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };

    fetchCategories() {
        fetch(BASE_URL + 'genre/movie/list' + API_KEY, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    categoryData: responseJson,
                    loadingCategoryData: false,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };

    async fetchQuery(text) {
        await fetch(BASE_URL + 'search/multi' + API_KEY + `&query=${text}&page=1`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    queryData: responseJson,
                    loadingQueryData: false,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    };

    async onSearch(text) {
        this.setState({ search: text, loadingQueryData: true, });
        await this.fetchQuery(text);
    }


    render() {
        return (
            <ScrollView style={{ backgroundColor: Palette.primary }} showsVerticalScrollIndicator={false}>
                {/* search bar text input start */}
                <View style={styles.searchBar}>
                    {(this.state.search.length > 0) ? <TouchableWithoutFeedback onPress={() => {
                        this.setState({ search: '', });
                    }}>
                        <AntDesign name="arrowleft" size={30} color={Palette.textColor} />
                    </TouchableWithoutFeedback> : null}
                    <TextInput
                        placeholderTextColor={Palette.textColor}
                        value={this.state.search}
                        style={styles.textInput}
                        placeholder="Discover"
                        onChangeText={text => {
                            this.onSearch(text);
                        }}
                    />
                    {(this.state.search.length > 0) ? <TouchableWithoutFeedback onPress={() => {
                        this.setState({ search: '', });
                    }}>
                        <AntDesign name="close" size={30} color={Palette.textColor} />
                    </TouchableWithoutFeedback> :
                        <AntDesign name="search1" size={30} color={Palette.textColor} />
                    }
                </View>
                {/* search bar text input end */}
                {
                    !(this.state.search.length > 0) ?
                        //if search bar lenhth is < 0 renders this
                        <View style={styles.screen}>
                            {
                                //Top contaner start
                                this.state.loadingTrendingData ?
                                    <ActivityIndicator />
                                    :
                                    <ScrollView style={{ width: '95%', height: '100%' }}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}>
                                        {this.state.trendingData.results.map((item, index) => (
                                            //Top contaner here
                                            <LargeContainer
                                                key={item.id}
                                                imageURL={{ uri: IMAGE_PATH + item.backdrop_path }}
                                                description={item.overview}
                                                title={item.media_type === 'movie' ? item.original_title : item.name}
                                                onPress={
                                                    () => this.props.navigation.navigate('Details', {
                                                        id: item.id,
                                                        type: item.media_type
                                                    })
                                                }
                                            />
                                        ))}
                                    </ScrollView>
                                //Top crousel end
                            }
                            {/* poster crousels start here*/}
                            {
                                this.state.loadingFamilyData || this.state.loadingCategoryData ?
                                    <ActivityIndicator /> :
                                    <ListGroup
                                        clickOnMore={() => console.log("Family More")}
                                        category="Family"
                                        data={this.state.familyData.results}
                                        categories={this.state.categoryData.genres} />
                            }
                            {
                                this.state.loadingDocumentaryData || this.state.loadingCategoryData ?
                                    <ActivityIndicator /> :
                                    <ListGroup
                                        clickOnMore={() => console.log("Documentart More")}
                                        category="Documentary"
                                        data={this.state.documentaryData.results}
                                        categories={this.state.categoryData.genres} />
                            }
                            {/* poster crousels end here*/}
                        </View>
                        //if search bar length is < 0 renders this
                        :
                        //if search bar length is > 0 renders this
                        <View>
                            {
                                (this.state.loadingQueryData || !this.state.queryData.results) ?
                                    <ActivityIndicator />
                                    :
                                    <ScrollView>
                                        {this.state.queryData.results.map((item, index) => (
                                            <SearchItem
                                                onPress={
                                                    () => this.props.navigation.navigate('Details', {
                                                        id: item.id,
                                                        type: item.media_type
                                                    })
                                                }
                                                rating={item.vote_average}
                                                key={item.id}
                                                poster={item.poster_path}
                                                title={
                                                    item.media_type === 'movie' ?
                                                        item.original_title :
                                                        item.name
                                                }
                                                overview={item.overview ? item.overview : ''}
                                            />
                                        ))}
                                    </ScrollView>
                            }
                        </View>
                    //if search bar length is > 0 renders this
                }
            </ScrollView>
        )
    };

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 15,
        // justifyContent: 'center',
    },
    searchBar: {
        justifyContent: 'space-between',
        alignSelf: "center",
        alignItems: "center",
        marginTop: 50,
        marginBottom: 10,
        flexDirection: "row",
        width: '90%',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 0.5,
        borderColor: Palette.textColor,
    },
    textInput: {
        fontSize: 22,
        paddingLeft: 10,
        color: Palette.textColor,
        height: '100%',
        width: '80%',
    },
});

export default HomeScreen;