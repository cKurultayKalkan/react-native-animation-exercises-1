import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Switch,
    Dimensions,
    Animated,
    Easing,
    LayoutAnimation,
    UIManager
} from 'react-native';

import style from './style.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
    }

    componentWillMount() {
        this.flipAnimatedValue = new Animated.Value(0);
        this.flipValue = 0;
        this.flipOpacityAnimatedValue = new Animated.Value(1);
        this.flipAnimatedValue.addListener(({value}) => {
            this.flipValue = value
        });
        this.frontRotateInterpolate = this.flipAnimatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        });
        this.backRotateInterpolate = this.flipAnimatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        });
        this.flipOpacityInterpolate = this.flipOpacityAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        });
    }

    spin() {
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue, {toValue: 1, duration: 1000, easing: Easing.linear}).start();
    }

    flipCard() {
        if (this.flipValue >= 90) {
            Animated.timing(this.flipAnimatedValue, {toValue: 0, duration: 1000}).start();
            this.setOpacity(true);
        }
        else {
            Animated.timing(this.flipAnimatedValue, {toValue: 180, duration: 1000}).start();
            this.setOpacity();
        }
    }

    setOpacity(status) {
        if (status) {
            Animated.timing(this.flipOpacityAnimatedValue, {toValue: 1, duration: 1000}).start();
        } else {
            Animated.timing(this.flipOpacityAnimatedValue, {toValue: 0, duration: 1000}).start();
        }
    }

    render() {

        const spinRanges = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '340deg']
        });

        const flipFrontAnimatedStyle = {
            transform: [{rotateX: this.frontRotateInterpolate}]
        };

        const flipBackFrontAnimatedStyle = {
            transform: [{rotateX: this.backRotateInterpolate}]
        };

        const flipOpacityAnimatedStyle = {
            opacity: this.flipOpacityInterpolate
        };

        return (
            <View style={style.wrapper}>
                <View style={style.example}>
                    <Text style={style.heading} onPress={() => this.spin()}>Spin Animation</Text>
                    <Animated.Image
                        style={[
                            style.spinner,
                            {
                                transform: [
                                    {rotate: spinRanges}
                                ]
                            }
                        ]}
                        source={require('../assets/img/trollface.png')}
                    />
                </View>
                <TouchableOpacity style={style.example} onPress={() => this.flipCard()}>
                    <View style={style.flipViewExample}>
                        <Animated.View style={[flipFrontAnimatedStyle, style.flipView]}>
                            <Text>
                                Click!
                            </Text>
                        </Animated.View>
                        <Animated.View
                            style={[flipBackFrontAnimatedStyle, style.flipView, style.flipViewBack, flipOpacityAnimatedStyle]}>
                            <Text>
                                Flipped!
                            </Text>
                        </Animated.View>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

export default App;