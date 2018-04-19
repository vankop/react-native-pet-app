import React from 'react';
import { Text, ScrollView, View, Animated } from 'react-native';
import { map } from 'lodash';
import {connect} from 'react-redux';

import profileStore from '../../redux/stores/profileStore';
import styles from '../../design/styles';
import {getLoc} from '../../design/localization';
import Loading from '../../components/Loading';
import { Dimensions } from 'react-native';

const displayParams = [
    'id',
    'msisdn',
    'email',
    'surname',
    'name',
    'patronymic',
    'snils',
    'birthdate',
    'msisdnConfirmed',
    'emailConfirmed',
    'createTime',
    'ssoId'
];

const viewStyle = { flex: 1 };

function ProfileScreen({ loading, data }) {
    if (loading || !data) {
        return <Loading />;
    }
    const screenHeight = Dimensions.get('window').height;

    return (
        <View style={viewStyle}>
            <Animated.View style={styles.header}>
                <View style={styles.bar}>
                    <Text style={styles.listTitle}>Profile</Text>
                </View>
            </Animated.View>
            <ScrollView
                contentContainerStyle={styles.list}
            >
                <View style={{ marginTop: 200 }}>
                    {map(displayParams, key => (
                        <View key={key} style={styles.listItem}>
                            <Text style={styles.title}>{getLoc(key, 'profile')}</Text>
                            <Text>{data[key]}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

export default connect(state => ({
    loading: profileStore.selectors.loading(state),
    data: profileStore.selectors.data(state)
}))(ProfileScreen);

