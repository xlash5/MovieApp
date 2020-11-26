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
            videostatus: { isPlaying: true },
            working: 0,
            total: 100,
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
        if (this.state.videostatus.isPlaying) {
            videoplayer.pauseAsync();
        } else {
            videoplayer.playAsync();
        }
    };

    statusBar(a) {
        let m = a.positionMillis / a.durationMillis * 100;
        let work = a.positionMillis / 1000;
        let full = a.durationMillis / 1000;
        let fulltime = Math.round(full);
        let time = Math.round(work);
        let ab = Math.round(m);
        this.setState({ videostatus: a, working: time, total: fulltime, percentage: m, baloon: ab });
    }


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
                    onPlaybackStatusUpdate={(e) => this.statusBar(e)}
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
                <TouchableWithoutFeedback onPress={() => {
                    this.state.working > 5 ?
                        this.videoplayer.setPositionAsync(this.state.working - 5)
                        : this.videoplayer.setPositionAsync(0)
                }}>
                    <View style={styles.banckwardBtn}>
                        <AntDesign name="banckward" size={50} color={Palette.textColor} />
                    </View>
                </TouchableWithoutFeedback>
                {/* backnward btn */}
                {/* Play/Resume */}
                <TouchableWithoutFeedback onPress={() => this.handlePlayPause(this.videoplayer)}>
                    <View style={styles.playResumeBtn}>
                        {
                            this.state.videostatus.isPlaying ?
                                <AntDesign name="pausecircleo" size={50} color={Palette.textColor} />
                                :
                                <AntDesign name="caretright" size={50} color={Palette.textColor} />
                        }
                    </View>
                </TouchableWithoutFeedback>
                {/* Play/Resume */}
                {/* Forward btn */}
                <TouchableWithoutFeedback onPress={() => { this.videoplayer.setPositionAsync(this.state.working + 5) }}>
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
                    <Text style={styles.text}>{this.state.working.toFixed()}</Text>
                    <Slider
                        onSlidingComplete={(val) => { this.videoplayer.setPositionAsync(val) }}
                        style={styles.slider}
                        value={this.state.working.toFixed()}
                        minimumValue={0}
                        maximumValue={this.state.total.toFixed()}
                        minimumTrackTintColor={Palette.primary}
                        maximumTrackTintColor={Palette.textColor}
                        thumbTintColor={Palette.textColor}
                    />
                    <Text style={styles.text}>{this.state.total.toFixed()}</Text>
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
        left: 50,
        top: 20,
    },
    displayTitle: {
        position: "absolute",
        left: 100,
        top: 25,
        paddingRight: 100,
    },
    displayTitleText: {
        fontSize: 24,
        color: Palette.textColor,
        fontWeight: "900",
        flexWrap: 'wrap',
    },
    episodeTitle: {
        position: "absolute",
        left: 100,
        top: 80,
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
        flexDirection: 'row',
        position: "absolute",
        left: 80,
        width: '80%',
        top: '85%',
    },
    slider: {
        width: '100%',
    },
    text: {
        color: Palette.textColor,
        fontSize: 20,
    }
});

export default PlayerScreen;