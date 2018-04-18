import React, { Component } from 'react';
import { AsyncStorage, Button, View } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import styles from '../../design/styles';
import Input from '../../components/Input';
import {signInThunkCreator} from '../../redux/thunks/signin';

class SignIn extends Component {
    static propTypes = {
        submit: PropTypes.func.isRequired,
        pristine: PropTypes.bool.isRequired,
        submitting: PropTypes.bool.isRequired
    };

    render() {
        const { submit, pristine, submitting } = this.props;
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
                    title={submitting ? 'Loading...' : 'Sign in!'}
                    onPress={submit}
                />
            </View>
        );
    }
}

const SignInForm = reduxForm({
    form: 'signin',
})(SignIn);

export class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    static propTypes = {
        signIn: PropTypes.func.isRequired
    };

    render() {
        return <SignInForm onSubmit={this.props.signIn} />;
    }
}

export default connect(
    null,
    dispatch => ({
        signIn: (login, password) => dispatch(signInThunkCreator({
            auth: {
                login,
                password
            },
            empAction: 'login'
        }))
    })
)(SignInScreen);

