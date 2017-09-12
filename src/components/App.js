import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    TouchableHighlight,
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

    spin() {
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue, {toValue: 1, duration: 1000, easing: Easing.linear}).start();
    }

    render() {

        const spinRanges = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '340deg']
        });

        return (
            <View style={style.wrapper}>
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

        );
    }
}

export default App;