import React, {Component} from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';

import StatefulButton from './StatefulButton'

import style from './style.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.animations = {
            spin: {
                value: new Animated.Value(0)
            },
            flip: {
                flipDegree: 0,
                flip: {
                    value: new Animated.Value(0)
                },
                opacity: {
                    value: new Animated.Value(1)
                }
            },
        };


        this.animations.flip.flip.value.addListener(({value}) => {
            this.animations.flip.flipDegree = value
        })
    }

    componentWillMount() {

        this.interpolates = {
            spin: this.animations.spin.value.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '340deg']
            }),
            flip: {
                front: this.animations.flip.flip.value.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg']
                }),
                back: this.animations.flip.flip.value.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['180deg', '360deg']
                }),
                opacity: this.animations.flip.opacity.value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0]
                })
            }
        };
    }

    spin() {
        this.animations.spin.value.setValue(0);
        Animated.timing(this.animations.spin.value, {toValue: 1, duration: 1000, easing: Easing.linear}).start();
    }

    flipCard() {
        if (this.animations.flip.flipDegree >= 90) {
            Animated.parallel([
                Animated.timing(this.animations.flip.flip.value, {toValue: 0, duration: 1000}).start(),
                Animated.timing(this.animations.flip.opacity.value, {toValue: 1, duration: 1000}).start()
            ]);
        }
        else {

            Animated.parallel([
                Animated.timing(this.animations.flip.flip.value, {toValue: 180, duration: 1000}).start(),
                Animated.timing(this.animations.flip.opacity.value, {toValue: 0, duration: 1000}).start()
            ])
        }
    }

    render() {

        const spinAnimatedStyle = {
            transform: [
                {rotate: this.interpolates.spin}
            ]
        };

        const flipFrontAnimatedStyle = {
            transform: [{rotateX: this.interpolates.flip.front}]
        };

        const flipBackFrontAnimatedStyle = {
            transform: [{rotateX: this.interpolates.flip.back}]
        };

        const flipOpacityAnimatedStyle = {
            opacity: this.interpolates.flip.opacity
        };

        return (
            <View style={style.wrapper}>
                <View style={style.example}>
                    <Text style={style.heading} onPress={() => this.spin()}>Spin Animation</Text>
                    <Animated.Image
                        style={[style.spinner, spinAnimatedStyle]}
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
                <View style={style.example}>
                    <StatefulButton label="Click"/>
                </View>
            </View>

        );
    }
}

export default App;