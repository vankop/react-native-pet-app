import React, { Component } from 'react';
import { AsyncStorage, Button, View } from 'react-native';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import styles from '../../design/styles';
import Input from '../../components/Input';

class SignIn extends Component {
    static propTypes = {
        submit: PropTypes.func.isRequired,
        pristine: PropTypes.bool.isRequired
    };

    render() {
        const { submit, pristine } = this.props;
        return (
            <View style={styles.signin}>
                <Field
                    name="login"
                    component={Input}
                    placeholder="Enter login"
                />
                <Field
                    name="password"
                    component={Input}
                    secureTextEntry
                    placeholder="Enter password"
                />
                <Button
                    disabled={pristine}
                    title="Sign in!"
                    onPress={submit}

                />
            </View>
        );
    }
}

const SignInForm = reduxForm({
    form: 'signin',
})(SignIn);

export default class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    static propTypes = {};

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };

    render() {
        return <SignInForm onSubmit={this._signInAsync} />;
    }
}
