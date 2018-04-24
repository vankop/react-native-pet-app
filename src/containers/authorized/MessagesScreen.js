import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList} from 'react-native';
import {connect} from 'react-redux';

import styles from '../../design/styles';
import {fetchMessagesThunk, messagesStore} from '../../redux/stores/messagesStore';
import {messageCountReached} from '../../redux/stores/canFetchMore';
import Message from './Message';
import Loading from '../../components/Loading';
import Logger from '../../utils/logger';

class MessagesScreen extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        messages: PropTypes.array,
        canFetchMore: PropTypes.bool,

        fetch: PropTypes.func.isRequired
    };

    static _keyExtractor = ({ message_id: id }) => id;

    state = {
        selected: new Map()
    };

    constructor({ fetch }) {
        super();

        fetch();

        this._renderItem = this._renderItem.bind(this);
        this._onPressItem = this._onPressItem.bind(this);
    }

    _renderItem({ item: { message_id: id, text, title, read = false }, separators, ...rest }) {
        Logger.debug(rest);
        return (
            <Message
                separators={separators}
                id={id}
                text={text}
                read={read}
                title={title}
                selected={!!this.state.selected.get(id)}
                onPressItem={this._onPressItem}
            />
        );
    }

    _onPressItem(id) {
        this.setState((state) => {
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id));
            return { selected };
        });
    }

    render() {
        const {
            messages,
            loading
        } = this.props;

        return (
            <View style={[styles.fill, styles.panelContainer]}>
                <FlatList
                    data={messages || []}
                    extraData={this.state}
                    keyExtractor={MessagesScreen._keyExtractor}
                    renderItem={this._renderItem}
                />
                {
                    loading ? <Loading /> : null
                }
            </View>
        );
    }
}

export default connect(state => ({
    loading: messagesStore.selectors.loading(state),
    messages: messagesStore.selectors.data(state),
    canFetchMore: messageCountReached.selector(state)
}), dispatch => ({
    fetch: () => dispatch(fetchMessagesThunk)
}))(MessagesScreen);
