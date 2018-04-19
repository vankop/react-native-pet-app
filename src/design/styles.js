import {StyleSheet} from 'react-native';
import {inactiveColor} from './colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signIn: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingRight: 50,
        paddingLeft: 50
    },
    signOutButton: {
        height: 200
    },
    list: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start'
    },
    listItem: {
        marginBottom: 10,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderColor: inactiveColor
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold'
    }
});
