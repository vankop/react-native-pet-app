import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { map } from 'lodash';
import {connect} from 'react-redux';

import profileStore from '../../redux/stores/profileStore';
import styles from '../../design/styles';
import {getLoc} from '../../design/localization';
import Loading from '../../components/Loading';

function ProfileScreen({ loading, data }) {
    if (loading || !data) {
        return <Loading />;
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >
            {map(data, (value, key) => (
                <View key={key} style={styles.listItem}>
                    <Text style={styles.title}>{getLoc(key, 'profile')}</Text>
                    <Text>{value}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

export default connect(state => ({
    loading: profileStore.selectors.loading(state),
    data: profileStore.selectors.data(state)
}))(ProfileScreen);

