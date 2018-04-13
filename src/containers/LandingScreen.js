import React from 'react';
import Touchable from 'react-native-platform-touchable';
import {Button, Text, View} from 'react-native';

import { mainColor, touchColor } from '../design/colors';
import {appHeaderOptions, hitSlop} from '../design/misc';

export default function LandingScreen({ navigation }) {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text>THIS IS LANDING</Text>
            <Touchable
                onPress={() => navigation.navigate('Second')}
                hitSlop={hitSlop}
                style={{
                    backgroundColor: '#eee',
                    paddingVertical: 30,
                    flex: 1,
                    alignItems: 'center'
                }}
                underlayColor={touchColor}
            >
                <Text>Go to 2nd screen</Text>
            </Touchable>
            <Touchable
                onPress={() => navigation.navigate('First')}
                hitSlop={hitSlop}
                background={touchColor}
            >
                <Text>Go to 1st screen</Text>
            </Touchable>
        </View>
    );
}

LandingScreen.navigationOptions = ({ navigation }) => {
    return {
        headerLeft: (
            <Button
                onPress={() => navigation.navigate('DrawerToggle')}
                title="Info"
                color="#fff"
            />
        ),
        title: 'My Cool App',
        ...appHeaderOptions
    };
};

