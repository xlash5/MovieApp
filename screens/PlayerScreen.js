import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AntDesign } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Palette } from '../constants/Colors';

class PlayerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.route.params.title,
            playing: true,
            currentTime: 0,
        }
    };

    async componentDidMount() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    }

    componentWillUnmount() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    handlePlayPause(videoplayer) {
        this.setState({
            playing: !this.state.playing,
        });
        if (this.state.playing) {
            videoplayer.pauseAsync();
        } else {
            videoplayer.playAsync();
        }
    };


    render() {
        return (
            <View style={styles.screen}>
                <Video
                    ref={ref => this.videoplayer = ref}
                    source={require('../assets/big_buck_bunny.mp4')}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    style={styles.videoPlayer}
                />
                {/* BackButton */}
                <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack(null)}>
                    <View style={styles.backButton}>
                        <AntDesign name="arrowleft" size={40} color={Palette.textColor} />
                    </View>
                </TouchableWithoutFeedback>
                {/* BackButton */}
                {/* title */}
                <View style={styles.displayTitle}>
                    <Text style={styles.displayTitleText}>{this.state.title}</Text>
                </View>
                {/* title */}
                {/* episode title */}
                <View style={styles.episodeTitle}>
                    <Text style={styles.episodeTitleText}>Episode Title</Text>
                </View>
                {/* episode title */}
                {/* backnward btn */}
                <View style={styles.banckwardBtn}>
                    <AntDesign name="banckward" size={50} color={Palette.textColor} />
                </View>
                {/* backnward btn */}
                {/* Play/Resume */}
                <TouchableWithoutFeedback onPress={() => this.handlePlayPause(this.videoplayer)}>
                    <View style={styles.playResumeBtn}>
                        {
                            this.state.playing ?
                                <AntDesign name="pausecircleo" size={50} color={Palette.textColor} />
                                :
                                <AntDesign name="caretright" size={50} color={Palette.textColor} />
                        }
                    </View>
                </TouchableWithoutFeedback>
                {/* Play/Resume */}
                {/* Forward btn */}
                <TouchableWithoutFeedback onPress={() => { }}>
                    <View style={styles.forwardBtn}>
                        <AntDesign name="forward" size={50} color={Palette.textColor} />
                    </View>
                </TouchableWithoutFeedback>
                {/* Forward btn */}
                {/* Next */}
                <View style={styles.goStart}>
                    <AntDesign name="stepbackward" size={50} color={Palette.textColor} />
                </View>
                {/* Next */}
                {/* Previous */}
                <View style={styles.goEnd}>
                    <AntDesign name="stepforward" size={50} color={Palette.textColor} />
                </View>
                {/* Previous */}
                {/* Progress indicator */}
                <View style={styles.progressBar}>
                    <Slider
                        style={styles.slider}
                        value={50}
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor={Palette.textColor}
                        maximumTrackTintColor='white'
                        thumbTintColor={Palette.textColor}
                    />
                </View>
                {/* Progress indicator */}
            </View>
        );
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Palette.primary,
        // justifyContent: 'center',
    },
    videoPlayer: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: "absolute",
        left: 10,
        top: 10,
    },
    displayTitle: {
        position: "absolute",
        left: 60,
        top: 15,
    },
    displayTitleText: {
        fontSize: 24,
        color: Palette.textColor,
        fontWeight: "900",
    },
    episodeTitle: {
        position: "absolute",
        left: 60,
        top: 45,
    },
    episodeTitleText: {
        fontSize: 18,
        color: Palette.textColor,
    },
    banckwardBtn: {
        position: "absolute",
        left: '30%',
        top: '40%',
    },
    playResumeBtn: {
        position: "absolute",
        left: '48%',
        top: '40%',
    },
    forwardBtn: {
        position: "absolute",
        right: '30%',
        top: '40%',
    },
    goStart: {
        position: "absolute",
        left: '10%',
        top: '65%',
    },
    goEnd: {
        position: "absolute",
        right: '10%',
        top: '65%',
    },
    progressBar: {
        position: "absolute",
        left: 50,
        width: '85%',
        top: '85%',
    },
    slider: {
        width: '100%',
    },
});

export default PlayerScreen;