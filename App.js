import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RootStack } from './src/containers/navigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';

console.disableYellowBox = true;

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
