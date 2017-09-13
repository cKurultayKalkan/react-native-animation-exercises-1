import React, {Component} from 'react';

import {
    Text,
    Animated,
    Image,
    TouchableWithoutFeedback
} from 'react-native';

import styles from './style'

class StatefulButton extends Component {
    constructor(props) {
        super(props);
        this.colorValue = new Animated.Value(0);
        this.state = {
            is_loading: false
        }
    }

    click() {

        this.setState({
            is_loading: true
        });

        this.colorValue.setValue(0);

        Animated.timing(this.colorValue, {
            toValue: 100,
            duration: 3000
        }).start(() => {
            this.setState({
                is_loading: false
            })
        })

    }

    onPress() {
        if (this.props.onPress)
            this.props.onPress();
        this.click();
    }

    render() {

        const colorAnimation = this.colorValue.interpolate({
            inputRange: [0, 50, 100],
            outputRange: ['#2196f3', '#ccc', '#8BC34A']
        });

        return (
            <TouchableWithoutFeedback onPress={() => this.onPress()}>
                <Animated.View style={[
                    styles.button_container,
                    this.props.noDefaultStyles ? '' : styles.button,
                    this.props.styles ? this.props.styles.button : '',
                    {
                        backgroundColor: colorAnimation
                    },
                ]}>
                    {
                        //Useful usage with "logicaloperator && stringToReturnIfTrue" instead of oneline if statement
                        this.state.is_loading &&
                        <Image
                            style={styles.loader}
                            source={require('../../assets/img/bike.gif')}
                        />
                    }
                    <Text>
                        {this.state.is_loading ? 'loading...' : this.props.label}
                    </Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

export default StatefulButton;