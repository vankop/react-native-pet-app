import React, { Component } from 'react';
import {Text, View} from 'react-native';
import styles from '../design/styles';

export default class LoadingScreen extends Component {
    componentDidMount() {
        this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
}
