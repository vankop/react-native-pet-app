import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { map } from 'lodash';
import {connect} from 'react-redux';

import profileStore from '../../redux/stores/profileStore';
import styles from '../../design/styles';
import {getLoc} from '../../design/localization';
import Loading from '../../components/Loading';

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

function ProfileScreen({ loading, data }) {
    if (loading || !data) {
        return <Loading />;
    }

    return (
        <ScrollView
            contentContainerStyle={styles.list}
        >
            {map(displayParams, key => (
                <View key={key} style={styles.listItem}>
                    <Text style={styles.title}>{getLoc(key, 'profile')}</Text>
                    <Text>{data[key]}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

export default connect(state => ({
    loading: profileStore.selectors.loading(state),
    data: profileStore.selectors.data(state)
}))(ProfileScreen);

