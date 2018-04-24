import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import Panel from '../../components/Panel';

export default class Message extends PureComponent {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string,
        selected: PropTypes.bool,
        read: PropTypes.bool,

        separators: PropTypes.object.isRequired,
        onPressItem: PropTypes.func.isRequired
    };

    constructor() {
        super();

        this._handlePress = this._handlePress.bind(this);
        this._withTouch = this._withTouch.bind(this);
    }

    _handlePress() {
        const {
            onPressItem,
            id
        } = this.props;

        onPressItem(id);
    }

    _withTouch(header) {
        const { separators } = this.props;

        return (
            <Touchable
                onPress={this._handlePress}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
            >
                {header}
            </Touchable>
        );
    }

    render() {
        const {
            title,
            text,
            selected
        } = this.props;

        return (
            <Panel
                title={title}
                headerTouch={this._withTouch}
                mode="spoiler"
                visible={selected}
                onStateChange={this._handlePress}
            >
                <Text>{text}</Text>
            </Panel>
        );
    }
}
